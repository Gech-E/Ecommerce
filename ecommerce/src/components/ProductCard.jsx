import { useState } from 'react';
import { useCart } from '../cartContext';
import './ProductCard.css';

export function ProductCard({ productId, image, name, rating, priceCents }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [showAdded, setShowAdded] = useState(false);

    const priceFormatted = `$${(priceCents / 100).toFixed(2)}`;
    const ratingStarsImage = `images/ratings/rating-${rating.stars * 10}.png`;

    const handleAddToCart = async () => {
        await addToCart(productId, quantity);
        setShowAdded(true);
        setTimeout(() => setShowAdded(false), 2000);
    };

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image" src={image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars" src={ratingStarsImage} />
                <div className="product-rating-count link-primary">
                    {rating.count}
                </div>
            </div>

            <div className="product-price">
                {priceFormatted}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: showAdded ? 1 : 0, transition: 'opacity 0.4s' }}>
                <img src="images/icons/checkmark.png" />
                Added
            </div>

            <button className="add-to-cart-button button-primary" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
}
