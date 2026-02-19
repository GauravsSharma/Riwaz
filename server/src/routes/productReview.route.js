import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { deleteReview, getReviewsByProductId, postReview, updateReview } from '../controllers/productReview.controller.js';
import { ipRateLimiter } from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();
//customer routes
router.post('/', authMiddleware,ipRateLimiter,postReview);
router.get('/:id',getReviewsByProductId);
router.put('/:id', authMiddleware,updateReview);
router.delete('/:id', authMiddleware,deleteReview);

export default router;