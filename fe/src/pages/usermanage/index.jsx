import React from 'react';
import { Link } from 'react-router-dom';
import ManageBar from '../../components/managebar';

const UserManagement = () => {
  const dummyUsers = [
    { 
      id: 1, 
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-02-20'
    },
    { 
      id: 3, 
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Customer',
      status: 'Inactive',
      joinDate: '2024-03-01'
    },
  ];

  return (
    <>
      <div className="container">
        <ManageBar />
        <div className="row">
          <div className="col">
            <div className="page-title">
              <h1 className="title">User Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Users</li>
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
                  <input type="text" placeholder="Search users..." />
                  <button className="btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-auto">
                <button className="btn btn-dark btn-outline-hover-dark mb-3" type="button">
                  Add New User
                </button>
              </div>
            </div>

            <table className="cart-wishlist-table table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dummyUsers.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${user.role === 'Admin' ? 'danger' : 'primary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${user.status === 'Active' ? 'success' : 'secondary'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.joinDate}</td>
                    <td>
                      <button type="button" className="btn btn-primary btn-sm me-2">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                      <button type="button" className="btn btn-danger btn-sm">
                        <i className="fas fa-ban"></i> Block
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

export default UserManagement; 