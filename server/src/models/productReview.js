import { text } from "express";
import mongoose from "mongoose";

const userReview = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        review: {
            type: String,
            required: true,
            trim: true,
        },
        images: [
            {
                url: {
                    type: String,
                }
            }
        ]
    },
    { timestamps: true }
);

const UserReview = mongoose.model('UserReview', userReview);
export default UserReview;
