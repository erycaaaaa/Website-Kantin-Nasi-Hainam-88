const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: String,
  filename: String,
  mimetype: String,
  uploadDate: { type: Date, default: Date.now },
  size: Number
});

const pesananSchema = new mongoose.Schema({
  item: String,
  quantity: Number
});

const historySchema = new mongoose.Schema({
  username: String,
  tanggal: { type: Date, default: Date.now },
  pesanan: [pesananSchema],
  totalHarga: Number,
  buktiPembayaran: String,
  kode: Number,
  status: String
});

module.exports = mongoose.model("History", historySchema);
