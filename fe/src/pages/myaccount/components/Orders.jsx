import React, { useState, useEffect } from 'react';
import { getMyOrders } from '../../../services/api';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10
  });

  useEffect(() => {
    fetchOrders(pagination.currentPage, pagination.limit);
  }, [pagination.currentPage]);

  const fetchOrders = async (page, limit) => {
    try {
      setLoading(true);
      const response = await getMyOrders(page, limit);
      
      console.log('API Response:', response);
      
      if (response.code === 200 && response.data) {
        // Extract orders data from the response with the correct property names
        setOrders(response.data.data || []);
        setPagination({
          currentPage: response.data.current_page || 1,
          totalPages: response.data.total_pages || 1,
          limit: response.data.page_size || 10
        });
      } else {
        setError('Unable to fetch order list');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        currentPage: newPage
      }));
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format status with proper styling
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'text-warning';
      case 'completed':
        return 'text-success';
      case 'cancelled':
        return 'text-danger';
      case 'processing':
        return 'text-info';
      default:
        return 'text-primary';
    }
  };

  if (loading) {
    return (
      <div className="tab-pane fade show active">
        <div className="myaccount-content order">
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tab-pane fade show active">
        <div className="myaccount-content order">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-pane fade show active">
      <div className="myaccount-content order">
        <h4 className="mb-4">My Orders</h4>
        
        {orders.length === 0 ? (
          <div className="alert alert-info" role="alert">
            You don't have any orders yet. <Link to="/" className="alert-link">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id.substring(0, 8)}</td>
                      <td>{formatDate(order.created_at)}</td>
                      <td>
                        <span className={getStatusClass('processing')}>
                          Processing
                        </span>
                      </td>
                      <td>${order.total_price?.toFixed(2) || '0.00'}</td>
                      <td><Link to={`/order-detail/${order.id}`}>View Details</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination justify-content-center mt-4">
                <ul className="pagination">
                  <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={pagination.currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {[...Array(pagination.totalPages).keys()].map(page => (
                    <li key={page + 1} className={`page-item ${pagination.currentPage === page + 1 ? 'active' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(page + 1)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={pagination.currentPage === pagination.totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders; 