import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import './HomePage.css';

export function HomePage() {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => {
        const url = search ? `/api/products?search=${encodeURIComponent(search)}` : '/api/products';
        fetch(url)
            .then((res) => res.json())
            .then(setProducts);
    }, [search]);

    return (
        <>
            <title>Ecommerce Project</title>
            <Header />

            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            productId={product.id}
                            image={product.image}
                            name={product.name}
                            rating={product.rating}
                            priceCents={product.priceCents}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}