import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductDetail } from '../../../services/api';

const QuickView = ({ show, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);
    const [productDetail, setProductDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        const loadProductDetail = async () => {
            if (product?.id) {
                try {
                    const response = await fetchProductDetail(product.id);
                    setProductDetail(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error loading product detail:', error);
                    setLoading(false);
                }
            }
        };

        if (show && product?.id) {
            loadProductDetail();
        }
    }, [show, product]);

    if (!show || !product) return null;

    return (
        <div className="quickViewModal modal fade show" id="quickViewModal" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button className="close" onClick={onClose}>×</button>
                    <div className="row learts-mb-n30">
                        {/* Product Images Start */}
                        <div className="col-lg-6 col-12 learts-mb-30">
                            <div className="product-images">
                                <div className="product-gallery-slider-quickview">
                                    <div className="product-zoom">
                                        <img src={product.image_url} alt={product.name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product Images End */}

                        {/* Product Summery Start */}
                        <div className="col-lg-6 col-12 overflow-hidden position-relative learts-mb-30">
                            <div className="product-summery">
                                <div className="product-ratings">
                                    <span className="star-rating">
                                        <span className="rating-active" style={{ width: '100%' }}>ratings</span>
                                    </span>
                                    <Link to="#reviews" className="review-link">(<span className="count">3</span> customer reviews)</Link>
                                </div>
                                <h3 className="product-title">{product.name}</h3>
                                <div className="product-price">${product.price.toFixed(2)}</div>
                                <div className="product-description">
                                    <p>{productDetail?.description || 'No description available'}</p>
                                </div>
                                <div className="product-variations">
                                    <table>
                                        <tbody>
                                            {productDetail?.sizes && productDetail.sizes.length > 0 && (
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
                                            {productDetail?.colors && productDetail.colors.length > 0 && (
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
                                    <Link to="#" className="btn btn-icon btn-outline-body btn-hover-dark">
                                        <i className="far fa-heart"></i>
                                    </Link>
                                    <Link to="#" className="btn btn-dark btn-outline-hover-dark">
                                        <i className="fas fa-shopping-cart"></i> Add to Cart
                                    </Link>
                                </div>
                                <div className="product-brands">
                                    <span className="title">Brands</span>
                                    <div className="brands">
                                        <Link to="#"><img src="assets/images/brands/brand-3.webp" alt="Brand" /></Link>
                                        <Link to="#"><img src="assets/images/brands/brand-8.webp" alt="Brand" /></Link>
                                    </div>
                                </div>
                                <div className="product-meta mb-0">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="label"><span>SKU</span></td>
                                                <td className="value">0404019</td>
                                            </tr>
                                            <tr>
                                                <td className="label"><span>Category</span></td>
                                                <td className="value">
                                                    <ul className="product-category">
                                                        <li><Link to="#">{product.category}</Link></li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label"><span>Share on</span></td>
                                                <td className="value">
                                                    <div className="product-share">
                                                        <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                                                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                                                        <Link to="#"><i className="fab fa-google-plus-g"></i></Link>
                                                        <Link to="#"><i className="fab fa-pinterest"></i></Link>
                                                        <Link to="#"><i className="far fa-envelope"></i></Link>
                                                    </div>
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
        </div>
    );
};

export default QuickView; 