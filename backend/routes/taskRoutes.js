const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middlewares/authMiddleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");

router.post("/", protectRoute, createTask);
router.get("/", protectRoute, getTasks);
router.put("/:id", protectRoute, updateTask);
router.delete("/:id", protectRoute, deleteTask);

module.exports = router;