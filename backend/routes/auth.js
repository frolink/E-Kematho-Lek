const express = require('express');
const router = express.Router();
const { verifyUser } = require('../services/piService');

router.post('/signin', async (req, res) => {
  try {
    const { authResult } = req.body;
    const user = await verifyUser(authResult.accessToken);
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "User not authorized" });
  }
});

router.post('/incomplete', async (req, res) => {
  const { payment } = req.body;
  const paymentId = payment.identifier;
  const txid = payment.transaction && payment.transaction.txid;
  const txURL = payment.transaction && payment.transaction._link;

  // Contoh logika DB & validasi
  // const order = await db.findOrder(paymentId);
  // const horizonResponse = await axios.get(txURL);
  // if(horizonResponse.data.memo !== order.pi_payment_id) return res.status(400).json({ message: "Payment id mismatch" });
  // await db.markPaid(paymentId);
  // await axios.post(`${process.env.PI_API_BASE}/v2/payments/${paymentId}/complete`, { txid });

  return res.status(200).json({ message: `Handled incomplete payment ${paymentId}` });
});

module.exports = router;
