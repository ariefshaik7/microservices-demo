import { query } from './db';

export const seedProducts = async () => {
    try {
        // Clear existing products to ensure clean state
        await query('TRUNCATE TABLE products RESTART IDENTITY CASCADE');
        console.log('Products table truncated.');

        console.log('Seeding products...');
        const products = [
            { name: 'Classic White T-Shirt', description: 'A comfortable and stylish white t-shirt made from 100% cotton.', price: 19.99, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Running Sneakers', description: 'Lightweight and durable sneakers perfect for running and workouts.', price: 79.99, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Summer Dress', description: 'Floral print summer dress, perfect for warm days.', price: 39.99, image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Hoodie', description: 'Cozy grey hoodie for casual wear.', price: 34.99, image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Denim Jacket', description: 'Classic denim jacket that goes with everything.', price: 59.99, image_url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Leather Boots', description: 'High-quality leather boots for durability and style.', price: 120.00, image_url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Sunglasses', description: 'Stylish sunglasses to protect your eyes from the sun.', price: 15.99, image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Baseball Cap', description: 'Casual baseball cap for everyday wear.', price: 12.99, image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Backpack', description: 'Spacious backpack for travel or school.', price: 45.00, image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Wristwatch', description: 'Elegant wristwatch with a leather strap.', price: 89.99, image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Scarf', description: 'Warm and soft scarf for winter days.', price: 25.00, image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Gloves', description: 'Leather gloves to keep your hands warm.', price: 30.00, image_url: 'https://images.unsplash.com/photo-1517260739337-6799d239ce83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Belt', description: 'Genuine leather belt.', price: 22.99, image_url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Socks', description: 'Pack of 3 comfortable cotton socks.', price: 9.99, image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Beanie', description: 'Knitted beanie for cold weather.', price: 14.99, image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Shorts', description: 'Casual shorts for summer activities.', price: 29.99, image_url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Polo Shirt', description: 'Classic polo shirt in various colors.', price: 35.00, image_url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Blazer', description: 'Smart blazer for formal occasions.', price: 99.99, image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Skirt', description: 'Stylish skirt for a chic look.', price: 32.00, image_url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Sandals', description: 'Comfortable sandals for beach days.', price: 24.99, image_url: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'Wallet', description: 'Leather wallet with multiple card slots.', price: 35.00, image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
        ];

        for (const product of products) {
            await query(
                'INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4)',
                [product.name, product.description, product.price, product.image_url]
            );
        }
        console.log('Products seeded successfully');
    } catch (err) {
        console.error('Error seeding products:', err);
    }
};
