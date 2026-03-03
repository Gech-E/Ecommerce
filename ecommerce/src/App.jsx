import { Routes, Route } from "react-router";
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/ordersPage';
import { trackingPage } from './pages/trackingPage';
import './App.css'

function App() {
    return (


        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/tracking" element={<trackingPage />} />
        </Routes>


    )
}


