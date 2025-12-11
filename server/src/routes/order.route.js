

import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { createCheckoutSession, placeOrder } from '../controllers/order.controller.js';


const router = express.Router();

router.post("/place-order",authMiddleware,placeOrder)
router.post("/create-checkout-session",authMiddleware,createCheckoutSession)

export default router;

