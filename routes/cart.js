const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/save', async (req, res) => {
    const { userId, items } = req.body;
    try {
        await Cart.findOneAndUpdate(
            { userId },
            { items },
            { upsert: true, new: true }
        );
        res.json({ status: 'success', message: 'Cart disimpan' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Gagal menyimpan cart' });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.json(cart || { userId: req.params.userId, items: [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Gagal mengambil cart' });
    }
});

module.exports = router;
