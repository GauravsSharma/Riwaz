import Product from "../models/product.js";
import UserCart from "../models/userCart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let userCart = await UserCart.findOne({ userId });
    if (!userCart) {
       return res.status(400).json({ success:false, message: "UserCart not found. Please login first" });
    }
    const index = userCart.products.findIndex(
      (pro) => pro.productId.toString() === productId
    );

    if (index === -1) {
      userCart.products.push({
        productId,
        quantity,
        title: product.title,
        unitPrice: product.price,
        color: product.color,
        thumbnail: product.thumbnail.url,
        discountPercentage:product.discountPercentage
      });
    } else {
      userCart.products[index].quantity += quantity; // increment quantity
    }
    await userCart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cartItem: {
        productId,
        title: product.title,
        quantity:userCart.products[index].quantity,
        unitPrice: product.price,
        color: product.color,
        thumbnail: product.thumbnail.url
      },
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = await UserCart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "No item found in the cart"
      })
    }
    return res.status(200).json({
      success: true,
      cartItems: userCart.products
    })
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
}

export const updateCart = async (req, res) => {
  try {
    const cartItems = req.body;
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Expected an array of cart items" });
    }
    const userId = req.user.userId;
    const userCart = await UserCart.findOne({ userId });
    if (!userCart) {
      return res.status(400).json({ message: "UserCart not found." });
    }

    // Validate and find all indices first
    const updates = [];
    for (const item of cartItems) {
      // Validate quantity
      if (!item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for product id: ${item.productId}`
        });
      }

      const index = userCart.products.findIndex(pro => pro.productId.toString() === item.productId);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: `Item not found with product id: ${item.productId}`
        });
      }
      updates.push({ index, quantity: item.quantity });
    }

    // Apply all updates
    for (const update of updates) {
      userCart.products[update.index].quantity = update.quantity;
    }

    await userCart.save();
    return res.status(200).json({
      success: true,
      cart: userCart
    });

  } catch (error) {
    console.error('Error updating cart:', error); // Log the actual error
    return res.status(500).json({
      success: false,
      message: 'Internal server error' // Don't expose error details
    });
  }
}

export const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }
    const userCart = await UserCart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "UserCart not found"
      })
    }
    const index = userCart.products.findIndex((item) => item.productId.toString() === productId);
    if (index == -1) {
      return res.status(404).json({
        success: false,
        message: "Item found in the cart"
      })
    }
    userCart.products.splice(index, 1);
    await userCart.save()
    return res.status(200).json({
      success: true,
      message: "Item removed"
    })
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: `Internal server error: ${error}`
    })
  }
}
//clearCart - Remove all items from cart at once
// Useful after checkout or when user wants to start fresh

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = await UserCart.findOne({ userId });
    userCart.products = [];
    await userCart.save();
    return res.status(200).json({
      success: true,
      message: "Cart Cleared successfully."
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`
    })
  }
}
// getCartSummary - Get cart totals without full product details
// Returns: item count, subtotal, tax, total
// Useful for displaying cart badge/icon

export const getCartSummary = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = await UserCart.findOne({ userId });
    const itemCount = userCart.products.length;
    const total = userCart.products.reduce((acc, val) => {
      return acc + (val.quantity * val.unitPrice);
    }, 0);
    return res.status(200).json({
      success: true,
      itemCount,
      total
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`
    })
  }
}

//updateItemQuantity - Update single item quantity
// More efficient than updating entire cart for one item
export const updateItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: `ProductId quantity is missing or invalid`
      })
    }
    const userCart = await UserCart.findOne({ userId });
    const index = userCart.products.findIndex((pro) => pro.productId.toString() === productId);
    if (index === -1) {
      return res.status(200).json({
        success: false,
        message: `Product not found in user cart`
      })
    }
    userCart.products[index].quantity = quantity;
    await userCart.save();
    return res.status(200).json({
      success: true,
      item: userCart.products[index]
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`
    })
  }
}

// mergeCart - Merge guest cart with user cart after login
export const mergeCart = async (req, res) => {
  try {
    const cartItems = req.body;
    const userId = req.user.userId;

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Expected an array of cart items" });
    }

    let userCart = await UserCart.findOne({ userId });

    for (let item of cartItems) {
      const product = await Product.findById(item.productId)

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found with id: ${item.productId}`,
        });
      }

      if (item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for product id: ${product._id}`,
        });
      }
      userCart.products.push({
        productId: product._id,
        unitPrice: product.price,
        quantity: item.quantity,
        color: product.color,
        thumbnail: product.thumbnail
      });
    }

    await userCart.save();

    return res.status(200).json({
      success: true,
      message: `All products added to cart.`,
      cart: userCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

// validateCart - Check if items are still in stock/valid before checkout
export const validateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = await UserCart.findOne({ userId });

    const validationResults = [];
    for (const item of userCart.products) {
      const product = await Product.findById(item.productId)
      if (!product) {
        validationResults.push({
          productId: item.productId,
          valid: false,
          message: "Product not found"
        });
        continue;
      }
      // const variant = product.variants.find(v => v.color.toLowerCase() === item.color.toLowerCase());
      // if (!variant) {
      //   validationResults.push({
      //     productId: item.productId,
      //     valid: false,
      //     message: "Variant not found"
      //   });
      //   continue;
      // }
      if (product.stock < item.quantity) {
        validationResults.push({
          productId: item.productId,
          valid: false,
          message: `Only ${product.stock} items in stock`
        });
        continue;
      }
      validationResults.push({
        productId: item.productId,
        valid: true,
        message: "Item is valid"
      });
    }
    return res.status(200).json({
      success: true,
      validationResults
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal Server Error: ${error}`
    });
  }
}

//how user will place the order
// payment gateway integration
// user profle update 