import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { createCheckoutSession, paymentVerification } from '../controllers/order.controller.js';

const router = express.Router();

router.post("/create-checkout-session",authMiddleware,createCheckoutSession)
router.post("/paymentVerification",authMiddleware,paymentVerification)

export default router;

