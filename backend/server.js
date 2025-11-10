require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const { PI_APP_ID, PI_APP_SECRET, PI_API_BASE, PORT } = process.env;
const axiosClient = axios.create({
  baseURL: PI_API_BASE,
  headers: { Authorization: `Bearer ${PI_APP_SECRET}` }
});

app.post('/signin', async (req, res) => {
  try {
    const authResult = req.body.authResult;
    const me = await axiosClient.get(`/v2/me`, { headers: { Authorization: `Bearer ${authResult.user.accessToken}` } });
    res.status(200).json({ user: me.data });
  } catch (err) {
    res.status(401).json({ error: 'User not authorized' });
  }
});

app.post('/approve', async (req, res) => {
  const { paymentId } = req.body;
  await axiosClient.post(`/v2/payments/${paymentId}/approve`);
  res.status(200).json({ message: `Approved ${paymentId}` });
});

app.post('/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  await axiosClient.post(`/v2/payments/${paymentId}/complete`, { txid });
  res.status(200).json({ message: `Completed ${paymentId}` });
});

app.listen(PORT || 5000, () => console.log(`Server running on port ${PORT}`));
