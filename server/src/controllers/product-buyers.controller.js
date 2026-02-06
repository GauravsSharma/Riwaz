import Product from "../models/product.js";
import redisClient from "../config/redis.js";
import { generateProductCacheKey } from "../utils/redis.utils.js";


// customers
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    })
      .select("title price thumbnail originalPrice discountPercentage")
      .limit(4)

    // Fetch primary image for each product


    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// customers
export const getSingleProduct = async (req, res) => {
  try {
    const productKey = `single-product:product`
    const cachedProduct = await redisClient.get(productKey);
    if (cachedProduct) {
      const response = JSON.parse(cachedProduct);
      return res.status(200).json({ ...response });
    }
    const product = await Product.find().limit(1)
      .populate({
        path: "tags",
        select: "name slug"   // choose whatever fields you need
      })
      .populate({
        path: "images",
        select: "url public_id"
      });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const variants = await Product.find({
      parentId: product[0].parentId,
      _id: { $ne: product[0]._id }   // exclude current product
    }).select("thumbnail color _id");

    let response = { success: true, product: product[0], variants }

    redisClient.set(productKey, JSON.stringify(response))
      .then(() => console.log("cached: single product"))
      .catch(() => console.log("Error in caching: single product"))

    res.status(200).json({ ...response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const start = Date.now();

    const productCache = await redisClient.get(`product:${id}`);

    console.log('Query time:', Date.now() - start, 'ms');

    if (productCache) {
      console.log("Caches hit");
      const response = JSON.parse(productCache);
      return res.status(200).json({
        ...response
      })
    }


    const product = await Product.findById(id)
      .populate({
        path: "tags",
        select: "name"   // choose whatever fields you need
      })
      .populate({
        path: "images",
        select: "url public_id"
      });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const variants = await Product.find({
      parentId: product.parentId,
      _id: { $ne: product._id }
    }).select("thumbnail color _id");
    const response = { success: true, product, variants }
    redisClient
      .setEx(`product:${id}`, 500, JSON.stringify(response))
      .catch(err => console.error("Redis product cache failed:", err.message));

    res.status(200).json({ ...response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
// customers
export const searchProducts = async (req, res) => {
  try {
    let {
      limit = 10,
      search,
      priceMin,
      priceMax,
      color,
      type,
      fabric,
      work,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = { isActive: true };
    type = type?.split(",").map(t => t.trim()) || [];
    work = work?.split(",").map(t => t.trim()) || [];
    fabric = fabric?.split(",").map(t => t.trim()) || [];
    if (search) {
      query.$text = { $search: search };
    }

    if (type.length > 0) {
      query.type = { $in: type };
    }

    if (fabric.length > 0) {
      query.fabric = { $in: fabric };
    }

    if (work.leangth > 0) {
      query.work = { $in: work };
    }

    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    if (color) {
      query.color = { $regex: color, $options: 'i' };
    }
    const skip = (Number(page) - 1) * Number(limit);

    const sort = {};
    if (search) {
      sort.score = { $meta: 'textScore' };
    }
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    const cachedKey = generateProductCacheKey(req.query)
    const cachedData = await redisClient.get(cachedKey);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return res.status(200).json({
        ...data
      });
    }
    // Execute query with pagination
    const products = await Product.find(query)
      .select('title price thumbnail originalPrice discountPercentage')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Product.countDocuments(query);
    const response = {
      success: true,
      totalPages: Math.ceil(total / limit),
      page: Number(page),
      limit: Number(limit),
      products: products,
    }
    redisClient.setEx(cachedKey, 180, JSON.stringify(response)).then(() => {
      console.log("cached search products:");
    }).catch(() => {
      console.log("error in caching: search product");
    });
    res.status(200).json({
      ...response
    });
  } catch (error) {
    console.error("Error in getProductsByQuery:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

export const useGetProductRecommendationByQuery = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(200).json([]);
    }

    const keyword = q.trim();
    const queryKey = `product-recommendation-by-query:${keyword}`
    const cachedData = await redisClient.get(queryKey);
    if (cachedData) {
      const products = JSON.parse(cachedData);
      return res.status(200).json({ success: true, products });
    }
    const products = await Product.find({
      isActive: true,
      $or: [
        // 🔹 Prefix match (ban → banarasi)
        { title: { $regex: `^${keyword}`, $options: "i" } },
        { type: { $regex: `^${keyword}`, $options: "i" } },

        // 🔹 Contains match
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    })
      .select("title slug price thumbnail type")
      .limit(5);

    redisClient.setEx(queryKey, 90, JSON.stringify(products))
      .then(() => {
        console.log("cached: query recommendation");
      })
      .catch(() => {
        console.log("Error in caching: query recommendation");
      })

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 1) {
      return res.status(200).json([]);
    }

    const keyword = q.trim();
    const queryKey = `product0search-suggestions-by-query:${keyword}`
    const cachedData = await redisClient.get(queryKey);
    if (cachedData) {
      const suggestions = JSON.parse(cachedData);
      return res.status(200).json({ success: true, suggestions });
    }
    const products = await Product.find({
      isActive: true,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { type: { $regex: keyword, $options: "i" } },
        { fabric: { $regex: keyword, $options: "i" } },
        { work: { $regex: keyword, $options: "i" } },
      ],
    })
      .select("title type fabric work")
      .limit(10);

    // 🔹 Extract meaningful suggestions
    const suggestionsSet = new Set();

    products.forEach((p) => {
      if (p.title?.toLowerCase().includes(keyword.toLowerCase())) {
        suggestionsSet.add(p.title);
      }
      if (p.type?.toLowerCase().includes(keyword.toLowerCase())) {
        suggestionsSet.add(`${p.type} saree`);
      }
      if (p.fabric?.toLowerCase().includes(keyword.toLowerCase())) {
        suggestionsSet.add(`${p.fabric} saree`);
      }
      if (p.work?.toLowerCase().includes(keyword.toLowerCase())) {
        suggestionsSet.add(`${p.work} saree`);
      }
    });
    const suggestions = [...suggestionsSet].slice(0, 8);
    redisClient.setEx(queryKey, 120, JSON.stringify(suggestions))
      .then(() => console.log("cached: search suggestions"))
      .catch(() => console.log("Error in caching: search suggestions"))

    res.status(200).json({ success: true, suggestions });
  } catch (err) {
    console.error("Suggestion error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!type) {
      return res.status(400).json({ message: "Product type is required" });
    }
    const queryKey = `product-by-type:${type}`
    const cachedData = await redisClient.get(queryKey);
    if (cachedData) {
      return res.status(200).json({
        products: JSON.parse(cachedData)
      })
    }
    const products = await Product.find({
      type: type,
      isActive: true,
    })
      .select("title price thumbnail originalPrice discountPercentage _id")
      .limit(4)


    redisClient.set(queryKey, JSON.stringify(products))
      .then(() => console.log("cached: product by type"))
      .catch(() => console.log("Error in caching: product by type"))

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


