import { db } from '../config/database.js';

export default {
    hello: async () => {
        const queryExample = await db('SELECT * FROM clients');
        return {
            message: 'Hello World'
        };
    },
    getLastSales: async () => {
        const queryExample = await db('SELECT * FROM sales ORDER BY sale_date DESC LIMIT 10');
        return queryExample;
    }
};
