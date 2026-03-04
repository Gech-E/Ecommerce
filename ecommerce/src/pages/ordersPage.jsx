import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { OrderCard } from '../components/OrderCard';
import './ordersPage.css';

export function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/orders').then((r) => r.json()).then(setOrders);
        fetch('/api/products').then((r) => r.json()).then(setProducts);
    }, []);

    const formatDate = (ms) =>
        new Date(ms).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const buildOrderDisplay = (order) => {
        const orderProducts = order.products.map((op) => {
            const product = products.find((p) => p.id === op.productId);
            return {
                productId: op.productId,
                image: product ? product.image : '',
                name: product ? product.name : 'Unknown Product',
                deliveryDate: formatDate(op.estimatedDeliveryTimeMs),
                quantity: op.quantity,
            };
        });

        return {
            orderId: order.id,
            orderDate: formatDate(order.orderTimeMs),
            orderTotal: `$${(order.totalCostCents / 100).toFixed(2)}`,
            products: orderProducts,
        };
    };

    // Filter orders by product name
    const filteredOrders = orders
        .map(buildOrderDisplay)
        .filter((order) => {
            if (!searchTerm.trim()) return true;
            const term = searchTerm.toLowerCase();
            return order.products.some((p) => p.name.toLowerCase().includes(term));
        });

    return (
        <>
            <title>Orders</title>
            <Header />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-search">
                    <input
                        type="text"
                        className="orders-search-bar"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="orders-grid">
                    {filteredOrders.length === 0 && <div>No orders found.</div>}
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.orderId} {...order} />
                    ))}
                </div>
            </div>
        </>
    );
}