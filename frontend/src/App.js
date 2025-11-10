import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [qrisUrl, setQrisUrl] = useState('');

  const createQris = async () => {
    const res = await fetch('/api/qris/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    const data = await res.json();
    setQrisUrl(data.qrisUrl);
  };

  return (
    <div>
      <h1>E-Kematho-Lek QRIS Demo</h1>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Jumlah" />
      <button onClick={createQris}>Buat QRIS</button>
      {qrisUrl && <img src={qrisUrl} alt="QRIS" />}
    </div>
  );
}

export default App;
