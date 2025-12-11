import express from 'express';
import { addAddress, becomeASeller, deleteAddress, getAddresses, getProfile, login, logout, updateAddress, updateOrAddProfile, verifyOtp } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.get("/",authMiddleware,getProfile)
router.get("/address",authMiddleware,getAddresses)

router.put("/profile",authMiddleware,updateOrAddProfile)
router.put("/address/:id",authMiddleware,updateAddress)

// Route to request OTP (login/register)
router.post('/login', login);
router.post('/become-seller', becomeASeller);
router.post('/address',authMiddleware, addAddress);

// Route to verify OTP and get auth token
router.post('/verify-otp', verifyOtp);
router.post('/logout', authMiddleware, logout);
router.delete('/address/:id', authMiddleware,deleteAddress);




export default router;