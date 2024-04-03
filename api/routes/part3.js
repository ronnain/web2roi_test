import express from 'express';
import part3Service from '../services/part3.js';

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).send(await part3Service.hello());
});

export default router;
