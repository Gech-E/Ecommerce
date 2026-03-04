import { Routes, Route } from "react-router";
import { CartProvider } from './cartContext';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/ordersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css'

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
            </Routes>
        </CartProvider>
    )
}
export default App
