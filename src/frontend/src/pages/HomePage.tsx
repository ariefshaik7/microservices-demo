import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearchQuery(params.get('search') || '');

        fetch('/api/products')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className="loading-message">Loading products...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Hot Products</h1>
                <p style={{ color: '#666' }}>Summer Collection 2025</p>
            </div>

            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="product-image-container">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                                ) : (
                                    <div className="no-image">No Image</div>
                                )}
                            </div>
                        </Link>
                        <div className="product-info">
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3 className="product-name">{product.name}</h3>
                            </Link>
                            <span className="product-price">{formatPrice(product.price)}</span>
                            <button
                                className="btn btn-primary"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
