import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function ProductDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // In a real app, we would fetch a single product by ID.
        // Since our API only has /api/products, we'll fetch all and filter.
        // Optimization: Add /api/products/:id endpoint to backend later.
        fetch('/api/products')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then((data: Product[]) => {
                const found = data.find((p) => p.id === parseInt(id || '0'));
                if (found) {
                    setProduct(found);
                } else {
                    setError('Product not found');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load product.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading-message">Loading...</div>;
    if (error || !product) return <div className="error-message">{error || 'Product not found'}</div>;

    return (
        <div className="product-details-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginTop: '30px' }}>
            <div className="product-image-wrapper" style={{ background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', borderRadius: '8px' }}>
                <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
            </div>
            <div className="product-info-details">
                <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{product.name}</h1>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#5f6368', marginBottom: '30px' }}>
                    {formatPrice(product.price)}
                </p>
                <div style={{ marginBottom: '30px', lineHeight: '1.6' }}>
                    <p>{product.description}</p>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ fontSize: '1.1rem', padding: '15px 40px' }}
                    onClick={() => {
                        addToCart(product);
                        navigate('/cart');
                    }}
                >
                    Add to Cart
                </button>

                <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Product Specifications</h3>
                    <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                        <li style={{ marginBottom: '8px' }}><strong>Material:</strong> Premium Blend</li>
                        <li style={{ marginBottom: '8px' }}><strong>Fit:</strong> Regular</li>
                        <li style={{ marginBottom: '8px' }}><strong>Care:</strong> Machine Washable</li>
                        <li style={{ marginBottom: '8px' }}><strong>Origin:</strong> Imported</li>
                    </ul>
                </div>

                <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Customer Reviews</h3>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ color: '#f1c40f', marginRight: '10px' }}>★★★★★</span>
                            <strong>John Doe</strong>
                        </div>
                        <p style={{ color: '#666', margin: 0 }}>Great quality and fits perfectly!</p>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ color: '#f1c40f', marginRight: '10px' }}>★★★★☆</span>
                            <strong>Jane Smith</strong>
                        </div>
                        <p style={{ color: '#666', margin: 0 }}>Love the style, shipping was fast.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
