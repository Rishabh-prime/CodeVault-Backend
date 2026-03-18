const Folder = require("../Models/Folder");

// POST /api/folders
const createFolder = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    const folder = await Folder.create({
      name,
      color: color || "#ffffff",
      user: req.user._id,
    });

    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/folders
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/folders/:id
const updateFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Make sure folder belongs to logged-in user
    if (folder.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, color } = req.body;
    if (name) folder.name = name;
    if (color) folder.color = color;

    const updated = await folder.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/folders/:id
const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Make sure folder belongs to logged-in user
    if (folder.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await folder.deleteOne();

    // TODO: when File model is ready, also delete all files inside this folder:
    // await File.deleteMany({ folder: req.params.id });

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createFolder, getFolders, updateFolder, deleteFolder };