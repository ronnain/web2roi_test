import express from 'express';
import cors from 'cors';
import dashboard from './routes/dashboard.js';

const app = express();
const port = 3000;

app.use('/dashboard', dashboard);

const corsOptions = {
  origin: ['*'],
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
});
