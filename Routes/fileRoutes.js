const express = require("express");
const {
  createFile,
  getFilesByFolder,
  getFileById,
  updateFile,
  deleteFile,
} = require("../Controllers/fileController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// All routes protected
router.use(protect);

router.post("/", createFile);
router.get("/folder/:folderId", getFilesByFolder);
router.get("/:id", getFileById);
router.put("/:id", updateFile);
router.delete("/:id", deleteFile);

module.exports = router;