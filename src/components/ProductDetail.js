import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ProductDetail.css';

const BACKEND_URL = 'https://sahu-final.onrender.com';
// .com';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getFullImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${BACKEND_URL}${imageUrl}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <Navbar />
      <div className="container">
        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img
                src={getFullImageUrl(product.additionalImages?.[selectedImage] || product.image)}
                alt={product.title}
                className="product-img"
              />
            </div>
            <div className="thumbnail-container">
              {[product.image, ...(product.additionalImages || [])].map((img, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={getFullImageUrl(img)} alt={`${product.title} View ${index + 1}`} />
                  <span>View {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="description">{product.description}</p>

            <div className="key-features">
              <h2>Key Features</h2>
              <ul>
                {product.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="action-buttons">
              {product.specifications?.length > 0 && (
                <button className="spec-btn" onClick={() => document.getElementById('specifications').scrollIntoView({ behavior: 'smooth' })}>
                  View Specifications
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {product.specifications?.length > 0 && (
        <div id="specifications" className="specifications">
          <h2>Technical Specifications</h2>
          <div className="spec-content">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {product.specifications.map((spec, index) => (
                  <tr key={index}>
                    <td>{spec.name}</td>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 




