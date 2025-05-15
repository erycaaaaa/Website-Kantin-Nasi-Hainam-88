require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');

const cors = require("cors");
const connectDB = require("./config/db"); // Pastikan import connectDB dari db.js
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const Menu = require("./models/Menu"); // Tambahkan ini
const multer = require("multer");
const app = express();
const router = express.Router();
// Koneksi ke database

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const path = require("path");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

mongoose.connect('mongodb://localhost:27017/memories', { useNewUrlParser: true, useUnifiedTopology: true });

// Skema MongoDB
const memorySchema = new mongoose.Schema({
  photo: String,
  name: String,
  description: String,
  price: Number,
  created_at: { type: Date, default: Date.now }
});

const Memory = mongoose.model('Memory', memorySchema);

// Konfigurasi Multer untuk Upload Foto
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

app.post("/api/menu", upload.single("image"), async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file;

    if (!name || !price || !description || !image) {
        return res.status(400).json({
            success: false,
            message: "Semua field harus diisi!"
        });
    }

    // Simpan ke DB atau lanjutkan logikanya
});
app.get("/api/menu/:id/image", async (req, res) => {
    const menu = await Menu.findById(req.params.id);

    if (!menu || !menu.image || !menu.image.data) {
        return res.status(404).send("Image not found");
    }

    res.set("Content-Type", menu.image.contentType);
    res.send(menu.image.data);
});

router.post("/api/menu", upload.single("image"), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const imageFile = req.file;

        if (!name || !price || !description || !imageFile) {
            return res.status(400).json({ success: false, message: "Semua field harus diisi!" });
        }

        const newMenu = new Menu({
            name,
            price,
            description,
            image: {
                data: imageFile.buffer,
                contentType: imageFile.mimetype
            }
        });

        await newMenu.save();

        res.status(201).json({ success: true, message: "Menu berhasil ditambahkan!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
});
// ✅ [POST] Tambah menu
app.post('/api/memories', upload.single('photo'), async (req, res) => {
    try {
      const newMemory = new Memory({
        photo: req.file ? req.file.path : '',
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      });
      await newMemory.save();
      res.status(201).json(newMemory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // ✅ [GET] Ambil semua menu
  app.get('/api/memories', async (req, res) => {
    try {
      const memories = await Memory.find().sort({ created_at: -1 });
      res.json(memories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // ✅ [DELETE] Hapus menu
  app.delete('/api/memories/:id', async (req, res) => {
    try {
      await Memory.findByIdAndDelete(req.params.id);
      res.json({ message: 'Memory deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // ✅ [PUT] Update nama, deskripsi, dan harga
  app.put('/api/memories/:id', async (req, res) => {
    try {
      const memory = await Memory.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
        },
        { new: true }
      );
      res.json(memory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
