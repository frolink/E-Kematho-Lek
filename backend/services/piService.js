const axios = require('axios');
const { PI_API_BASE, PI_APP_SECRET } = process.env;
const axiosClient = axios.create({
  baseURL: PI_API_BASE,
  headers: { Authorization: `Bearer ${PI_APP_SECRET}` }
});

async function verifyUser(accessToken) {
  const me = await axiosClient.get(`/v2/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
  return me.data;
}

module.exports = { verifyUser };
