import jwt from 'jsonwebtoken';

export const sellerMiddleware = (req, res, next) => {


    try {
        // console.log("hello from sleer");
        const token = req.cookies.token;
   console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Token missing. Please login." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userType !== "seller") {
            return res.status(403).json({ message: "You are not authorized as a seller." });
        }

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
            error: error.message,
        });
    }
};
