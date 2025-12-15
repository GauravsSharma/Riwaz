import Product from "../models/product.js";

// customers
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
    })
      .select("title price thumbnail originalPrice discountPercentage")
      .limit(4)

    // Fetch primary image for each product

    console.log("Request received:", req);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// customers
export const getSingleProduct = async (req, res) => {
  try {
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
    res.status(200).json({ success: true, product:product[0], variants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

export const getProductById = async (req, res) => {
  try {
    console.log("Entered in getProductById");

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    console.log(id);

    console.log(req + "request");
    const product = await Product.findById(id)
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
      parentId: product.parentId,
      _id: { $ne: product._id }   // exclude current product
    }).select("thumbnail color _id");
    res.status(200).json({ success: true, product, variants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
// customers
export const searchProducts = async (req, res) => {
 try {
    const {
      limit=5,
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

    console.log("Filters received:", req.query);

    // Build the query object
    const query = { isActive: true }; // Only show active products

    // Text search on title and description
    if (search) {
      query.$text = { $search: search };
    }

    // Price range filter
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Color filter (case-insensitive partial match)
    if (color) {
      query.color = { $regex: color, $options: 'i' };
    }

    // Type filter (exact match from enum)
    if (type) {
      query.type = type;
    }

    // Fabric filter (exact match from enum)
    if (fabric) {
      query.fabric = fabric;
    }

    // Work filter (exact match from enum)
    if (work) {
      query.work = work;
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Build sort object
    const sort = {};
    if (search) {
      sort.score = { $meta: 'textScore' }; // Sort by text relevance if searching
    }
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    // Execute query with pagination
    const products = await Product.find(query)
      .select('title price thumbnail originalPrice discountPercentage')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products: products,
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
export const getProductsByQuery = async (req, res) => {
  
};
export const getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!type) {
      return res.status(400).json({ message: "Product type is required" });
    }
    console.log("Product type:", type);
    const products = await Product.find({
      type: type,
      isActive: true,
    })
      .select("title price thumbnail originalPrice discountPercentage _id")
      .limit(4)
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


//review product route


// add to card route
// product review route
// get similar products route