import { Link, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function MainLayout() {
    const { cartCount } = useCart();
    const { currency, setCurrency } = useCurrency();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header style={{ background: '#fff', padding: '15px 40px', borderBottom: '1px solid #e7e7e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ flexShrink: 0 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.png" alt="The Wardrobe Co." style={{ height: '40px', marginRight: '10px' }} />
                        The Wardrobe Co.
                    </Link>
                </div>

                <div style={{ flex: 1, margin: '0 40px', display: 'flex', justifyContent: 'flex-end' }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
                        window.location.href = `/?search=${encodeURIComponent(query)}`;
                    }} style={{ width: '100%', maxWidth: '600px' }}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search products..."
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                borderRadius: '25px',
                                border: '1px solid #e0e0e0',
                                background: '#f5f5f5',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.background = '#fff'}
                            onBlur={(e) => e.target.style.background = '#f5f5f5'}
                        />
                    </form>
                </div>

                <nav>
                    <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0, alignItems: 'center' }}>
                        <li>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as any)}
                                style={{
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ddd',
                                    background: '#f9f9f9',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                                <option value="CAD">CAD</option>
                                <option value="AUD">AUD</option>
                                <option value="INR">INR</option>
                            </select>
                        </li>
                        <li><Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 500 }}>Home</Link></li>
                        <li>
                            <Link to="/cart" style={{ textDecoration: 'none', color: '#333', position: 'relative', fontWeight: 500 }}>
                                Cart
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-12px',
                                        background: 'black',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        {user ? (
                            <li>
                                <Link to="/profile" style={{ textDecoration: 'none', color: '#333', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                                    <div style={{ width: '32px', height: '32px', background: '#333', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    Profile
                                </Link>
                            </li>
                        ) : (
                            <li><Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', borderRadius: '20px' }}>Login</Link></li>
                        )}
                    </ul>
                </nav>
            </header>

            <main style={{ flex: 1, padding: '20px 40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <Outlet />
            </main>

            <footer style={{ background: '#1a1a1a', color: '#fff', padding: '40px 20px', marginTop: 'auto', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>The Wardrobe Co.</h3>
                    <p style={{ color: '#999', lineHeight: '1.6', marginBottom: '20px' }}>
                        Premium clothing for the modern individual. Quality, style, and comfort in every stitch.
                    </p>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} The Wardrobe Co. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
