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
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
            console.log('Database initialized successfully');
            return;
        } catch (err) {
            console.error(`Error initializing database (retries left: ${retries}):`, err);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    throw new Error('Could not initialize database after multiple retries');
};
