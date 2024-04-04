import express from 'express';
import dashboard from '../services/dashboard.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const sales = await dashboard.getLastSales();
    const lastClients = await dashboard.getLastClients();
    const totalCA = await dashboard.getCompanyTotalCA();
    res.json({
        status: 'success',
        content: {
            sales,
            lastClients,
            totalCA,
        },
    });
});

export default router;
