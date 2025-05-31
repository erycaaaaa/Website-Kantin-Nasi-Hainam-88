const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  photo: String,
  name: String,
  description: String,
  price: Number,
  status: Boolean,
});

menuSchema.index({ name: 1 }); // Optional: untuk optimasi pencarian
module.exports = mongoose.model("Menu", menuSchema);
