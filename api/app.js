import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(nn);
});

app.listen(port, () => {
    console.log(`Api listening on port ${port}`);
});
