import React from 'react';
import { Link } from 'react-router-dom';
import './ProductItem.css';

const BACKEND_URL = 'https://sahu-final.onrender.com';

const ProductItem = ({ product }) => {
    const { _id, image, title, description } = product;
    
    const getFullImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${BACKEND_URL}${imageUrl}`;
    };
    
    return (
        <Link to={`/products/${_id}`} className="btn secondary-btn">
            <div className="product-item">
                <img 
                    src={getFullImageUrl(image)} 
                    alt={title} 
                    className="product-img"
                    onError={(e) => {
                        console.error('Image load error:', e);
                        e.target.src = '/placeholder.png'; // Fallback image
                    }}
                />
                <div className="product-info-area">
                    <h3 className="product-title">{title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem; 