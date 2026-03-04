import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../cartContext';
import { CheckoutHeader } from '../components/CheckoutHeader';
import { CartItem } from '../components/CartItem';
import { PaymentSummary } from '../components/PaymentSummary';
import './CheckoutPage.css';

export function CheckoutPage() {
    const { cart, removeFromCart, updateCartItem, placeOrder } = useCart();
    const [products, setProducts] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [now] = useState(() => Date.now());
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/products').then((r) => r.json()).then(setProducts);
        fetch('/api/delivery-options').then((r) => r.json()).then(setDeliveryOptions);
    }, []);

    // Build display items by joining cart with products & delivery options
    const cartItems = useMemo(() => {
        return cart.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.productId);
            if (!product) return null;

            const selectedOption = deliveryOptions.find((o) => o.id === cartItem.deliveryOptionId) || deliveryOptions[0];

            const deliveryDate = selectedOption
                ? new Date(now + selectedOption.deliveryDays * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                : '';

            const optionsWithText = deliveryOptions.map((opt) => ({
                id: opt.id,
                dateText: new Date(now + opt.deliveryDays * 86400000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                priceText: opt.priceCents === 0 ? 'FREE Shipping' : `$${(opt.priceCents / 100).toFixed(2)} - Shipping`,
            }));

            return {
                productId: cartItem.productId,
                productName: product.name,
                productPrice: `$${(product.priceCents / 100).toFixed(2)}`,
                productImage: product.image,
                quantity: cartItem.quantity,
                deliveryDate,
                deliveryOptions: optionsWithText,
                selectedDeliveryOptionId: cartItem.deliveryOptionId,
            };
        }).filter(Boolean);
    }, [cart, products, deliveryOptions, now]);

    // Compute payment summary
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const itemsTotal = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.priceCents * item.quantity : 0);
    }, 0);
    const shippingTotal = cart.reduce((sum, item) => {
        const option = deliveryOptions.find((o) => o.id === item.deliveryOptionId) || deliveryOptions[0];
        return sum + (option ? option.priceCents : 0);
    }, 0);

    const handleDelete = async (productId) => {
        await removeFromCart(productId);
    };

    const handleDeliveryChange = async (productId, deliveryOptionId) => {
        await updateCartItem(productId, { deliveryOptionId });
    };

    const handlePlaceOrder = async () => {
        await placeOrder();
        navigate('/orders');
    };

    return (
        <>
            <title>Checkout</title>
            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cartItems.length === 0 && <div className="empty-cart-message">Your cart is empty.</div>}
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.productId}
                                {...item}
                                onDelete={handleDelete}
                                onDeliveryChange={handleDeliveryChange}
                            />
                        ))}
                    </div>

                    {cartItems.length > 0 && (
                        <PaymentSummary
                            itemCount={itemCount}
                            itemsTotal={itemsTotal}
                            shippingTotal={shippingTotal}
                            taxRate={0.10}
                            onPlaceOrder={handlePlaceOrder}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
