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
    res.send('shipping-service is running');
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'shipping-service' });
});

// Mount router on root and on /api/shipping to handle both direct and proxied requests
app.use('/', router);
app.use('/api/shipping', router);

router.post('/ship', (req, res) => {
    const { address, items } = req.body;
    console.log(`Creating shipping label for ${address.name} to ${address.city}`);

    // Mock success
    res.json({ success: true, trackingNumber: 'SH_' + Math.random().toString(36).substr(2, 9) });
});

app.listen(port, () => {
    console.log(`shipping-service running on port ${port}`);
});
