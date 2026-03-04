# 🛒 Ecommerce Store

A full-stack ecommerce web application built with **React 19** and **Express.js**. Features a product catalog, shopping cart, order management, and package tracking — all with a responsive, interactive UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Product Catalog** | Browse 40+ products with images, ratings, prices, and quantity selectors |
| **Search** | Filter products by name or keyword in real-time |
| **Shopping Cart** | Add, update, and remove items with persistent state |
| **Delivery Options** | Choose from Free (7-day), Standard (3-day), or Express (1-day) shipping |
| **Dynamic Checkout** | Live payment summary with items, shipping, tax, and order total |
| **Order Placement** | Place orders that persist and appear on the orders page |
| **Order History** | View past orders with product details and search/filter |
| **Buy Again** | Re-add any previously ordered product to your cart |
| **Package Tracking** | Track delivery progress with a visual progress bar |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router 7, Vite 7
- **Backend:** Express.js 5, Node.js
- **State Management:** React Context API
- **Data Persistence:** JSON file-based storage
- **Dev Tools:** ESLint, Concurrently

---

## 📁 Project Structure

```
ecommerce/
├── backend/
│   ├── server.js              # Express REST API server
│   ├── products.json          # Product catalog data
│   ├── cart.json              # Shopping cart state
│   ├── orders.json            # Order history
│   └── deliveryOptions.json   # Shipping options
├── src/
│   ├── cartContext.jsx        # Global cart state (React Context)
│   ├── App.jsx                # Router + CartProvider wrapper
│   ├── main.jsx               # Entry point
│   ├── components/
│   │   ├── Header.jsx         # Nav bar with search + cart badge
│   │   ├── ProductCard.jsx    # Product display with Add to Cart
│   │   ├── CheckoutHeader.jsx # Checkout-specific header
│   │   ├── CartItem.jsx       # Cart item with delivery options
│   │   ├── PaymentSummary.jsx # Order total breakdown
│   │   ├── OrderCard.jsx      # Order container
│   │   ├── OrderProduct.jsx   # Product row in order history
│   │   └── ProgressBar.jsx    # Delivery tracking progress bar
│   └── pages/
│       ├── HomePage.jsx       # Product catalog grid
│       ├── CheckoutPage.jsx   # Cart review + payment
│       ├── ordersPage.jsx     # Order history
│       └── TrackingPage.jsx   # Package tracking
├── public/                    # Static assets (images)
├── package.json
└── vite.config.js             # Vite config with API proxy
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce

# Install dependencies
npm install
```

### Running the App

```bash
# Start both frontend and backend concurrently
npm run dev:full
```

This launches:
- **Frontend** → [http://localhost:5173](http://localhost:5173)
- **API Server** → [http://localhost:3000](http://localhost:3000)

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server only |
| `npm run server` | Start Express API only |
| `npm run dev:full` | Start both concurrently |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

## 📡 API Reference

All endpoints are prefixed with `/api`. In development, Vite proxies `/api` requests to the Express server.

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products?search=term` | Search products by name or keyword |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart` | Get current cart |
| `POST` | `/api/cart` | Add item `{ productId, quantity }` |
| `PUT` | `/api/cart/:productId` | Update `{ quantity }` or `{ deliveryOptionId }` |
| `DELETE` | `/api/cart/:productId` | Remove item |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | Get all orders |
| `POST` | `/api/orders` | Place order (cart → order, clears cart) |

### Delivery Options

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/delivery-options` | Get available shipping options |

---

## 🏗️ Architecture

```
┌─────────────┐       /api proxy        ┌──────────────┐
│   React UI  │  ──────────────────────► │  Express API │
│  (Vite Dev) │  ◄────────────────────── │  (port 3000) │
│  port 5173  │       JSON responses     │              │
└──────┬──────┘                          └──────┬───────┘
       │                                        │
       │ React Context                          │ fs read/write
       │ (CartProvider)                         │
       ▼                                        ▼
  Global State                           JSON Data Files
  cart, cartQuantity                     products, cart,
  addToCart, removeFromCart              orders, deliveryOptions
  updateCartItem, placeOrder
```

---

## 📄 License

This project is for educational purposes.
