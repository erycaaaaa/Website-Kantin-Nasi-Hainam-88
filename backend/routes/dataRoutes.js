const express = require("express");
const router = express.Router();
const Data = require("../models/Data.js");

router.get('/viewData', async (req, res) => {
  try {
    const data = await Data.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).send('Error fetching subjects');
  }
});

router.put('/updateStatus/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedItem = await Data.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send('Failed to update status');
  }
});

module.exports = router;