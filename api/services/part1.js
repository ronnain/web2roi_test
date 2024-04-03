import { db } from '../config/database.js';

export default {
    hello: async () => {
        const queryExample = await db('SELECT * FROM clients');
        return {
            message: 'Hello World'
        };
    }
};
