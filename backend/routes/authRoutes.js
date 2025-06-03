const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Auth route is working" });
});
router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "Protected route accessed!", user: req.user });
});

// Register dengan Email & Password
router.post("/register", async (req, res) => {
    console.log("Hit API /register");
    const { fullName, email, password, phone } = req.body;
    const username = fullName; // Menggunakan fullName sebagai username
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, phone, password: hashedPassword, created_at: new Date() });
        await user.save();
        res.status(201).json({ message: "User registered!" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login dengan Email & Password
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Password salah" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, role: user.role, username: user.username }); 
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
});

router.post("/change-password", verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { $set: { password: hashedNewPassword } });

    res.json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    if (error.name === "ValidationError") {
      // Extract all validation error messages
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server error" });
  }
});

router.delete('/delete-account', verifyToken, async (req, res) => {
  try {
    const { username } = req.body;
    const userId = req.user.id; // from verifyToken middleware

    if (!username) {
      return res.status(400).json({ message: 'Username harus diisi.' });
    }

    // Find user by ID and verify username matches for extra safety
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });

    if (user.username !== username) {
      return res.status(403).json({ message: 'Username tidak cocok.' });
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Akun berhasil dihapus.' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  }
});




module.exports = router;
