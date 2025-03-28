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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load categories when component mounts
  useEffect(() => {
    loadCategories();
  }, [currentPage]);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCategories(currentPage);
      
      if (response && response.code === 200 && response.data) {
        setCategories(response.data.data);
        setTotalPages(response.data.total_pages);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                  <div className="table-responsive">
                    <table className="cart-wishlist-table table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Actions</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: Math.ceil(filteredCategories.length / 2) }).map((_, rowIndex) => (
                          <tr key={rowIndex}>
                            {/* First category in the row */}
                            <td>{filteredCategories[rowIndex * 2].name}</td>
                            <td>{filteredCategories[rowIndex * 2].description || '-'}</td>
                            <td>
                              <button 
                                type="button" 
                                className="btn btn-primary btn-sm"
                                onClick={() => handleEditCategory(filteredCategories[rowIndex * 2].id)}
                              >
                                <i className="fas fa-edit"></i> Edit
                              </button>
                            </td>

                            {/* Second category in the row (if exists) */}
                            {filteredCategories[rowIndex * 2 + 1] && (
                              <>
                                <td>{filteredCategories[rowIndex * 2 + 1].name}</td>
                                <td>{filteredCategories[rowIndex * 2 + 1].description || '-'}</td>
                                <td>
                                  <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEditCategory(filteredCategories[rowIndex * 2 + 1].id)}
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </button>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

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

export default CategoryManagement; 