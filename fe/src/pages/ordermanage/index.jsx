import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ManageBar from '../../components/managebar';
import { getAllOrders } from '../../services/api';
import { toast } from 'react-toastify';
import UpdateOrderForm from './UpdateOrderForm';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrderId, setEditingOrderId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [currentPage]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getAllOrders(currentPage);
      if (response && response.code === 200 && response.data) {
        setOrders(response.data.data);
        setTotalPages(response.data.total_pages);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('An error occurred while loading orders');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order-detail/${orderId}`);
  };

  const handleEditOrder = (orderId, currentStatus) => {
    setEditingOrderId({ id: orderId, status: currentStatus });
  };

  const handleOrderUpdated = () => {
    setEditingOrderId(null);
    loadOrders();
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'info';
    }
  };

  const filteredOrders = orders.filter(order =>
    order.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone_number.includes(searchTerm) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <ManageBar />
        <div className="row">
          <div className="col">
            <div className="page-title">
              <h1 className="title">Order Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Orders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-padding">
        <div className="container">
          <div className="cart-form">
            <div className="row justify-content-between mb-n3">
              <div className="col-auto mb-3">
                <div className="cart-coupon">
                  <input 
                    type="text" 
                    placeholder="Search orders..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading orders...</p>
              </div>
            ) : (
              <>
                {editingOrderId && (
                  <UpdateOrderForm
                    orderId={editingOrderId.id}
                    currentStatus={editingOrderId.status}
                    onSuccess={handleOrderUpdated}
                    onCancel={handleCancelEdit}
                  />
                )}

                <table className="cart-wishlist-table table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Email</th>
                      <th>Updated At</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id.slice(0, 8)}</td>
                        <td>{order.email_address}</td>
                        <td>{formatDate(order.updated_at)}</td>
                        <td>{formatPrice(order.total_price)}</td>
                        <td>
                          <span className={`badge bg-${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            type="button" 
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            <i className="fas fa-eye"></i> View
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-success btn-sm"
                            onClick={() => handleEditOrder(order.id, order.status)}
                          >
                            <i className="fas fa-check"></i> Update Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManagement; 