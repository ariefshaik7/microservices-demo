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
    res.send('cart-service is running');
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'cart-service' });
});

// Mount router on root and on /api/cart to handle both direct and proxied requests
app.use('/', router);
app.use('/api/cart', router);

app.listen(port, () => {
    console.log(`cart-service running on port ${port}`);
});
