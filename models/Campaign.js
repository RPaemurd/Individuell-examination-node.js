import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  }
});

const campaignSchema = new Schema({
  products: {
    type: [productSchema],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ser till att numret är positivt
  },
});



export default model('Campaign', campaignSchema);
