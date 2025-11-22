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
    res.send('checkout-service is running');
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'checkout-service' });
});

// Mount router on root and on /api/checkout to handle both direct and proxied requests
app.use('/', router);
app.use('/api/checkout', router);

router.post('/place_order', async (req, res) => {
    try {
        const { cart, shippingAddress, paymentInfo, email } = req.body;

        if (!cart || !shippingAddress || !paymentInfo || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 1. Calculate Total
        const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

        // 2. Process Payment
        const paymentResponse = await fetch(`${process.env.PAYMENT_SERVICE_URL}/charge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: total,
                currency: 'USD',
                paymentInfo
            })
        });

        if (!paymentResponse.ok) {
            throw new Error('Payment failed');
        }

        // 3. Create Shipping Label
        const shippingResponse = await fetch(`${process.env.SHIPPING_SERVICE_URL}/ship`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: shippingAddress,
                items: cart
            })
        });

        if (!shippingResponse.ok) {
            console.warn('Shipping label creation failed, proceeding anyway');
        }

        // 4. Create Order
        const orderResponse = await fetch(`${process.env.ORDER_SERVICE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1, // Mock user ID
                items: cart,
                total,
                status: 'confirmed'
            })
        });

        if (!orderResponse.ok) {
            throw new Error('Order creation failed');
        }

        const orderData = await orderResponse.json();

        // 5. Send Email
        await fetch(`${process.env.EMAIL_SERVICE_URL}/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                subject: 'Order Confirmation',
                message: `Your order #${orderData.id} has been placed successfully!`
            })
        });

        res.json({ success: true, orderId: orderData.id });

    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: 'Checkout failed' });
    }
});

app.listen(port, () => {
    console.log(`checkout-service running on port ${port}`);
});
