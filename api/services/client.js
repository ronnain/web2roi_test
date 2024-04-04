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
  },
  getClientCA: async (clientId) => {
    const totalCA = await db('SELECT SUM(amount) as total FROM sales WHERE clientId = ?', [clientId]);
    return {
      name: 'Chiffre d\'affaires total',
      value: totalCA[0].total,
      previousValue: totalCA[0].total,
      variation: 0,
      symbol: '€',
    }
  },
  getClientTotalSales: async (clientId) => {
    const totalSales = await db('SELECT COUNT(*) as total FROM sales WHERE clientId = ?', [clientId]);
    return {
      name: 'Nombre de ventes total',
      value: totalSales[0].total,
      previousValue: totalSales[0].total,
      variation: 0,
      symbol: '',
    }
  }
};
