E-Kematho-Pay (demo)
Frontend: React + Pi SDK (sandbox-ready)
Backend: Express API (verify token)

Run backend:
  cd backend
  yarn install
  node index.js

Run frontend (dev):
  cd frontend
  yarn install
  # run on port 3314 for Pi Sandbox:
  PORT=3314 NODE_OPTIONS=--openssl-legacy-provider yarn start
