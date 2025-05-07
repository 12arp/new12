import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const BACKEND_URL = 'https://sahu-final.onrender.com';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        additionalImages: [],
        features: [''],
        specifications: [{ name: '', value: '' }],
        isFeatured: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const getFullImageUrl = (imageUrl) => {
        if (!imageUrl) return '';
        return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}${imageUrl}`;
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/products`);
            if (res.data.success) {
                setProducts(res.data.data);
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            setError('Failed to fetch products');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product._id);
        setFormData({
            title: product.title,
            description: product.description,
            image: product.image,
            additionalImages: product.additionalImages || [],
            features: product.features || [''],
            specifications: product.specifications || [{ name: '', value: '' }],
            isFeatured: product.isFeatured || false
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                setLoading(true);
                const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                if (res.data.success) {
                    setFormData(prev => ({
                        ...prev,
                        image: res.data.data.url || res.data.data.path
                    }));
                    setError(null);
                } else {
                    setError('Failed to upload image');
                }
            } catch (error) {
                console.error('Image upload error:', error);
                setError('Failed to upload image. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAdditionalImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                setLoading(true);
                const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                if (res.data.success) {
                    setFormData(prev => ({
                        ...prev,
                        additionalImages: [...prev.additionalImages, res.data.data.url || res.data.data.path]
                    }));
                } else {
                    setError('Failed to upload image');
                }
            } catch (error) {
                setError('Failed to upload image');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAddFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, '']
        }));
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleFeatureChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((feature, i) => 
                i === index ? value : feature
            )
        }));
    };

    const handleAddSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, { name: '', value: '' }]
        }));
    };

    const handleRemoveSpecification = (index) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    const handleSpecificationChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.map((spec, i) => 
                i === index ? { ...spec, [field]: value } : spec
            )
        }));
    };

    const validateForm = () => {
        const errors = [];

        if (!formData.title.trim()) {
            errors.push('Title is required');
        }

        if (!formData.description.trim()) {
            errors.push('Description is required');
        }

        if (!formData.image) {
            errors.push('Main image is required');
        }

        // Validate specifications
        formData.specifications.forEach((spec, index) => {
            if (spec.name.trim() && !spec.value.trim()) {
                errors.push(`Specification ${index + 1} value is required`);
            }
            if (!spec.name.trim() && spec.value.trim()) {
                errors.push(`Specification ${index + 1} name is required`);
            }
        });

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const formattedFeatures = formData.features
                .filter(feature => feature.trim() !== '')
                .map(feature => feature.trim());

            const formattedSpecifications = formData.specifications
                .filter(spec => spec.name.trim() !== '' && spec.value.trim() !== '')
                .map(spec => ({
                    name: spec.name.trim(),
                    value: spec.value.trim()
                }));

            const productData = {
                ...formData,
                features: formattedFeatures,
                specifications: formattedSpecifications
            };

            let res;
            if (editingProduct) {
                res = await axios.put(`${BACKEND_URL}/api/products/${editingProduct}`, productData);
            } else {
                res = await axios.post(`${BACKEND_URL}/api/products`, productData);
            }
            
            if (res.data.success) {
                setSuccess(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
                setFormData({
                    title: '',
                    description: '',
                    image: '',
                    additionalImages: [],
                    features: [''],
                    specifications: [{ name: '', value: '' }],
                    isFeatured: false
                });
                setEditingProduct(null);
                fetchProducts();
            } else {
                setError(res.data.message || 'Failed to save product');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setFormData({
            title: '',
            description: '',
            image: '',
            additionalImages: [],
            features: [''],
            specifications: [{ name: '', value: '' }],
            isFeatured: false
        });
        setError(null);
        setSuccess(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const res = await axios.delete(`${BACKEND_URL}/api/products/${id}`);
                if (res.data.success) {
                    setSuccess('Product deleted successfully!');
                    fetchProducts();
                } else {
                    setError('Failed to delete product');
                }
            } catch (error) {
                setError('Failed to delete product');
            }
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <div className="admin-header-content">
                    <h1>{editingProduct ? 'Edit Product' : 'Add New Product'}</h1>
                    <div className="admin-header-buttons">
                        <button onClick={() => navigate('/')} className="home-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Home
                        </button>
                        <button onClick={() => {
                            localStorage.removeItem('adminToken');
                            navigate('/login');
                        }} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Main Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageUpload}
                        accept="image/*"
                        required
                    />
                    {formData.image && (
                        <img 
                            src={getFullImageUrl(formData.image)} 
                            alt="Preview" 
                            className="image-preview"
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Additional Images</label>
                    <input
                        type="file"
                        onChange={handleAdditionalImageUpload}
                        accept="image/*"
                    />
                    <div className="additional-images">
                        {formData.additionalImages.map((img, index) => (
                            <div key={index} className="image-preview-container">
                                <img src={getFullImageUrl(img)} alt={`Additional ${index + 1}`} />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({
                                        ...prev,
                                        additionalImages: prev.additionalImages.filter((_, i) => i !== index)
                                    }))}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Features</label>
                    {formData.features.map((feature, index) => (
                        <div key={index} className="feature-input">
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => handleFeatureChange(index, e.target.value)}
                                placeholder={`Feature ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFeature(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddFeature}
                    >
                        Add Feature
                    </button>
                </div>

                <div className="form-group">
                    <label>Specifications</label>
                    {formData.specifications.map((spec, index) => (
                        <div key={index} className="specification-inputs">
                            <input
                                type="text"
                                value={spec.name}
                                onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                value={spec.value}
                                onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                                placeholder="Value"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSpecification(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddSpecification}
                    >
                        Add Specification
                    </button>
                </div>

                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                        />
                        Featured Product
                    </label>
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                    {editingProduct && (
                        <button type="button" className="cancel-button" onClick={handleCancel}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="products-list">
                <h2>Existing Products</h2>
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={getFullImageUrl(product.image)} alt={product.title} />
                            <h3>{product.title}</h3>
                            {/* <p>{product.description.substring(0, 100)}...</p> */}
                            <div className="button-group">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel; 