import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { createAndConfirmOrder, createCheckoutSession, getAdminOrders, getUserOrders, paymentVerification, updateOrderStatus, verifyOrder } from '../controllers/order.controller.js';
import { sellerMiddleware } from '../middlewares/seller.js';

const router = express.Router();

router.post("/create-checkout-session",authMiddleware,createCheckoutSession)
router.post("/paymentVerification",authMiddleware,paymentVerification)
router.post("/create-order",authMiddleware,createAndConfirmOrder)
router.put("/update-order-status/:orderId",sellerMiddleware,updateOrderStatus)
router.get("/:orderId/verify",authMiddleware,verifyOrder)
router.get("/getUserOrder",authMiddleware,getUserOrders)
router.get("/getAdminOrders",authMiddleware,getAdminOrders)

export default router;

