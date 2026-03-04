import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// --- helpers ---
const dataPath = (file) => join(__dirname, file);

function readJSON(file) {
    return JSON.parse(readFileSync(dataPath(file), 'utf-8'));
}

function writeJSON(file, data) {
    writeFileSync(dataPath(file), JSON.stringify(data, null, 2));
}

// --- Products ---
app.get('/api/products', (req, res) => {
    let products = readJSON('products.json');
    const search = (req.query.search || '').toLowerCase();
    if (search) {
        products = products.filter(
            (p) =>
                p.name.toLowerCase().includes(search) ||
                (p.keywords && p.keywords.some((k) => k.toLowerCase().includes(search)))
        );
    }
    res.json(products);
});

// --- Cart ---
app.get('/api/cart', (_req, res) => {
    res.json(readJSON('cart.json'));
});

app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const cart = readJSON('cart.json');
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ productId, quantity, deliveryOptionId: '1' });
    }
    writeJSON('cart.json', cart);
    res.json(cart);
});

app.put('/api/cart/:productId', (req, res) => {
    const cart = readJSON('cart.json');
    const item = cart.find((i) => i.productId === req.params.productId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (req.body.quantity !== undefined) item.quantity = req.body.quantity;
    if (req.body.deliveryOptionId !== undefined) item.deliveryOptionId = req.body.deliveryOptionId;
    writeJSON('cart.json', cart);
    res.json(cart);
});

app.delete('/api/cart/:productId', (req, res) => {
    let cart = readJSON('cart.json');
    cart = cart.filter((i) => i.productId !== req.params.productId);
    writeJSON('cart.json', cart);
    res.json(cart);
});

// --- Delivery Options ---
app.get('/api/delivery-options', (_req, res) => {
    res.json(readJSON('deliveryOptions.json'));
});

// --- Orders ---
app.get('/api/orders', (_req, res) => {
    res.json(readJSON('orders.json'));
});

app.post('/api/orders', (_req, res) => {
    const cart = readJSON('cart.json');
    const deliveryOptions = readJSON('deliveryOptions.json');

    if (cart.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const products = readJSON('products.json');
    const now = Date.now();

    let totalCostCents = 0;
    const orderProducts = cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        const option = deliveryOptions.find((o) => o.id === item.deliveryOptionId) || deliveryOptions[0];
        const itemCost = (product ? product.priceCents : 0) * item.quantity + option.priceCents;
        totalCostCents += itemCost;
        return {
            productId: item.productId,
            quantity: item.quantity,
            estimatedDeliveryTimeMs: now + option.deliveryDays * 24 * 60 * 60 * 1000,
        };
    });

    const tax = Math.round(totalCostCents * 0.1);
    totalCostCents += tax;

    const order = {
        id: crypto.randomUUID(),
        orderTimeMs: now,
        totalCostCents,
        products: orderProducts,
    };

    const orders = readJSON('orders.json');
    orders.unshift(order);
    writeJSON('orders.json', orders);

    // Clear cart
    writeJSON('cart.json', []);

    res.json(order);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
