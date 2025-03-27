import React from 'react';
import { Link } from 'react-router-dom';
import ManageBar from '../../components/managebar';

const OrderManagement = () => {
  const dummyOrders = [
    { 
      id: 1, 
      customerName: 'John Doe',
      orderDate: '2024-03-15',
      total: 299.99,
      status: 'Pending'
    },
    { 
      id: 2, 
      customerName: 'Jane Smith',
      orderDate: '2024-03-14',
      total: 149.99,
      status: 'Completed'
    },
    { 
      id: 3, 
      customerName: 'Mike Johnson',
      orderDate: '2024-03-13',
      total: 499.99,
      status: 'Processing'
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

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
                  <input type="text" placeholder="Search orders..." />
                  <button className="btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <table className="cart-wishlist-table table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.orderDate}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className={`badge bg-${order.status === 'Completed' ? 'success' : 
                        order.status === 'Processing' ? 'warning' : 'info'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="btn btn-primary btn-sm me-2">
                        <i className="fas fa-eye"></i> View
                      </button>
                      <button type="button" className="btn btn-success btn-sm">
                        <i className="fas fa-check"></i> Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManagement; 