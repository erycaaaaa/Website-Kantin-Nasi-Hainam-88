const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cartRoutes = require('./models/Cart.js');

const app = express();

// Middleware untuk melayani file statis
app.use(express.static('public')); // Menyajikan file-file di dalam folder 'public'

// Middleware lainnya
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/kantin88', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Menyediakan halaman utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Menambahkan route untuk cart
app.use('/api/cart', cartRoutes);

// Menjalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
