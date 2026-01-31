import Product from "../models/product.js";
import UserCart from "../models/userCart.js";

// utils/createUserCart.js
export async function createUserCart (userId){
  try {
    // Check if cart already exists
    let userCart = await UserCart.findOne({ userId });

    if (userCart) {
      return userCart;
    }

    // Create a new cart
    userCart = await UserCart.create({
      userId,
      products: []
    });

    return userCart;
  } catch (error) {
    console.error("Error creating user cart:", error);
    throw new Error("Unable to create user cart");
  }
};


export function getDiscountPercentage(originalPrice, discountedPrice) {
  if (originalPrice <= 0) return 0; 
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
  return Math.round(discount); 
}

/**
 * cart_products = [
 *   { productId: "65fa...", quantity: 2 },
 *   { productId: "65fb...", quantity: 1 }
 * ]
 */

const subtractStock = async (cart_products) => {
  if (!cart_products || cart_products.length === 0) return;

  const bulkOps = cart_products.map(item => ({
    updateOne: {
      filter: {
        _id: item.productId,
        stock: { $gte: item.quantity } 
      },
      update: [
        {
          $set: {
            stock: { $subtract: ["$stock", item.quantity] }
          }
        },
        {
          $set: {
            isActive: {
              $cond: [
                { $lte: ["$stock", 0] }, // if stock <= 0
                false,                   // deactivate product
                true                     // keep active
              ]
            }
          }
        }
      ]
    }
  }));

  const result = await Product.bulkWrite(bulkOps);

  if (result.modifiedCount !== cart_products.length) {
    throw new Error("Some products are out of stock");
  }

  return true;
};

export default subtractStock;



