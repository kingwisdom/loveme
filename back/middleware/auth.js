import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized Invalid token" });
        }
        const currentUser = await User.findById(decoded.id);
        req.user = currentUser;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: "Unauthorized Token expired" });
        } else {
            res.status(401).json({ success: false, message: "eee Something went wrong", error: error.message });
        }
    }
} 