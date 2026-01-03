import Razorpay from "razorpay"
import dotenv from "dotenv";

dotenv.config();

export let rozarPayInstance = new Razorpay({
    key_id: process.env.ROZARPAY_API_KEY,
    key_secret: process.env.ROZARPAY_SECRET,
});
