import express from 'express';
import part1Service from '../services/part1.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).send(await part1Service.hello());
});

export default router;
