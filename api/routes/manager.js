import express from 'express';
import { getManagersStats } from '../services/manager.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const filteredName = req.query?.name ?? '';
        const managersStats = await getManagersStats(filteredName);

        res.json({
            status: 'success',
            content: {
                managersStats
            },
        });
    } catch (error) {
        console.error('error', error);
    }
});


export default router;
