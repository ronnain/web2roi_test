import { db } from '../config/database.js';

export default {
    getLastSales: async () => {
        const sales = await db('SELECT * FROM sales ORDER BY date DESC LIMIT 10');
        for (const sale of sales) {
            sale.roi = sale.amount * 0.13;
        }
        return sales;
    },
    getLastClients: async () => {
        const lastClients = await db('SELECT * FROM clients ORDER BY createdAt DESC LIMIT 3');
        const clients = [];
        for (const client of lastClients) {
            // todo on peut sans doute optimiser en regroupant ces 2 requêtes
            const lastSale = await db('SELECT * FROM sales WHERE clientId = ? ORDER BY date DESC LIMIT 1', [client.id]);
            const totalCA = await db('SELECT SUM(amount) as total FROM sales WHERE clientId = ?', [client.id]);
            clients.push({
                ...client,
                lastSale: lastSale[0].date,
                totalCA: totalCA[0].total,
            });
        }
        return clients;
    },
    getCompanyTotalCA: async () => {
        const totalCA = await db('SELECT SUM(amount) as total FROM sales');
        const value = totalCA[0].total;
        const previousValue = value * (1 + Math.random() * 0.4 - 0.2);
        return {
            name: 'Chiffre d\'affaires total',
            value,
            variation: (value - previousValue) / previousValue * 100,
            symbol: '€',
        }
    },
    getCompanyTotalSales: async () => {
        const totalSales = await db('SELECT COUNT(*) as total FROM sales');
        const value = totalSales[0].total;
        const previousValue = value * (1 + Math.random() * 0.4 - 0.2);
        return {
            name: 'Nombre de ventes total',
            value,
            previousValue,
            variation: (value - previousValue) / previousValue * 100,
            symbol: '',
        }
    },
    getCompanyTotalClients: async () => {
        const totalClients = await db('SELECT COUNT(*) as total FROM clients');
        const value = totalClients[0].total;
        const previousValue = value * (1 + Math.random() * 0.4 - 0.2);
        return {
            name: 'Nombre de clients total',
            value,
            previousValue,
            variation: (value - previousValue) / previousValue * 100,
            symbol: '',
        }
    },
};
