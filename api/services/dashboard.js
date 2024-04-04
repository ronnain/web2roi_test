import { db } from '../config/database.js';

export default {
    getLastSales: async () => {
        return await db('SELECT * FROM sales ORDER BY date DESC LIMIT 10');
    }
};
