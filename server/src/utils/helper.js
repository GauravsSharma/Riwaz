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


