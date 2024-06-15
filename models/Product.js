import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

ProductSchema.pre('save', function (next) {
  this.modifiedAt = Date.now();
  next();
});

ProductSchema.pre('findOneAndUpdate', function (next) {
  this._update.modifiedAt = Date.now();
  next();
});

export default mongoose.model("Products", ProductSchema);
