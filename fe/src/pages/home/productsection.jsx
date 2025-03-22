import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QuickView from './components/QuickView';
import { getAllProducts } from '../../services/api';
import './components/QuickView.css';

const ProductSection = () => {
    const [activeTab, setActiveTab] = useState('new-sale');
    const [showQuickView, setShowQuickView] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts(1, 8);
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setShowQuickView(true);
    };

    const handleCloseQuickView = () => {
        setShowQuickView(false);
        setSelectedProduct(null);
    };

    const renderProductItem = (product) => (
        <div className="col" key={product.id}>
            <div className="product">
                <div className="product-thumb">
                    <Link to={`/product-details/${product.id}`} className="image">
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            style={{ width: '270px', height: '360px', objectFit: 'cover' }}
                        />
                    </Link>
                </div>
                <div className="product-info">
                    <h6 className="title">
                        <Link to={`/product-details/${product.id}`}>
                            {product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}
                        </Link>
                    </h6>
                    <span className="price">
                        <span className="new">${product.price.toFixed(2)}</span>
                    </span>
                    <div className="product-buttons">
                        <a 
                            className="product-button hintT-top" 
                            data-hint="Quick View" 
                            onClick={() => handleQuickView(product)}
                        >
                            <i className="fas fa-search"></i>
                        </a>
                        <a 
                            className="product-button hintT-top" 
                            data-hint="Add to Cart"
                        >
                            <i className="fas fa-shopping-cart"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="section section-padding">
            <div className="container">
                {/* Section Title Start */}
                <div className="section-title4 text-center">
                    <h2 className="title title-icon-both">Just for you</h2>
                </div>
                {/* Section Title End */}

                {/* Product Tab Start */}
                <div className="row">
                    <div className="col-12">
                        <ul className="product-tab-list tab-hover2 nav" role="tablist">
                            <li>
                                <a 
                                    className={activeTab === 'new-sale' ? 'active' : ''} 
                                    onClick={() => setActiveTab('new-sale')}
                                    href="#tab-new-sale" 
                                    data-bs-toggle="tab" 
                                    role="tab"
                                >
                                    New arrivals
                                </a>
                            </li>
                            <li>
                                <a 
                                    className={activeTab === 'sale-items' ? 'active' : ''} 
                                    onClick={() => setActiveTab('sale-items')}
                                    href="#tab-sale-items" 
                                    data-bs-toggle="tab" 
                                    role="tab"
                                >
                                    Sale items
                                </a>
                            </li>
                            <li>
                                <a 
                                    className={activeTab === 'best-sellers' ? 'active' : ''} 
                                    onClick={() => setActiveTab('best-sellers')}
                                    href="#tab-best-sellers" 
                                    data-bs-toggle="tab" 
                                    role="tab"
                                >
                                    Best sellers
                                </a>
                            </li>
                        </ul>

                        <div className="prodyct-tab-content1 tab-content">
                            {/* New Arrivals Tab */}
                            <div className={`tab-pane fade ${activeTab === 'new-sale' ? 'show active' : ''}`} id="tab-new-sale" role="tabpanel">
                                <div className="products row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        products.map(renderProductItem)
                                    )}
                                </div>
                            </div>

                            {/* Sale Items Tab */}
                            <div className={`tab-pane fade ${activeTab === 'sale-items' ? 'show active' : ''}`} id="tab-sale-items" role="tabpanel">
                                <div className="products row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        products.map(renderProductItem)
                                    )}
                                </div>
                            </div>

                            {/* Best Sellers Tab */}
                            <div className={`tab-pane fade ${activeTab === 'best-sellers' ? 'show active' : ''}`} id="tab-best-sellers" role="tabpanel">
                                <div className="products row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
                                    {loading ? (
                                        <div className="col-12 text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        products.map(renderProductItem)
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Product Tab End */}

                <div className="row g-0 justify-content-center learts-mt-50">
                    <a href="#" className="btn p-0">
                        <i className="ti-plus"></i> load more ...
                    </a>
                </div>
            </div>

            {/* QuickView Modal */}
            <QuickView 
                show={showQuickView} 
                onClose={handleCloseQuickView} 
                product={selectedProduct}
            />
        </div>
    );
};

export default ProductSection;
