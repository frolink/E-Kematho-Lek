const fetch = require('node-fetch');

async function generateQris(amount) {
  const key = process.env.VALIDATION_KEY;
  const response = await fetch('https://api.devpi.network/qris', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount })
  });
  const data = await response.json();
  return data.qrisUrl;
}

module.exports = { generateQris };
