import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {


    try {
        // console.log("hello from auth");
        
        const token = req.cookies.token;   // ⬅️ Read token from cookie
        
        if (!token) {
            return res.status(401).json({ message: "Token missing. Please login." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // attach user to request
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
            error: error.message,
        });
    }
};
