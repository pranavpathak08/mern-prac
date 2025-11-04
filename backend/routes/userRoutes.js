const express = require("express");
const router = express.Router();

const { getUserProfile } = require("../controllers/userController");
const { protectRoute } = require("../middlewares/authMiddleware");

router.get("/profile", protectRoute, getUserProfile);
module.exports = router;