import express from 'express';
import client from '../services/client.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const clients = await client.getClients();
    res.json({
        status: 'success',
        content: {
            clients,
        },
    });
});

router.get('/:id', async (req, res) => {
    const clientId = req.params.id;
    const lastSales = await client.getLastSales(clientId);
    const totalCA = await client.getClientCA(clientId);
    const totalSales = await client.getClientTotalSales(clientId);
    const salesByMonth = await client.getClientSalesByMonth(clientId);
    res.json({
        status: 'success',
        content: {
            lastSales,
            totalCA,
            totalSales,
            salesByMonth,
        },
    });
});

export default router;
