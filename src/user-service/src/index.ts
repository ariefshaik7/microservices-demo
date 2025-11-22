import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initDb, query } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

// Initialize DB
initDb();

app.get('/', (req, res) => {
    res.send('User Service is running');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'user-service' });
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user exists
        const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Create user
        const result = await query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, password] // In a real app, hash the password!
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find user
        const result = await query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user || user.password !== password) { // In a real app, compare hashed password!
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
});
