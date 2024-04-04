import { db } from '../config/database.js';

export default {
    getLastSales: async () => {
        return await db('SELECT * FROM sales ORDER BY date DESC LIMIT 10');
    },
    getLastClients: async () => {
        const lastClients = await db('SELECT * FROM clients ORDER BY createdAt DESC LIMIT 3');
        const clients = [];
        for (const client of lastClients) {
            const lastSale = await db('SELECT * FROM sales WHERE clientId = ? ORDER BY date DESC LIMIT 1', [client.id]);
            const totalCA = await db('SELECT SUM(amount) as total FROM sales WHERE clientId = ?', [client.id]);
            clients.push({
                ...client,
                lastSale: lastSale[0].amount,
                totalCA: totalCA[0].total,
            });
        }
        return clients;
    },
    getCompanyTotalCA: async () => {
        const totalCA = await db('SELECT SUM(amount) as total FROM sales');
        return totalCA[0].total;
    }
};
