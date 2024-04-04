import express from 'express';
import dashboard from './routes/dashboard.js';

const app = express();
const port = 3000;

app.use('/dashboard', dashboard);

app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
});
