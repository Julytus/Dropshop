import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetail, getProductById } from '../../services/api';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetail();
    }, []);

    const fetchOrderDetail = async () => {
        try {
            setLoading(true);
            const response = await getOrderDetail(id);
            
            if (response && response.code === 200 && response.data) {
                setOrder(response.data);
                
                // Get unique product IDs (since there can be duplicates with different sizes/colors)
                const productIds = [...new Set(response.data.items.map(item => item.product_id))];
                await fetchProductDetails(productIds);
            } else {
                setError('Unable to retrieve order information');
            }
        } catch (error) {
            console.error('Error fetching order detail:', error);
            setError('An error occurred while retrieving order information');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductDetails = async (productIds) => {
        try {
            const productData = {};
            
            for (const productId of productIds) {
                try {
                    const response = await getProductById(productId);
                    console.log(`Product ${productId} data:`, response);
                    if (response.code === 200 && response.data) {
                        productData[productId] = response.data;
                    }
                } catch (err) {
                    console.error(`Error fetching product ${productId}:`, err);
                }
            }
            
            setProducts(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    // Format date to readable format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get appropriate class for order status
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'badge bg-warning';
            case 'completed':
                return 'badge bg-success';
            case 'cancelled':
                return 'badge bg-danger';
            case 'processing':
                return 'badge bg-info';
            default:
                return 'badge bg-secondary';
        }
    };

    // Calculate price for order item
    const calculateItemPrice = (item) => {
        const product = products[item.product_id];
        if (!product) return '0.00';
        
        return (product.price * item.quantity).toFixed(2);
    };

    // Get product image URL
    const getProductImage = (productId) => {
        const product = products[productId];
        if (!product) return null;
        
        return product.image_url || null;
    };

    // Get product name
    const getProductName = (productId, fallback) => {
        const product = products[productId];
        if (!product) return fallback;
        
        return product.name || fallback;
    };

    if (loading) {
        return (
            <div className="section section-padding">
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading order details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section section-padding">
                <div className="container">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Error!</h4>
                        <p>{error}</p>
                        <hr />
                        <Link to="/my-account" className="btn btn-outline-dark mt-3">
                            Return to Order List
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="section section-padding">
                <div className="container">
                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">Order Not Found!</h4>
                        <p>Could not find order information with ID #{id}</p>
                        <hr />
                        <Link to="/my-account" className="btn btn-outline-dark mt-3">
                            Return to Order List
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section section-padding">
            <div className="container">
                <div className="order-detail">
                    {/* Order header */}
                    <div className="order-header mb-4">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="mb-2">Order Details</h2>
                                <p className="mb-2">
                                    <strong>Order ID:</strong> #{order.id}
                                </p>
                                <p className="mb-2">
                                    <strong>Order Date:</strong> {formatDate(order.created_at)}
                                </p>
                                <p className="mb-2">
                                    <strong>Updated At:</strong> {formatDate(order.updated_at)}
                                </p>
                                <p className="mb-0">
                                    <strong>Status:</strong> 
                                    <span className={`${getStatusClass(order.status?.toLowerCase())} ms-2`}>
                                        {order.status?.toLowerCase() === 'pending' ? 'Pending' :
                                         order.status?.toLowerCase() === 'processing' ? 'Processing' :
                                         order.status?.toLowerCase() === 'completed' ? 'Completed' :
                                         order.status?.toLowerCase() === 'cancelled' ? 'Cancelled' : 'Pending'}
                                    </span>
                                </p>
                            </div>
                            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                                <Link to="/my-account" className="btn btn-outline-dark">
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Return to My Orders
                                </Link>
                            </div>
                        </div>
                        <hr className="my-4" />
                    </div>
                    
                    {/* Order information */}
                    <div className="row">
                        {/* Shipping information */}
                        <div className="col-lg-6 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">Shipping Information</h5>
                                </div>
                                <div className="card-body">
                                    <p><strong>Email:</strong> {order.email_address}</p>
                                    <p><strong>Phone:</strong> {order.phone_number}</p>
                                    <p><strong>Address:</strong><br />
                                        {order.address?.number} {order.address?.street},<br />
                                        {order.address?.district}, {order.address?.city},<br />
                                        {order.address?.country} {order.address?.zip}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Order summary */}
                        <div className="col-lg-6 mb-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-0">
                                        <span className="h5">Total Amount:</span>
                                        <span className="h5">${order.total_price?.toFixed(2) || '0.00'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Order items */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Products in Order</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Size</th>
                                            <th>Color</th>
                                            <th>Quantity</th>
                                            <th className="text-end">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items && order.items.map((item, index) => {
                                            const imageUrl = getProductImage(item.product_id);
                                            const productName = getProductName(item.product_id, `Product ${index + 1}`);
                                            
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            {imageUrl && (
                                                                <img 
                                                                    src={imageUrl} 
                                                                    alt={productName} 
                                                                    className="me-3"
                                                                    style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                                                                />
                                                            )}
                                                            <div>
                                                                <Link to={`/product-details/${item.product_id}`} className="fw-medium">
                                                                    {productName}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.size || 'N/A'}</td>
                                                    <td>{item.color || 'N/A'}</td>
                                                    <td>{item.quantity}</td>
                                                    <td className="text-end">
                                                        ${calculateItemPrice(item)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    {/* Notes */}
                    {order.order_notes && order.order_notes.trim() !== '' && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">Order Notes</h5>
                            </div>
                            <div className="card-body">
                                <p className="mb-0">{order.order_notes}</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Actions */}
                    <div className="text-end mt-4">
                        <Link to="/" className="btn btn-primary me-2">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Continue Shopping
                        </Link>
                        <button className="btn btn-outline-dark">
                            <i className="fas fa-print me-2"></i>
                            Print Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail; 