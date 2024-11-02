import express from "express";
import { protectedRoute } from "../middleware/auth.js";
import { getMatches, getUserProfiles, swipeLeft, swipeRight } from "../controllers/matchesController.js";


const router = express.Router();

router.post("/swipe-right/:likeUserId", protectedRoute, swipeRight)
router.post("/swipe-left/:likeUserId", protectedRoute, swipeLeft)

router.get("/", protectedRoute, getMatches);
router.get("/user-profiles", protectedRoute, getUserProfiles)

export default router