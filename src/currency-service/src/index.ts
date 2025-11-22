import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => {
    res.send('currency-service is running');
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'currency-service' });
});

router.post('/convert', async (req, res) => {
    try {
        const { from, to, amount } = req.body;

        if (!from || !to || !amount) {
            return res.status(400).json({ error: 'Missing required parameters: from, to, amount' });
        }

        const response = await axios.get(`https://open.er-api.com/v6/latest/${from}`);
        const rates = response.data.rates;

        if (!rates || !rates[to]) {
            return res.status(400).json({ error: `Invalid currency code or rate not found for: ${to}` });
        }

        const rate = rates[to];
        const convertedAmount = amount * rate;

        res.json({
            from,
            to,
            originalAmount: amount,
            convertedAmount,
            rate
        });
    } catch (error) {
        console.error('Currency conversion error:', error);
        res.status(500).json({ error: 'Failed to convert currency' });
    }
});

// Mount router on root and on /api/currency to handle both direct and proxied requests
app.use('/', router);
app.use('/api/currency', router);

app.listen(port, () => {
    console.log(`currency-service running on port ${port}`);
});
