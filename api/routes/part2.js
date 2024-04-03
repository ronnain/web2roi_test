import express from 'express';
import part2Service from '../services/part2.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).send(await part2Service.hello());
});

export default router;
