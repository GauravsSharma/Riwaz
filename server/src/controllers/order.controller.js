import Order from '../models/Order.js';
import UserCart from '../models/userCart.js';
import crypto from "crypto";

import { rozarPayInstance } from '../config/rozarpay.js';
import Address from '../models/Address.js';
// import { stripe } from "../../server.js";

// you have to change the variant to productId
export const createCheckoutSession = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const userId = req.user.userId;
        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address id not found.",
            });
        }
        const address = await Address.findById(shippingAddress);
        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Shipping address not found.",
            });
        }
        if (address.userId !== userId) {
            return res.status(401).json({
                success: false,
                message: "Please kindly select your address",
            });
        }
        const cartItems = await UserCart
            .findOne({ userId })
        const totalAmount = cartItems.products.reduce((acc, item) => item.unitPrice * item.quantity + acc, 0)
        const options = {
            amount: totalAmount * 100,
            currency: "INR"
        }
        const razorpayOrder = await rozarPayInstance.orders.create(options);
        // console.log(order)
        const order = await Order.create({
            userId,
            orderItems: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.unitPrice,
                color: item.color,
                thumbnail: item.thumbnail,
            })),
            shippingAddress,
            paymentMethod: paymentMethod,
            paymentStatus: "pending",
            orderStatus: "pending",
            itemsPrice: totalAmount,
            shippingPrice: 0,
            totalPrice: totalAmount,
            deliveredAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            razorpayOrderId: razorpayOrder.id
        });
        return res.status(200).json({
            success: true,
            message: "Checkout session created successfully.",
            order: razorpayOrder
        });

    } catch (error) {
        console.error("Stripe checkout session error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create checkout session.",
            error: error.message,
        });
    }
};
export const createAndConfirmOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod } = req.body;
        const userId = req.user.userId;
        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address id not found.",
            });
        }
        const address = await Address.findById(shippingAddress);
        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Shipping address not found.",
            });
        }
        if (address.userId !== userId) {
            return res.status(401).json({
                success: false,
                message: "Please kindly select your address",
            });
        }
        const cartItems = await UserCart
            .findOne({ userId })
        const totalAmount = cartItems.products.reduce((acc, item) => item.unitPrice * item.quantity + acc, 0)
        // console.log(order)
        const order = await Order.create({
            userId,
            orderItems: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.unitPrice,
                color: item.color,
                thumbnail: item.thumbnail,
            })),
            shippingAddress,
            paymentMethod: paymentMethod,
            paymentStatus: "pending",
            orderStatus: "confirmed",
            itemsPrice: totalAmount,
            shippingPrice: 0,
            totalPrice: totalAmount,
            deliveredAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        });
        cartItems.products = []
        await cartItems.save()
        return res.status(200).json({
            success: true,
            message: "Your order has been placed successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create checkout session.",
            error: error.message,
        });
    }
}
export const paymentVerification = async (req, res) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        } = req.body;
        const userId = req.user.userId;
        const userCart = await UserCart.findOne({ userId });
        const order = await Order.find({ razorpayOrderId: razorpay_order_id })
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "No order found.",
            });
        }
        if (order.userId !== userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user order access.",
            });
        }
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.ROZARPAY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
        const payment = await rozarPayInstance.payments.fetch(razorpay_payment_id);
        order.paymentStatus = "paid"
        order.paymentId = razorpay_payment_id,
        order.paymentMode = payment.method,
        order.orderStatus = "confirmed"

        userCart.products = []
        await userCart.save()
        await order.save()
        return res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }
};