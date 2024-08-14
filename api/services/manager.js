import { db } from '../config/database.js';

export const getManagersStats = async (filteredName) => {
    const managers = await getManagerEmployees(filteredName);
    const result = await Promise.all(managers.map(async (manager) => {
        const [lastSales, ca, totalSales] = await Promise.all([
            getManagerLastSales(manager.id),
            getManagerCA(manager.id),
            getManagerTotalSales(manager.id)
        ]);
        return {
            manager,
            lastSales,
            ca,
            totalSales
        }
    }));
    return result;
}

export const getManagerEmployees = async (filteredName) => {
    return db('SELECT * FROM `employees` WHERE roleId = 1 AND (lastName LIKE ? OR firstName LIKE ?)', [`%${filteredName}%`, `%${filteredName}%`]);
}

export const getManagerLastSales = async (managerId) => {
    const sales = await db('SELECT s.* FROM `employees_clients` as ec LEFT JOIN `sales` as s ON s.clientId = ec.clientId WHERE ec.employeeId = ? ORDER BY date DESC LIMIT 10', [managerId]);
    for (const sale of sales) {
      sale.roi = sale.amount * 0.13;
    }
    return sales;
  }
export const getManagerCA = async (managerId) => {
    const totalCA = await db('SELECT SUM(s.amount) as total FROM `employees_clients` as ec LEFT JOIN `sales` as s ON s.clientId = ec.clientId WHERE ec.employeeId = ?', [managerId]);
    const value = totalCA[0].total;
    const previousValue = value * (1 + Math.random() * 0.4 - 0.2);
    return {
      name: 'Chiffre d\'affaires total',
      value,
      previousValue,
      variation: (value - previousValue) / previousValue * 100,
      symbol: '€',
    }
  }
  export const  getManagerTotalSales = async (managerId) => {
    const totalSales = await db('SELECT COUNT(*) as total FROM `employees_clients` as ec LEFT JOIN `sales` as s ON s.clientId = ec.clientId WHERE ec.employeeId = ?', [managerId]);
    const value = totalSales[0].total;
    const previousValue = value * (1 + Math.random() * 0.4 - 0.2);
    return {
      name: 'Nombre de ventes total',
      value,
      previousValue,
      variation: (value - previousValue) / previousValue * 100,
      symbol: '',
    }
  }
