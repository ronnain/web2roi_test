import mysql from 'mysql2/promise';
import dayjs from "dayjs";

const config = {
    host: 'localhost',
    user: 'test',
    password: 'test360&1',
    database: 'tech_interview'
};

const getConnection = async () => {
    let connection = null;
    if (!connection) {
        connection = await mysql.createConnection(config);
    }
    return connection;
};

export const db = async (...args) => {
    const connection = await getConnection();
    const [res] = await connection.query(...args);
    return res;
};

// Generate random sales for each client (only used for the demo)
export const generateSales = async () => {
    const connection = await getConnection();
    try {
        const clients = await db('SELECT * FROM clients');
        for (const client of clients) {
            for (let i = 0; i < 365; i++) {
                const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
                const amount = Math.floor(Math.random() * 4444) + 123;
                const quantity = Math.floor(Math.random() * 4) + 1;
                await connection.query('INSERT INTO sales (clientId, date, amount, quantity) VALUES (?, ?, ?, ?)', [client.id, date, amount, quantity]);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
