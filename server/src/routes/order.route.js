import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { createAndConfirmOrder, createCheckoutSession, getUserOrders, paymentVerification, verifyOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.post("/create-checkout-session",authMiddleware,createCheckoutSession)
router.post("/paymentVerification",authMiddleware,paymentVerification)
router.post("/create-order",authMiddleware,createAndConfirmOrder)
router.get("/:orderId/verify",authMiddleware,verifyOrder)
router.get("/getUserOrder",authMiddleware,getUserOrders)

export default router;

