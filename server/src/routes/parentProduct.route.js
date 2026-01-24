

import express from 'express';
import { sellerMiddleware } from '../middlewares/seller.js';
import { createParentProduct, getParentProducts } from '../controllers/parentProduct.controller.js';


const router = express.Router();

router.get("/",sellerMiddleware,getParentProducts)

router.post("/",sellerMiddleware,createParentProduct)


export default router;

