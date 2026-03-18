const express = require("express");
const {
  createFolder,
  getFolders,
  updateFolder,
  deleteFolder,
} = require("../Controllers/folderController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

// All routes below are protected
router.use(protect);

router.post("/", createFolder);
router.get("/", getFolders);
router.put("/:id", updateFolder);
router.delete("/:id", deleteFolder);

module.exports = router;