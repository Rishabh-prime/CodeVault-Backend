const File = require("../Models/File");
const Folder = require("../Models/Folder");

// POST /api/files
const createFile = async (req, res) => {
  try {
    const { name, language, content, folderId } = req.body;

    if (!name || !folderId) {
      return res.status(400).json({ message: "File name and folder are required" });
    }

    // Make sure folder exists and belongs to user
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    if (folder.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const file = await File.create({
      name,
      language: language || "javascript",
      content: content || "",
      folder: folderId,
      user: req.user._id,
    });

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/files/folder/:folderId
const getFilesByFolder = async (req, res) => {
  try {
    // Make sure folder belongs to user
    const folder = await Folder.findById(req.params.folderId);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    if (folder.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const files = await File.find({
      folder: req.params.folderId,
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/files/:id  (single file for editor)
const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    if (file.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/files/:id
const updateFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    if (file.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, language, content } = req.body;
    if (name !== undefined) file.name = name;
    if (language !== undefined) file.language = language;
    if (content !== undefined) file.content = content;

    const updated = await file.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/files/:id
const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    if (file.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await file.deleteOne();
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFile,
  getFilesByFolder,
  getFileById,
  updateFile,
  deleteFile,
};