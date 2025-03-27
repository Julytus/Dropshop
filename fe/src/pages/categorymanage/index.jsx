import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ManageBar from '../../components/managebar';
import { getAllCategories } from '../../services/api';
import { toast } from 'react-toastify';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load categories when component mounts
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCategories();
      
      if (response && response.code === 200 && response.data) {
        setCategories(response.data.data);
      } else {
        toast.error('Failed to load categories');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('An error occurred while loading categories');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful category creation
  const handleCategoryCreated = () => {
    setShowAddForm(false);
    loadCategories();
  };

  // Handle category edit
  const handleEditCategory = (categoryId) => {
    setEditingCategoryId(categoryId);
  };

  // Handle successful category update
  const handleCategoryUpdated = () => {
    setEditingCategoryId(null);
    loadCategories();
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingCategoryId(null);
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="container">
        <ManageBar />
        <div className="row">
          <div className="col">
            <div className="page-title">
              <h1 className="title">Category Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Category</li>
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
                    placeholder="Search categories..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-auto">
                {!editingCategoryId && (
                  <button 
                    className="btn btn-dark btn-outline-hover-dark mb-3" 
                    type="button"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    {showAddForm ? 'Close Form' : 'Add New Category'}
                  </button>
                )}
                {editingCategoryId && (
                  <button 
                    className="btn btn-secondary mb-3" 
                    type="button"
                    onClick={handleCancelEdit}
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            </div>

            {/* Add category form */}
            {showAddForm && !editingCategoryId && (
              <AddCategoryForm 
                onSuccess={handleCategoryCreated}
                onCancel={() => setShowAddForm(false)}
              />
            )}
            
            {/* Edit category form */}
            {editingCategoryId && (
              <EditCategoryForm 
                categoryId={editingCategoryId}
                onSuccess={handleCategoryUpdated}
                onCancel={handleCancelEdit}
              />
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading categories...</p>
              </div>
            ) : (
              <>
                {filteredCategories.length === 0 ? (
                  <div className="alert alert-info mt-4">
                    No categories found. Please add a new category!
                  </div>
                ) : (
                  <table className="cart-wishlist-table table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>{category.description || '-'}</td>
                          <td>
                            <button 
                              type="button" 
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEditCategory(category.id)}
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManagement; 