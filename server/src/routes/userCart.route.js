import express from 'express';
import { addToCart, clearCart, getCart, getCartSummary, mergeCart, removeItemFromCart, updateCart, updateItemQuantity, validateCart } from '../controllers/userCart.controller.js';
import { authMiddleware } from '../middlewares/auth.js';


const router = express.Router();

router.get("/",authMiddleware,getCart)
router.get("/summary",authMiddleware,getCartSummary) //-d
router.get("/validate",authMiddleware,validateCart) // -t

router.post("/add",authMiddleware,addToCart)
router.post("/merge",authMiddleware,mergeCart)// -d

router.put("/",authMiddleware,updateCart)
router.put("/update",authMiddleware,updateItemQuantity) //-d

router.delete("/clear",authMiddleware,clearCart) //-d
router.delete("/:productId",authMiddleware,removeItemFromCart)

export default router;