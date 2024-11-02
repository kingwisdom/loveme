import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { protectedRoute } from "../middleware/auth.js";

const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.get("/me", protectedRoute, (req, res) => {
    res.status(200).json({ success: true, message: "User Information", user: req?.user });
});

export default router