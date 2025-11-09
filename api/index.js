const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint verifikasi Pi SDK
app.post("/verify", (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token tidak ditemukan" });
  }

  // Simulasi verifikasi token (sesuaikan dengan Pi SDK nyata nanti)
  console.log("Token diterima:", accessToken);

  res.json({
    user: {
      uid: "123456789",
      username: "demo_user"
    },
    message: "Token berhasil diverifikasi (simulasi)"
  });
});

// Health check
app.get("/", (req, res) => {
  res.send("💜 E-Kematho-Pay API aktif dan berjalan!");
});

app.listen(PORT, () => {
  console.log(`💜 E-Kematho-Pay API aktif dan berjalan di port ${PORT}`);
});
