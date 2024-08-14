import express from 'express';
import dashboard from '../services/dashboard.js';
import { generateSales } from "../config/database.js";

const router = express.Router();

router.get('/', async (req, res) => {
    // TODO run in parallel the methods with Promise.all or forkjoin with RxJs
    const sales = await dashboard.getLastSales();
    const lastClients = await dashboard.getLastClients();
    const totalCA = await dashboard.getCompanyTotalCA();
    const totalSales = await dashboard.getCompanyTotalSales();
    const totalClients = await dashboard.getCompanyTotalClients();
    res.json({
        status: 'success',
        content: {
            sales,
            lastClients,
            totalCA,
            totalSales,
            totalClients,
        },
    });
});

// only for testing purpose
router.post('/generate-sales', async (req, res) => {
    await generateSales();
    res.json({
        status: 'success',
        content: 'Sales generated',
    });
});

export default router;
