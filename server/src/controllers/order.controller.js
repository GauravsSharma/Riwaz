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
    const address = await Address.findOne({ _id: shippingAddress, userId: userId });
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Shipping address not found.",
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
      orderItems: cartItems.products.map(item => ({
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

    if (address.userId.toString() !== userId) {
      return res.status(401).json({
        success: false,
        message: "Please select your own address.",
      });
    }

    const cart = await UserCart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    const totalAmount = cart.products.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      orderItems: cart.products.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.unitPrice,
        color: item.color,
        thumbnail: item.thumbnail,
      })),
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "confirmed",
      itemsPrice: totalAmount,
      shippingPrice: 0,
      totalPrice: totalAmount,
      deliveredAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });


    return res.status(200).json({
      success: true,
      message: "Order placed successfully.",
      orderId: order._id
    });

  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    } = req.body;
    const userId = req.user.userId;
    const userCart = await UserCart.findOne({ userId });
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id,userId:userId }).sort({ createdAt: -1 })
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found.",
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
      message: "Order placed successfully.",
      orderId: order._id
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message
    });
  }
};
export const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;
    console.log(orderId, " ", userId);

    const order = await Order.findOne({
      _id: orderId,
      userId: userId,
    }).select("_id paymentMethod totalAmount paymentStatus orderStatus createdAt");

    console.log(order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // COD verification
    if (
      order.paymentMethod === "COD" &&
      order.orderStatus !== "confirmed"
    ) {
      return res.status(403).json({
        success: false,
        message: "COD order not confirmed yet",
      });
    }

    // Razorpay verification
    if (
      order.paymentMethod === "Razorpay" &&
      order.paymentStatus !== "paid"
    ) {
      return res.status(403).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // ✅ Genuine order
    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid order id",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, status } = req.query;

    // Build filter query
    const filter = { userId };
    
    if (status) {
      filter.orderStatus = status;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch orders with selected fields only
    const orders = await Order.find(filter)
      .select('_id orderItems paymentMethod paymentStatus orderStatus totalPrice createdAt deliveredAt')
      .sort({ createdAt: -1 }) // Most recent first
      .skip(skip)
      .limit(parseInt(limit))
      .lean(); // Convert to plain JavaScript objects for better performance

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    return res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalOrders,
        hasMore: parseInt(page) < totalPages,
      },
    });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};