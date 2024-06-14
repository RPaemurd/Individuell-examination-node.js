import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import { authMiddleware, adminMiddleware } from '../middlewares/auth.js';

const router = Router();

// Get all stock items
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});


router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const product = new Product({
    id: req.body.id,
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).json({ success: true, data: savedProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to save stock item", error: err.message });
  }
});



router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          desc: req.body.desc,
          price: req.body.price, // Set modifiedAt to current date and time
        },
      },
      { new: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
