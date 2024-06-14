import { Router } from "express";
import Campaign from "../models/Campaign.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";

const router = Router();

async function checkProductsExist(products) {
    const productNames = products.map(product => product.name);
    const existingProducts = await Product.find({ name: { $in: productNames } });
  
    const existingProductNames = existingProducts.map(product => product.name);
  
    const nonExistingProducts = productNames.filter(name => !existingProductNames.includes(name));
  
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
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res
      .status(400)
      .json({ success: false, message: "Products should be an array" });
  }
  try {
    const { exists, notExists } = await checkProductsExist(products);

    if (notExists.length > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: `Products not found: ${notExists.join(", ")}`,
        });
    }

    const campaign = new Campaign({
      products: exists.map((product) => ({
        name: product.name,
        price: product.price,
      })),
    });

    const savedCampaign = await campaign.save();
    res.status(200).json({ success: true, data: savedCampaign });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to save campaign",
        error: err.message,
      });
  }
});

router.put(
  "/:campaignId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { campaignId } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ success: false, message: "Products should be an array" });
    }

    try {
      const { exists, notExists } = await checkProductsExist(products);

      if (notExists.length > 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: `Products not found: ${notExists.join(", ")}`,
          });
      }

      const updatedCampaign = await Campaign.findByIdAndUpdate(
        campaignId,
        {
          products: exists.map((product) => ({
            name: product.name,
            price: product.price,
          })),
        },
        { new: true, runValidators: true }
      );

      if (!updatedCampaign) {
        return res
          .status(404)
          .json({ success: false, message: "Campaign not found" });
      }

      res.status(200).json({ success: true, data: updatedCampaign });
    } catch (err) {
      res
        .status(400)
        .json({
          success: false,
          message: "Failed to update campaign",
          error: err.message,
        });
    }
  }
);

export default router;
