import Stripe from "stripe";
import Order from '../models/Order.js';
import UserCart from '../models/userCart.js';
import Product from '../models/product.js';
import { stripe } from "../../server.js";

// you have to change the variant to productId
export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.user.userId;
        
       
        const usercart = await UserCart.findOne({ userId }).populate("products.productId");
        if (!usercart) {
            return res.status(400).json({
                success: false,
                message: "User cart not found.",
            });
        }

        if (usercart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User cart is empty.",
            });
        }
        const line_items = usercart.products.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.productId?.title || "Unknown Product",
                    description: item.productId?.description || "",
                    images: item.thumbnail.url ? [item.thumbnail.url] : [],
                },
                unit_amount: Math.round(item.unitPrice * 100), // Stripe uses cents
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], // ✅ should be "card", not "cards"
            mode: "payment",
            line_items,
            success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout-cancel`,
            metadata: {
                userId,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Checkout session created successfully.",
            sessionUrl: session.url,
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

export const placeOrder = async (req, res) => {
    try {
        const {
            shippingAddress,
            paymentMethod,
            paymentStatus,
            paymentId = null,
            orderStatus,
            deliveredAt
        } = req.body;

        // Validation for required fields
        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }

        // Validate shippingAddress is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(shippingAddress)) {
            return res.status(400).json({
                success: false,
                message: "Invalid shipping address ID"
            });
        }

        // Validate paymentMethod
        const validPaymentMethods = ["COD", "Razorpay", "Stripe"];
        if (paymentMethod && !validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: `Payment method must be one of: ${validPaymentMethods.join(", ")}`
            });
        }

        // Validate paymentStatus
        const validPaymentStatuses = ["pending", "paid", "failed"];
        if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
            return res.status(400).json({
                success: false,
                message: `Payment status must be one of: ${validPaymentStatuses.join(", ")}`
            });
        }

        // Validate orderStatus
        const validOrderStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
        if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: `Order status must be one of: ${validOrderStatuses.join(", ")}`
            });
        }

        // Validate deliveredAt is a valid date if provided
        if (deliveredAt) {
            const date = new Date(deliveredAt);
            if (isNaN(date.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format for deliveredAt"
                });
            }
        }

        const userId = req.user.userId;

        // Validate user cart exists
        const usercart = await UserCart.findOne({ userId });
        if (!usercart) {
            return res.status(404).json({
                success: false,
                message: "User cart not found"
            });
        }

        const products = usercart.products;

        // Validate cart is not empty
        if (!products || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty. Cannot place order."
            });
        }

        const orderedItems = [];
        let totalPrice = 0;

        for (let item of products) {
            const product = await Product.findById(item.productId)

            // Validate product exists
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found`
                });
            }

          
            // Validate stock availability
            if (item.quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name || 'product'} (${item.color}). Available: ${product.stock}, Requested: ${item.quantity}`
                });
            }

            // Validate quantity is positive
            if (item.quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Quantity must be greater than 0"
                });
            }

            const orderItem = {
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
                color: product.color
            }
            orderedItems.push(orderItem);
            totalPrice += (orderItem.price * orderItem.quantity);
        }

        // Validate total price is positive
        if (totalPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid order total. Total price must be greater than 0"
            });
        }

        const order = await Order.create({
            userId,
            orderItems: orderedItems,
            shippingAddress,
            paymentMethod: paymentMethod || "COD",
            paymentStatus: paymentStatus || "pending",
            paymentId,
            orderStatus: orderStatus || "pending",
            deliveredAt: deliveredAt ? new Date(deliveredAt) : undefined,
            shippingPrice: 0,
            itemsPrice: totalPrice,
            totalPrice,
        })

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