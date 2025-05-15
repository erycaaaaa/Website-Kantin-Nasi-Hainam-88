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
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
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

        res.json({ token, role: user.role }); // Kirim token + role ke frontend
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
});




module.exports = router;
