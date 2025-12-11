import mongoose from "mongoose";
import Address from "./Address.js";


// how user will place a order ?
// create address schema
// store address based on user address fields 
// send the address id from frontend 


// before calling the create order api, check
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // variantId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "ProductVariant",
  // },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }, // price per item
  color: {
    type: String,
    required: true
  }
});


const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay", "Stripe"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      default: null,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    cancelReason: {
      type: String,
      default: "",
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export default mongoose.model("Order", orderSchema);
