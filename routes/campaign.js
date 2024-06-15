import { Router } from "express";
import Campaign from "../models/Campaign.js";
import Product from "../models/Product.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const router = Router();

async function checkProductsExist(products) {
  const productTitles = products.map(product => product.title);
  const existingProducts = await Product.find({ title: { $in: productTitles } });

  const existingProductTitles = existingProducts.map(product => product.title);

  const nonExistingProducts = productTitles.filter(title => !existingProductTitles.includes(title));

  return {
    exists: existingProducts,
    notExists: nonExistingProducts
  };
}

  

router.get("/", authMiddleware, async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json({ success: true, data: campaigns });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  const { products, price } = req.body;
  
  if (!Array.isArray(products)) {
    return res.status(400).json({ success: false, message: "Products should be an array" });
  }
  try {
    const { exists, notExists } = await checkProductsExist(products);

    if (notExists.length > 0) {
      return res.status(400).json({ success: false, message: `Products not found: ${notExists.join(', ')}` });
    }

    const campaign = new Campaign({
      products: exists.map(product => ({
        title: product.title,
      })),
      price: price  
    });

    const savedCampaign = await campaign.save();
    res.status(200).json({ success: true, data: savedCampaign });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to save campaign", error: err.message });
  }
});

export default router;