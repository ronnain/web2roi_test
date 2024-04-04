import express from 'express';
import cors from 'cors';
import part1Router from './routes/part1.js';
import part2Router from './routes/part2.js';
import part3Router from './routes/part3.js';

const app = express();
const port = 3000;

app.use('/part1', part1Router);
app.use('/part2', part2Router);
app.use('/part3', part3Router);

app.use(cors());

app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
});
