// server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const productModel = require("./models/products");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/Images", express.static(path.join(__dirname, "public/Images")));

// Ensure Images folder exists
const imagesDir = path.join(__dirname, "public", "Images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
const upload = multer({ storage });

// -------------------- PRODUCT ROUTES -------------------- //

// Create product
app.post(
  "/products",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("REQ.BODY:", req.body);
      console.log("REQ.FILES:", req.files);

      if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "Image is required" });
      }

      const newProduct = {
        title: req.body.title,
        description: req.body.description,
        language: req.body.language,
        category: req.body.category,
        plan: req.body.plan,
        file: req.files.file[0].filename,
        video: req.files.video ? req.files.video[0].filename : null,
      };

      const created = await productModel.create(newProduct);
      res.json(created);
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
app.put(
  "/products/:id",
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = { ...req.body };

      if (req.files.file) updateData.file = req.files.file[0].filename;
      if (req.files.video) updateData.video = req.files.video[0].filename;

      await productModel.findByIdAndUpdate(req.params.id, updateData);
      res.json({ message: "Updated Successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product.file) {
      const filePath = path.join(imagesDir, product.file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    if (product.video) {
      const videoPath = path.join(imagesDir, product.video);
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    }

    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- START SERVER -------------------- //
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server running on port", PORT));