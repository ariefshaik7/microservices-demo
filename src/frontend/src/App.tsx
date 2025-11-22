import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';

import { CurrencyProvider } from './context/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="product/:id" element={<ProductDetailsPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="*" element={<div className="text-center py-12">Page not found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
