const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/authMiddleware"); // Import middleware

// Endpoint GET /api/orders, hanya bisa diakses oleh admin
router.get("/", isAdmin, (req, res) => {
    res.json({ message: "Daftar pesanan akan ditampilkan di sini (khusus admin)" });
});

module.exports = router;
