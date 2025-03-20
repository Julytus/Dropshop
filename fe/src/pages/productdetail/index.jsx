import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, getProductById } from '../../services/api';

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                const [productResponse, detailResponse] = await Promise.all([
                    getProductById(id),
                    fetchProductDetail(id)
                ]);
                
                setProduct(productResponse.data);
                setProductDetail(detailResponse.data);
                setLoading(false);
            } catch (error) {
                console.error('Error loading product data:', error);
                setLoading(false);
            }
        };

        if (id) {
            loadProductData();
        }
    }, [id]);

    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    const handlePrevImage = () => {
        const totalImages = allImages.length;
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    const handleNextImage = () => {
        const totalImages = allImages.length;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    if (loading) {
        return (
            <div className="section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product || !productDetail) {
        return (
            <div className="section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <h2>Product not found</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Tạo mảng ảnh bao gồm ảnh chính và các thumbnail
    const allImages = [product.image_url, ...productDetail.thumbnail];

    return (
        <div className="section section-padding border-bottom">
            <div className="container">
                <div className="row learts-mb-n40">
                    {/* Product Images Start */}
                    <div className="col-lg-6 col-12 learts-mb-40">
                        <div className="product-images">
                            <button 
                                className="product-gallery-popup hintT-left" 
                                data-hint="Click to enlarge"
                                data-images={JSON.stringify(allImages.map(img => ({
                                    src: img,
                                    w: 700,
                                    h: 1100
                                })))}
                            >
                                <i className="fas fa-expand"></i>
                            </button>
                            <div className="product-gallery-slider slick-initialized slick-slider slick-dotted">
                                <button className="slick-prev slick-arrow" onClick={handlePrevImage}>
                                    <i className="ti-angle-left"></i>
                                </button>
                                <div className="slick-list draggable">
                                    <div 
                                        className="slick-track" 
                                        style={{ 
                                            opacity: 1, 
                                            width: `${allImages.length * 600}px`,
                                            transform: `translate3d(${-currentImageIndex * 600}px, 0px, 0px)`,
                                            transition: 'transform 500ms ease'
                                        }}
                                    >
                                        {allImages.map((img, index) => (
                                            <div 
                                                key={index} 
                                                className={`slick-slide ${index === currentImageIndex ? 'slick-current slick-active' : ''}`}
                                                data-slick-index={index}
                                                style={{ width: '600px' }}
                                                role="tabpanel"
                                                id={`slick-slide${index + 10}`}
                                                aria-describedby={`slick-slide-control${index + 10}`}
                                                aria-hidden={index !== currentImageIndex}
                                            >
                                                <div>
                                                    <div className="product-zoom" data-image={img} style={{ width: '100%', display: 'inline-block' }}>
                                                        <img src={img} alt={`${product.name} ${index + 1}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="slick-next slick-arrow" onClick={handleNextImage}>
                                    <i className="ti-angle-right"></i>
                                </button>
                                <ul className="slick-dots" role="tablist">
                                    {allImages.map((_, index) => (
                                        <li 
                                            key={index} 
                                            className={index === currentImageIndex ? 'slick-active' : ''} 
                                            role="presentation"
                                        >
                                            <button 
                                                type="button" 
                                                role="tab"
                                                onClick={() => handleThumbnailClick(index)}
                                                aria-controls={`slick-slide${index + 10}`}
                                                aria-label={`${index + 1} of ${allImages.length}`}
                                                tabIndex={index === currentImageIndex ? 0 : -1}
                                                aria-selected={index === currentImageIndex}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="product-thumb-slider slick-initialized slick-slider">
                                <div className="slick-list draggable">
                                    <div 
                                        className="slick-track" 
                                        style={{ 
                                            opacity: 1, 
                                            width: `${allImages.length * 150}px`,
                                            transform: `translate3d(${-currentImageIndex * 150}px, 0px, 0px)`,
                                            transition: 'transform 500ms ease'
                                        }}
                                    >
                                        {allImages.map((img, index) => (
                                            <div 
                                                key={index} 
                                                className={`slick-slide ${index === currentImageIndex ? 'slick-current slick-active' : ''}`}
                                                data-slick-index={index}
                                                style={{ width: '150px' }}
                                                onClick={() => handleThumbnailClick(index)}
                                                role="tabpanel"
                                                id={`slick-thumb${index + 10}`}
                                                aria-describedby={`slick-thumb-control${index + 10}`}
                                                aria-hidden={index !== currentImageIndex}
                                            >
                                                <div>
                                                    <div className="item" style={{ width: '100%', display: 'inline-block' }}>
                                                        <img src={img} alt={`${product.name} thumbnail ${index + 1}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product Images End */}

                    {/* Product Summery Start */}
                    <div className="col-lg-6 col-12 learts-mb-40">
                        <div className="product-summery">
                            <div className="product-nav">
                                <a href="#"><i className="fas fa-long-arrow-alt-left"></i></a>
                                <a href="#"><i className="fas fa-long-arrow-alt-right"></i></a>
                            </div>
                            <div className="product-ratings">
                                <span className="star-rating">
                                    <span className="rating-active" style={{ width: productDetail.star ? `${productDetail.star * 20}%` : '0%' }}>ratings</span>
                                </span>
                                <a href="#reviews" className="review-link">(<span className="count">0</span> customer reviews)</a>
                            </div>
                            <h3 className="product-title">{product.name}</h3>
                            <div className="product-price">${product.price}</div>
                            <div className="product-description">
                                <p>{productDetail.description || 'No description available'}</p>
                            </div>
                            <div className="product-variations">
                                <table>
                                    <tbody>
                                        {productDetail.sizes && productDetail.sizes.length > 0 && (
                                            <tr>
                                                <td className="label"><span>Size</span></td>
                                                <td className="value">
                                                    <div className="product-sizes">
                                                        {productDetail.sizes.map((size, index) => (
                                                            <a 
                                                                key={index}
                                                                href="#"
                                                                className={selectedSize === size ? 'active' : ''}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setSelectedSize(size);
                                                                }}
                                                            >
                                                                {size}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        {productDetail.colors && productDetail.colors.length > 0 && (
                                            <tr>
                                                <td className="label"><span>Color</span></td>
                                                <td className="value">
                                                    <div className="product-colors">
                                                        {productDetail.colors.map((color, index) => (
                                                            <a 
                                                                key={index}
                                                                href="#"
                                                                className={selectedColor === color ? 'active' : ''}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setSelectedColor(color);
                                                                }}
                                                                style={{ backgroundColor: color.toLowerCase() }}
                                                            ></a>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="label"><span>Quantity</span></td>
                                            <td className="value">
                                                <div className="product-quantity">
                                                    <span className="qty-btn minus" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                                        <i className="ti-minus"></i>
                                                    </span>
                                                    <input type="text" className="input-qty" value={quantity} readOnly />
                                                    <span className="qty-btn plus" onClick={() => setQuantity(quantity + 1)}>
                                                        <i className="ti-plus"></i>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="product-buttons">
                                <a href="#" className="btn btn-dark btn-outline-hover-dark">
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                </a>
                            </div>
                            <div className="product-meta">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="label"><span>Category</span></td>
                                            <td className="value">
                                                <ul className="product-category">
                                                    <li><a href="#">{product.category}</a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Product Summery End */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
