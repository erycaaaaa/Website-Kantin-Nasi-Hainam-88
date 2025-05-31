const mongoose = require("mongoose");

const pesananSchema = new mongoose.Schema({
  item: String,
  quantity: Number
});

const historySchema = new mongoose.Schema({
  username: String,
  tanggal: { type: Date, default: Date.now },
  pesanan: [[mongoose.Schema.Types.Mixed]],
  totalHarga: Number,
  buktiPembayaran: String,
  kode: Number,
  status: String
});

module.exports = mongoose.model("History", historySchema);
