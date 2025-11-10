import { useState } from 'react';
import axios from 'axios';

const axiosClient = axios.create({ baseURL: '/api' });

export default function Shop() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [qrisUrl, setQrisUrl] = useState('');

  const onIncompletePaymentFound = async (payment) => {
    await axiosClient.post('/auth/incomplete', { payment });
  };

  const signIn = async () => {
    const scopes = ["username","payments"];
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    const res = await axiosClient.post('/auth/signin', { authResult });
    setUser(res.data.user);
  };

  const createQris = async () => {
    const res = await axiosClient.post('/qris/create', { amount });
    setQrisUrl(res.data.qrisUrl);
  };

  return (
    <div>
      <h1>E-Kematho-Lek</h1>
      {!user && <button onClick={signIn}>Login with Pi</button>}
      {user && (
        <>
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Jumlah" />
          <button onClick={createQris}>Buat QRIS</button>
          {qrisUrl && <img src={qrisUrl} alt="QRIS" />}
        </>
      )}
    </div>
  );
}
