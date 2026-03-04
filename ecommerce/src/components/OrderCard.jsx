import { OrderProduct } from './OrderProduct';
import './OrderCard.css';

export function OrderCard({ orderId, orderDate, orderTotal, products }) {
    return (
        <div className="order-container">
            <div className="order-header">
                <div className="order-header-left-section">
                    <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{orderDate}</div>
                    </div>
                    <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{orderTotal}</div>
                    </div>
                </div>

                <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{orderId}</div>
                </div>
            </div>

            <div className="order-details-grid">
                {products.map((product, index) => (
                    <OrderProduct key={index} {...product} />
                ))}
            </div>
        </div>
    );
}
