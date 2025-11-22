import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
    const { items, removeFromCart, cartTotal, clearCart } = useCart();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '20px' }}>Shopping Cart</h1>

            <div className="cart-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item" style={{ display: 'flex', borderBottom: '1px solid #eee', padding: '20px 0' }}>
                            <div className="cart-item-image" style={{ width: '100px', height: '100px', marginRight: '20px' }}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div className="cart-item-details" style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{item.name}</h3>
                                <p style={{ color: '#666', marginBottom: '10px' }}>Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ color: '#d93025', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="cart-item-price" style={{ fontWeight: 'bold' }}>
                                {formatPrice(item.price * item.quantity)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Order Summary</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '10px' }}
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout
                    </button>
                    <button
                        className="btn"
                        style={{ width: '100%', background: 'white', border: '1px solid #ddd' }}
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
