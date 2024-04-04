import express from 'express';
import cors from 'cors';
import dashboard from './routes/dashboard.js';

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'OPTIONS',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOptions));

app.use('/dashboard', dashboard);

app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
});
