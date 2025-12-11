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
    const query = req.query.query?.trim();
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await Product.aggregate([
      {
        $search: {
          index: "default", // name of your Atlas Search index
          compound: {
            should: [
              {
                text: {
                  query,
                  path: ["title", "description", "type", "fabric", "work"],
                  fuzzy: { maxEdits: 2, prefixLength: 2 }
                }
              },
              {
                autocomplete: {
                  query,
                  path: "title",
                  tokenOrder: "sequential"
                }
              }
            ]
          }
        }
      },
      {
        $match: { isActive: true }
      },
      {
        $limit: 4
      },
      {
        $project: {
          _id: 1,
          price:1,
          title: 1,
          originalPrice: 1,
          discountPercentage: 1,
          thumbnail: 1,
          score: { $meta: "searchScore" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: results.length,
      products: results
    });
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ message: "Server error during search" });
  }
};
//review product route


// add to card route
// product review route
// get similar products route