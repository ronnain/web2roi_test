import express from 'express';
import part1Service from '../services/part1.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const sales = await part1Service.getLastSales();
    res.json({
        status: 'success',
        content: sales
    });
});

export default router;
