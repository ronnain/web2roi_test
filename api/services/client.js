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
    const value = totalCA[0].total;
    const previousValue = value * (1 + Math.random() * 0.4 - 0.2);
    return {
      name: 'Chiffre d\'affaires total',
      value,
      previousValue,
      variation: (value - previousValue) / previousValue * 100,
      symbol: '€',
    }
  },
  getClientTotalSales: async (clientId) => {
    const totalSales = await db('SELECT COUNT(*) as total FROM sales WHERE clientId = ?', [clientId]);
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
  getClientSalesByMonth: async (clientId) => {
    const salesByMonth = await db('SELECT MONTH(date) as month, SUM(amount) as total FROM sales WHERE clientId = ? GROUP BY MONTH(date)', [clientId]);
    const xaxis = [];
    const yaxis = [];
    for (const sale of salesByMonth) {
      xaxis.push(new Date(0, sale.month - 1).toLocaleString('fr-FR', { month: 'long' }).charAt(0).toUpperCase() + new Date(0, sale.month - 1).toLocaleString('fr-FR', { month: 'long' }).slice(1));
      yaxis.push(sale.total);
    }
    return {
      xaxis,
      yaxis,
    }
  }
};
