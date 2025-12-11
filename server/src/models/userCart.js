import { text } from "express";
import mongoose from "mongoose";



const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    thumbnail: {
      type:String
    },
    discountPercentage:{
      type:Number
    }
  },
  { _id: false }
);

const userCartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [cartItemSchema],
  },
  {
    timestamps: true,
    collection: "usercarts",
  }
);

const UserCart = mongoose.model('UserCart', userCartSchema);
export default UserCart;
