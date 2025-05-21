const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
  
// GET semua menu
router.get("/", async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ message: "Gagal mengambil data menu" });
    }
});

// Endpoint untuk menambah menu (hanya admin)
router.post("/", async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ success: false, message: "Semua field harus diisi!" });
        }
        const imagePath = req.file ? req.file.path : null;
        const newMenu = new Menu({
            name,
            price,
            description,
            image: imagePath,
            createdAt: new Date()
        });        
        await newMenu.save();

        res.status(201).json({ success: true, message: "Menu berhasil ditambahkan!", menu: newMenu });
    } catch (error) {
        console.error("Error saat menambahkan menu:", error);
        res.status(500).json({ success: false, message: "Gagal menambahkan menu", error: error.message });
    }
});
// PUT - Update menu
router.put("/:id", async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const updatedMenu = await Menu.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ message: "Menu tidak ditemukan" });
        }

        res.json({ message: "Menu berhasil diupdate", menu: updatedMenu });
    } catch (err) {
        console.error("Error update:", err);
        res.status(500).json({ message: "Gagal mengupdate menu" });
    }
});

// DELETE - Hapus menu
router.delete("/:id", async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) {
            return res.status(404).json({ message: "Menu tidak ditemukan" });
        }

        res.json({ message: "Menu berhasil dihapus" });
    } catch (err) {
        console.error("Error delete:", err);
        res.status(500).json({ message: "Gagal menghapus menu" });
    }
});

module.exports = router;
