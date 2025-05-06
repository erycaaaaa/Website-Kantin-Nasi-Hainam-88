const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart')//ini model schema

// Simpan ke DB
router.post('/save', async (req, res) => {
    const { userId, items } = req.body;
    try {
        await Cart.findOneAndUpdate({ userId }, { items }, { upsert: true });
        res.json({ status: 'success', message: 'Cart disimpan.' });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Gagal simpan cart.' });
    }
});

// Ambil dari DB
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.json(cart || { userId: req.params.userId, items: [] });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Gagal ambil cart.' });
    }
});

module.exports = router;
