import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/api';

import { HomePage } from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackOrderPage } from './pages/orders/TrackOrderPage';

import './App.css';

// Minimal shape for a cart item coming from your API.
type CartItem = {
  id: number | string;
  quantity: number;
  product?: unknown;
  [key: string]: unknown;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const response = await api.get<CartItem[]>('/api/cart-items', {
      params: { expand: 'product' }
    });
    setCart(response.data);
  };

  useEffect(() => {
    // Debug logs (safe to remove later)
    console.log('API Base URL:', import.meta.env.VITE_API_URL);
    console.log('BASE_URL:', import.meta.env.BASE_URL);

    loadCart();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;


/*import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/api';

import { HomePage } from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';


import './App.css';

// Minimal shape for a cart item coming from your API.
type CartItem = {
  id: number | string;
  quantity: number;
  product?: unknown;
  [key: string]: unknown;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const response = await api.get<CartItem[]>('/api/cart-items?expand=product');
    setCart(response.data);
  };

  useEffect(() => {
    // Debug logs (safe to remove later)
    console.log('API Base URL:', import.meta.env.VITE_API_BASE);
    console.log('BASE_URL:', import.meta.env.BASE_URL);

    loadCart();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      {/* Fallback for unknown routes *//*}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;*/
