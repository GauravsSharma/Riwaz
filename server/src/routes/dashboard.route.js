import express from 'express';
import { getDashboardStats, getLowStockProducts, getRecentOrders, getRevenueOverview, getStoreSalesOverview, getTopSellingProducts } from '../controllers/dashboard.controller.js';
import { sellerMiddleware } from '../middlewares/seller.js';

const router = express.Router();

// Route to get dashboard statistics
router.get('/stats', sellerMiddleware, getDashboardStats);
router.get('/top-three', sellerMiddleware, getTopSellingProducts);
router.get('/low-stock', sellerMiddleware, getLowStockProducts);
router.get('/recent-orders', sellerMiddleware, getRecentOrders);
router.get('/selles-overview', sellerMiddleware, getStoreSalesOverview);
router.get('/revenue-overview', sellerMiddleware, getRevenueOverview);

export default router;