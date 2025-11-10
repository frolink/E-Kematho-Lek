import axios from 'axios';
const BACKEND_URL = 'http://127.0.0.1:5000';

async function payViaQris(amount, metadata) {
  const res = await axios.post(`${BACKEND_URL}/qris/pay`, { amount, metadata });
  window.open(res.data.qris_url, "_blank");
}

export { payViaQris };
