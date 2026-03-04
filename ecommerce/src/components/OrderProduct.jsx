import { Link } from 'react-router';
import { useCart } from '../cartContext';
import './OrderProduct.css';

export function OrderProduct({ productId, image, name, deliveryDate, quantity }) {
    const { addToCart } = useCart();

    const handleBuyAgain = async () => {
        await addToCart(productId, 1);
    };

    const trackingParams = new URLSearchParams({
        name: name || '',
        image: image || '',
        quantity: quantity || 1,
        deliveryDate: deliveryDate || '',
    });

    return (
        <>
            <div className="product-image-container">
                <img src={image} />
            </div>

            <div className="product-details">
                <div className="product-name">
                    {name}
                </div>
                <div className="product-delivery-date">
                    Arriving on: {deliveryDate}
                </div>
                <div className="product-quantity">
                    Quantity: {quantity}
                </div>
                <button className="buy-again-button button-primary" onClick={handleBuyAgain}>
                    <img className="buy-again-icon" src="images/icons/buy-again.png" />
                    <span className="buy-again-message">Add to Cart</span>
                </button>
            </div>

            <div className="product-actions">
                <Link to={`/tracking?${trackingParams.toString()}`}>
                    <button className="track-package-button button-secondary">
                        Track package
                    </button>
                </Link>
            </div>
        </>
    );
}
