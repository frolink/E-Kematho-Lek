import axios from 'axios';
const BACKEND_URL = 'http://127.0.0.1:5000';

const orderProduct = async (memo, amount, metadata, user) => {
  if (!user) return alert('Login dulu!');

  const paymentData = { amount, memo, metadata };
  const callbacks = {
    onReadyForServerApproval: (paymentId) => axios.post(`${BACKEND_URL}/approve`, { paymentId }),
    onReadyForServerCompletion: (paymentId, txid) => axios.post(`${BACKEND_URL}/complete`, { paymentId, txid }),
    onCancel: (paymentId) => console.log('Cancelled', paymentId),
    onError: (err, payment) => console.error(err, payment)
  };

  const payment = await window.Pi.createPayment(paymentData, callbacks);
  console.log('Payment created', payment);
};

const signIn = async (setUser) => {
  const scopes = ["username","payments"];
  const authResponse = await window.Pi.authenticate(scopes, (payment) => {
    axios.post(`${BACKEND_URL}/complete`, { paymentId: payment.identifier, txid: payment.transaction?.txid });
  });
  await axios.post(`${BACKEND_URL}/signin`, { authResult: authResponse });
  setUser(authResponse.user);
};

export { orderProduct, signIn };
