import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { updateUser } from "../controllers/userController.js";


const router = express.Router();

router.put("/update", protectedRoute, updateUser)

export default router