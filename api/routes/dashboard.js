import express from 'express';
import dashboard from '../services/dashboard.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const sales = await dashboard.getLastSales();
    res.json({
        status: 'success',
        content: sales
    });
});

export default router;
