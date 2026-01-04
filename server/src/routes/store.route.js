import express from 'express';
import { createStore, deleteStore, getStoreById, getStores, updateStore } from '../controllers/store.controller.js';
// import { authMiddleware } from '../middlewares/auth.js';
import { sellerMiddleware } from '../middlewares/seller.js';

const router = express.Router();

router.post('/', sellerMiddleware, createStore);
router.get('/', sellerMiddleware,getStores);
router.delete('/:id', sellerMiddleware, deleteStore);
router.put('/:id', sellerMiddleware, updateStore);
router.get('/:id', sellerMiddleware, getStoreById);
// router.post('/:id', authMiddleware,);


export default router;