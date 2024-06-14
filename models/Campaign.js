import mongoose from "mongoose";

const CampaignSchema = mongoose.Schema({
  products: {
    type: Object,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Campaigns", CampaignSchema);
