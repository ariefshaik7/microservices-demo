import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => {
    res.send('payment-service is running');
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'payment-service' });
});

// Mount router on root and on /api/payment to handle both direct and proxied requests
app.use('/', router);
app.use('/api/payment', router);

router.post('/charge', (req, res) => {
    const { amount, currency, paymentInfo } = req.body;
    console.log(`Processing payment of ${amount} ${currency} for card ending in ${paymentInfo.cardNumber.slice(-4)}`);

    // Mock success
    res.json({ success: true, transactionId: 'tx_' + Math.random().toString(36).substr(2, 9) });
});

app.listen(port, () => {
    console.log(`payment-service running on port ${port}`);
});
