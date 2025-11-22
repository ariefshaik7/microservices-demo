import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Order Service is running');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'order-service' });
});

app.post('/orders', (req, res) => {
    const { userId, items, total, status } = req.body;
    console.log(`Creating order for user ${userId} with total ${total}`);

    // Mock order creation
    const orderId = Math.floor(Math.random() * 10000);
    res.json({ id: orderId, status: 'created', total });
});

app.listen(port, () => {
    console.log(`Order Service running on port ${port}`);
});
