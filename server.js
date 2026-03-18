const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./Config/db");
const authRoutes = require("./Routes/authRoutes");
const folderRoutes = require("./Routes/folderRoutes");
const fileRoutes = require("./Routes/fileRoutes");
const taskRoutes = require("./Routes/taskRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("CodeVault API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});