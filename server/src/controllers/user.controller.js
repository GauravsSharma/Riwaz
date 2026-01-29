import jwt from 'jsonwebtoken';
import Address from '../models/Address.js';
import User from '../models/user.js';
import { sendOTP } from '../utils/sendOtp.js';
import { createUserCart } from '../utils/helper.js';

const isProd = process.env.NODE_ENV === "production";

// Replace with your secret key


export const login = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: "Phone number is required." });
        }

        // Find user by phone
        let user = await User.findOne({ phone });

        // Create a new user if not exists
        if (!user) {
            user = await User.create({ phone });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 30 days validity
        // Save OTP and expiry to the user document
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP via Twilio or other SMS provider
        await sendOTP(phone, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
            otpExpires,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed.",
            error: error.message,
        });
    }
}
export const verifyOtp = async (req, res) => {
    const { phone, otp, userType } = req.body;
    if (!phone || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required.' });
    }
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({ message: 'OTP not requested.' });
        }
        if (user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP.' });
        }
        if (new Date() > user.otpExpires) {
            return res.status(401).json({ message: 'OTP expired.' });
        }
        if (userType != 'seller' && userType != 'customer') {
            return res.status(400).json({ message: 'Invalid user type.' });
        }
        // Clear OTP fields after successful verification
        user.otp = null;
        user.otpExpires = null;
        user.userType = userType;
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, phone: user.phone, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '30d' });
        await createUserCart(user._id);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        // Send response to frontend
        return res.status(200).json({
            message: "OTP verified successfully.",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: 'OTP verification failed.', error: error.message });
    }
}
export const becomeASeller = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required.' });
        }
        let user = await User.findOne({ phone });
        if (!user) {
            user = await User.create({ phone });
        }

        if (user.userType === 'seller') {
            return res.status(400).json({ message: 'User is already a seller.' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Save OTP and expiry to user
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP via Twilio
        await sendOTP(phone, otp);

        return res.status(200).json({
            message: 'OTP sent successfully.',
            otpExpires,
        });

    }
    catch (error) {
        return res.status(500).json({ message: 'Profile update failed.', error: error.message });
    }
}
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-otp -otpExpires");
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch profile.', error: error.message });
    }
}
export const updateOrAddProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (name) {
            user.fullName = name;
        }
        if (email) {
            user.email = email;
        }
        await user.save();
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error}` });
    }
}
export const getAddresses = async (req, res) => {
    try {
        const userId = req.user.userId;
        const addresses = await Address.find({ userId });
        return res.status(200).json({ addresses });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error}` });
    }
}
export const addAddress = async (req, res) => {
    try {
        const { landmark, address, state, city, pincode, isDefault } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (!landmark || !address || !state || !city || !pincode) {
            return res.status(400).json({ message: 'All address fields except address2 are required.' });
        }
        const new_address = await Address.create({
            landmark,
            address,
            state,
            city,
            pincode,
            userId,
            country: "India",
            isDefault: isDefault || true,
            type: "home"
        })
        user.address.push(new_address._id)
        await user.save();
        return res.status(200).json({ success: true, address: new_address });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error}` });
    }
}
export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { landmark, address, state, city, pincode } = req.body;
        const userId = req.user.userId;
        if (!id) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const db_address = await Address.findById(id);
        if (db_address.userId.toString() !== userId) {
            return res.status(404).json({ message: 'You are not authorized to perform this action.' });
        }

        if (landmark) {
            db_address.landmark = landmark;
        }
        if (address) {
            db_address.address = address;
        }
        if (state) {
            db_address.state = state;
        }
        if (city) {
            db_address.city = city;
        }
        if (pincode) {
            db_address.pincode = pincode;
        }
        await db_address.save();
        return res.status(200).json({ success: true, address: db_address });

    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error}` });

    }
}
export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        if (!id) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const address = await Address.findById(id);
        if (address.userId.toString() !== userId) {
            return res.status(404).json({ message: 'You are not authorized to perform this action.' });
        }
        const user = await User.findById(userId);
        const index = user.address.findIndex((addId) => addId.toString() === id);
        if (index === -1) {
            return res.status(404).json({ message: 'Address not found.' });
        }
        user.address.splice(index, 1);
        await user.save();
        await address.deleteOne();
        return res.status(200).json({ success: true, message: "Address deleted." });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error}` });

    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        res.clearCookie("userType", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        return res.status(500).json({
            message: "Logout failed.",
            error: error.message,
        });
    }
};

