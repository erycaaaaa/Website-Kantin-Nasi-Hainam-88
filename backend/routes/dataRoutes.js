const express = require("express");
const router = express.Router();
const Data = require("../models/Data.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `buktipembayaran-${Date.now()}-${Math.random().toString(36).substring(2,8)}`;
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  }
});
const upload = multer({ storage });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  // Send back the full filename including extension
  res.status(200).json({ 
    message: "File uploaded successfully.",
    filename: req.file.filename
  });
});

router.post('/', async (req, res) => {
  try {
    const { username, tanggal, pesanan, totalHarga, buktiPembayaran, kode, status } = req.body;

    const newData = new Data({
      username,
      tanggal,
      pesanan,
      totalHarga,
      buktiPembayaran,
      kode,
      status
    });

    await newData.save();
    res.status(201).json({ message: 'Order saved successfully!' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to save order' });
  }
});

router.get('/viewData', async (req, res) => {
  try {
    const data = await Data.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Error fetching subjects');
  }
});

router.put('/updateStatus/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedItem = await Data.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send('Failed to update status');
  }
});

module.exports = router;