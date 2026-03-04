import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        fetch('/api/cart')
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
            });
    }, []);

    const addToCart = async (productId, quantity) => {
        const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        setCart(data);
    };

    const removeFromCart = async (productId) => {
        const res = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
        const data = await res.json();
        setCart(data);
    };

    const updateCartItem = async (productId, updates) => {
        const res = await fetch(`/api/cart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        const data = await res.json();
        setCart(data);
    };

    const placeOrder = async () => {
        const res = await fetch('/api/orders', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to place order');
        const order = await res.json();
        setCart([]);
        return order;
    };

    return (
        <CartContext.Provider
            value={{ cart, cartQuantity, addToCart, removeFromCart, updateCartItem, placeOrder }}
        >
            {children}
        </CartContext.Provider>
    );
}
