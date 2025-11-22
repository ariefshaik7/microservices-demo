import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const { items: cart, clearCart } = useCart();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/checkout/place_order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart,
                    shippingAddress: {
                        name: formData.name,
                        address: formData.address,
                        city: formData.city,
                        zip: formData.zip,
                        country: formData.country
                    },
                    paymentInfo: {
                        cardNumber: formData.cardNumber,
                        expiryDate: formData.expiryDate,
                        cvv: formData.cvv
                    },
                    email: formData.email
                })
            });

            if (!response.ok) {
                throw new Error('Checkout failed');
            }

            clearCart();
            alert('Order placed successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
                <h2>Your cart is empty</h2>
                <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h1 style={{ marginBottom: '30px' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ marginBottom: '20px' }}>Shipping Information</h3>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-input"
                                required
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-input"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">ZIP Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    className="form-input"
                                    required
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    className="form-input"
                                    required
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <h3 style={{ margin: '30px 0 20px' }}>Payment Details</h3>
                        <div className="form-group">
                            <label className="form-label">Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                className="form-input"
                                required
                                placeholder="0000 0000 0000 0000"
                                value={formData.cardNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label className="form-label">Expiry Date</label>
                                <input
                                    type="text"
                                    name="expiryDate"
                                    className="form-input"
                                    required
                                    placeholder="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">CVV</label>
                                <input
                                    type="text"
                                    name="cvv"
                                    className="form-input"
                                    required
                                    placeholder="123"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {error && <div className="error-message" style={{ marginTop: '20px' }}>{error}</div>}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '30px', padding: '15px', fontSize: '1.1rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
                        </button>
                    </form>
                </div>

                <div>
                    <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                        {cart.map((item) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px solid #ddd', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
