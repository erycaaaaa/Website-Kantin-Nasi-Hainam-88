const express = require("express");
const router = express.Router();

// Contoh endpoint GET /api/orders
router.get("/", (req, res) => {
    res.json({ message: "Daftar pesanan akan ditampilkan di sini" });
});

module.exports = router;
