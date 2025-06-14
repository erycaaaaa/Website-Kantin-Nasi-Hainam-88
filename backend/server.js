require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');

const cors = require("cors");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dataRoutes = require("./routes/dataRoutes");
const Menu = require("./models/Menu"); 
const User = require("./models/User"); 
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
app.use("/api/datas", dataRoutes)

mongoose.connect('mongodb+srv://geasandhea19:RYdcGEOvNw7dtouI@cluster0.lyzqhtm.mongodb.net/warung88?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

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

app.get('/', (req, res) => {
  res.send("Server is running!");
});

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

app.post('/api/memories', upload.single('photo'), async (req, res) => {
    try {
    const newMenu = new Menu({
      photo: req.file ? req.file.path : '',
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      status: true // or false, depending on your default logic
    });

    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  
  // ✅ [DELETE] Hapus menu
  app.delete('/api/memories/:id', async (req, res) => {
    try {
      await Menu.findByIdAndDelete(req.params.id);
      res.json({ message: 'Memory deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.put('/api/memories/:id', async (req, res) => {
    try {
      const memory = await Menu.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          status: req.body.status 
        },
        { new: true }
      );
      res.json(memory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });

app.get('/users/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
