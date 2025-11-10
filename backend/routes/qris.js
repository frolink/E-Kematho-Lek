const express = require('express');
const router = express.Router();
const { generateQris } = require('../services/qrisService');

router.post('/create', async (req, res) => {
  try {
    const { amount } = req.body;
    const qrisUrl = await generateQris(amount);
    return res.json({ qrisUrl });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
