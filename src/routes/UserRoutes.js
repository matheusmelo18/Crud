const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  generateReport,
} = require("../controllers/UserControllers");
const {
  authenticateToken,
  authorizeLevel,
} = require("../middleware/AuthMiddleware");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/report", authenticateToken, authorizeLevel(4), generateReport);

module.exports = router;
