const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: String,
  filename: String,
  mimetype: String,
  uploadDate: { type: Date, default: Date.now },
  size: Number
});

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [imageSchema]
});

menuSchema.index({ name: 1 }); // Optional: untuk optimasi pencarian
module.exports = mongoose.model("Menu", menuSchema);
