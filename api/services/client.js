import { db } from '../config/database.js';

export default {
  getClients: async () => {
    return db('SELECT * FROM clients');
  },
  getLastSales: async (clientId) => {
    const sales = await db('SELECT * FROM sales WHERE clientId = ? ORDER BY date DESC LIMIT 10', [clientId]);
    for (const sale of sales) {
      sale.roi = sale.amount * 0.13;
    }
    return sales;
  }
};
