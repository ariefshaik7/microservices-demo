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
    res.send('email-service is running');
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'email-service' });
});

// Mount router on root and on /api/email to handle both direct and proxied requests
app.use('/', router);
app.use('/api/email', router);

router.post('/send', (req, res) => {
    const { email, subject, message } = req.body;
    console.log(`Sending email to ${email}: ${subject}`);

    // Mock success
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`email-service running on port ${port}`);
});
