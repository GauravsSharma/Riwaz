import redisClient from "../config/redis.js";
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

export async function tokenBucketRateLimit(ip) {
  const key = `rate_limit:${ip}`;
  const maxTokens = 10;      // Maximum bucket size
  const refillRate = 2;      // Har second 2 tokens milenge
  const refillInterval = 1000; // 1 second
  const now = Date.now();

  // Redis se current bucket state nikalo
  const bucket = await redisClient.hGetAll(key);

  // Agar pehli baar hai, toh bucket full rakho
  let tokens = parseFloat(bucket.tokens) || maxTokens;
  let lastRefill = parseInt(bucket.lastRefill) || now;

  // -------- REFILL LOGIC --------
  // Kitna time beeta hai?
  const timePassed = now - lastRefill; // milliseconds mein

  // Kitne tokens add hone chahiye?
  // Example: Agar 2 seconds beete hain aur refillRate = 2
  // toh: (2000 / 1000) * 2 = 4 tokens milenge
  const tokensToAdd = (timePassed / refillInterval) * refillRate;

  // Tokens add karo (but maximum limit se zyada nahi)
  tokens = Math.min(maxTokens, tokens + tokensToAdd);

  // -------- REQUEST CHECK --------
  // Kya kam se kam 1 token hai?
  if (tokens >= 1) {
    // Haan hai! Request allow karo
    tokens -= 1; // 1 token use kar lo

    // Redis mein updated values save karo
    await redisClient.hSet(key, {
      tokens: tokens.toString(),
      lastRefill: now.toString()
    });

    // Key ko expire kar do (1 hour baad delete ho jayegi)
    await redisClient.expire(key, 3600);

    return {
      allowed: true,
      tokensRemaining: Math.floor(tokens)
    };
  }

  // Nahi hai token! Request reject karo
  return {
    allowed: false,
    tokensRemaining: 0
  };
}

export default subtractStock;



