import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ManageBar from '../../components/managebar';
import { getAllSizes } from '../../services/api';
import { toast } from 'react-toastify';
import AddSizeForm from './AddSizeForm';
import EditSizeForm from './EditSizeForm';

const SizeManagement = () => {
  const [sizes, setSizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load sizes when component mounts
  useEffect(() => {
    loadSizes();
  }, [currentPage]);

  const loadSizes = async () => {
    try {
      setIsLoading(true);
      const response = await getAllSizes(currentPage);
      
      if (response && response.code === 200 && response.data) {
        setSizes(response.data.data);
        setTotalPages(response.data.total_pages);
      } else {
        toast.error('Failed to load sizes');
      }
    } catch (error) {
      console.error('Error loading sizes:', error);
      toast.error('An error occurred while loading sizes');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful size creation
  const handleSizeCreated = async () => {
    setShowAddForm(false);
    loadSizes();
  };

  // Handle size edit
  const handleEditSize = (size) => {
    setEditingSize(size);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle successful size update
  const handleSizeUpdated = async () => {
    setEditingSize(null);
    loadSizes();
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingSize(null);
  };

  // Filter sizes based on search term
  const filteredSizes = sizes.filter(size =>
    size && size.name && size.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <ManageBar />
        <div className="row">
          <div className="col">
            <div className="page-title">
              <h1 className="title">Size Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Size</li>
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
                    placeholder="Search sizes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-auto">
                {!editingSize && (
                  <button 
                    className="btn btn-dark btn-outline-hover-dark mb-3" 
                    type="button"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    {showAddForm ? 'Close Form' : 'Add New Size'}
                  </button>
                )}
                {editingSize && (
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

            {/* Add size form */}
            {showAddForm && !editingSize && (
              <AddSizeForm 
                onSizeCreated={handleSizeCreated}
                onCancel={() => setShowAddForm(false)}
              />
            )}
            
            {/* Edit size form */}
            {editingSize && (
              <EditSizeForm 
                size={editingSize}
                onSizeUpdated={handleSizeUpdated}
                onCancel={handleCancelEdit}
              />
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading sizes...</p>
              </div>
            ) : (
              <>
                {filteredSizes.length === 0 ? (
                  <div className="alert alert-info mt-4">
                    No sizes found. Please add a new size!
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="cart-wishlist-table table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Actions</th>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: Math.ceil(filteredSizes.length / 2) }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                              {/* First size in the row */}
                              <td>{filteredSizes[rowIndex * 2].name}</td>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleEditSize(filteredSizes[rowIndex * 2])}
                                >
                                  <i className="fas fa-edit"></i> Edit
                                </button>
                              </td>

                              {/* Second size in the row (if exists) */}
                              {filteredSizes[rowIndex * 2 + 1] && (
                                <>
                                  <td>{filteredSizes[rowIndex * 2 + 1].name}</td>
                                  <td>
                                    <button 
                                      type="button" 
                                      className="btn btn-primary btn-sm"
                                      onClick={() => handleEditSize(filteredSizes[rowIndex * 2 + 1])}
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeManagement; 