import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const initDb = async () => {
    let retries = 10;
    while (retries > 0) {
        try {
            await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
            console.log('User database initialized successfully');
            return;
        } catch (err) {
            console.error(`Error initializing user database (retries left: ${retries}):`, err);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    throw new Error('Could not initialize user database after multiple retries');
};
