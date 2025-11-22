import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb, query } from './db';
import { seedProducts } from './seed';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize DB and Seed
initDb().then(() => {
    seedProducts();
});

app.get('/', (req, res) => {
    res.send('Product Service is running');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'product-service' });
});

app.get('/api/products', async (req, res) => {
    try {
        const result = await query('SELECT * FROM products ORDER BY id ASC');
        // Map snake_case to camelCase for frontend
        const products = result.rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: parseFloat(row.price), // pg returns decimals as strings
            imageUrl: row.image_url
        }));
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(port, () => {
    console.log(`Product Service running on port ${port}`);
});
