import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { getProductById, getProductsByType, getProducts, getSingleProduct, searchProducts, getProductsByQuery } from '../controllers/product-buyers.controller.js';
import { addVariant, createProduct, deleteProduct, getStoreProducts, uploadMedia } from '../controllers/product-admin.controller.js';
import { sellerMiddleware } from '../middlewares/seller.js';
import { upload } from '../config/multer.js';


const router = express.Router();
//customer routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/find', getProductsByQuery);
router.get('/single', getSingleProduct);
router.get('/type/:type', getProductsByType);
router.get('/id/:id', getProductById);

//seller routes
router.get('/store/:storeId',sellerMiddleware, getStoreProducts);
router.post('/', sellerMiddleware, createProduct);
router.post("/upload/:productId",sellerMiddleware,upload.array("images", 5), uploadMedia);
router.post('/variants',sellerMiddleware, addVariant);
router.delete('/:productId',sellerMiddleware, deleteProduct);


export default router;