import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
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
