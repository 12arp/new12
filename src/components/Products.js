import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const API_URL = 'https://sahu-final.onrender.com';

export default function Products({ limit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      if (res.data && res.data.data) {
        setProducts(res.data.data);
        setError(null);
      } else {
        setError('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  const displayedProducts = limit ? products.slice(0, limit) : products;

  if (loading) {
    return (
      <div className="products-section">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-section">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="products-section">
  <p className="products-subheading">Products</p>
  <h2 className="products-heading">Our Products</h2>
  <div className="products-list">
    {displayedProducts.map(product => (
      <ProductItem key={product._id} product={product} />
    ))}
  </div>
  {limit && (
    <div className="explore-more-container">
      <Link to="/products" className="explore-more-button">
        Explore More
      </Link>
       {/* Unicode Right Arrow */}
    </div>
  )}
</div>
  );
} 