import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { ProgressBar } from '../components/ProgressBar';
import './trackingPage.css';

export function TrackingPage() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') || 'Unknown Product';
    const image = searchParams.get('image') || '';
    const quantity = searchParams.get('quantity') || 1;
    const deliveryDate = searchParams.get('deliveryDate') || 'N/A';

    // Capture current time once in state to avoid impure Date.now() in render
    const [now] = useState(() => Date.now());

    const deliveryMs = new Date(deliveryDate).getTime();
    let currentStatus = 'Preparing';
    let progressPercent = 0;
    if (!isNaN(deliveryMs)) {
        if (now >= deliveryMs) {
            currentStatus = 'Delivered';
            progressPercent = 100;
        } else {
            currentStatus = 'Shipped';
            progressPercent = 50;
        }
    }

    return (
        <>
            <title>Tracking</title>
            <Header />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {deliveryDate}
                    </div>

                    <div className="product-info">
                        {name}
                    </div>

                    <div className="product-info">
                        Quantity: {quantity}
                    </div>

                    {image && (
                        <img
                            className="product-image"
                            src={image}
                        />
                    )}

                    <ProgressBar currentStatus={currentStatus} progressPercent={progressPercent} />
                </div>
            </div>
        </>
    );
}