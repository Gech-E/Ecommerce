import './CartItem.css';

export function CartItem({
    productId,
    productName,
    productPrice,
    productImage,
    quantity,
    deliveryDate,
    deliveryOptions,
    selectedDeliveryOptionId,
    onDelete,
    onDeliveryChange,
}) {
    return (
        <div className="cart-item-container">
            <div className="delivery-date">
                Delivery date: {deliveryDate}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image" src={productImage} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {productName}
                    </div>
                    <div className="product-price">
                        {productPrice}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity: <span className="quantity-label">{quantity}</span>
                        </span>
                        <span
                            className="delete-quantity-link link-primary"
                            onClick={() => onDelete(productId)}
                            style={{ cursor: 'pointer' }}
                        >
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    {deliveryOptions.map((option) => (
                        <div className="delivery-option" key={option.id}>
                            <input
                                type="radio"
                                className="delivery-option-input"
                                name={`delivery-option-${productId}`}
                                checked={option.id === selectedDeliveryOptionId}
                                onChange={() => onDeliveryChange(productId, option.id)}
                            />
                            <div>
                                <div className="delivery-option-date">
                                    {option.dateText}
                                </div>
                                <div className="delivery-option-price">
                                    {option.priceText}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
