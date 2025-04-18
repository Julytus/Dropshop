import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ManageBar from '../../components/managebar';
import { getAllColors } from '../../services/api';
import { toast } from 'react-toastify';
import AddColorForm from './AddColorForm';
import EditColorForm from './EditColorForm';

const ColorManagement = () => {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load colors when component mounts
  useEffect(() => {
    loadColors();
  }, [currentPage]);

  const loadColors = async () => {
    try {
      setIsLoading(true);
      const response = await getAllColors(currentPage);
      
      if (response && response.code === 200 && response.data) {
        setColors(response.data.data);
        setTotalPages(response.data.total_pages);
      } else {
        toast.error('Failed to load colors');
      }
    } catch (error) {
      console.error('Error loading colors:', error);
      toast.error('An error occurred while loading colors');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful color creation
  const handleColorCreated = async () => {
    setShowAddForm(false);
    loadColors();
  };

  // Handle color edit
  const handleEditColor = (color) => {
    setEditingColor(color);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle successful color update
  const handleColorUpdated = async () => {
    setEditingColor(null);
    loadColors();
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingColor(null);
  };

  // Filter colors based on search term
  const filteredColors = colors.filter(color =>
    color && color.name && color.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <ManageBar />
        <div className="row">
          <div className="col">
            <div className="page-title">
              <h1 className="title">Color Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Color</li>
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
                    placeholder="Search colors..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-auto">
                {!editingColor && (
                  <button 
                    className="btn btn-dark btn-outline-hover-dark mb-3" 
                    type="button"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    {showAddForm ? 'Close Form' : 'Add New Color'}
                  </button>
                )}
                {editingColor && (
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

            {/* Add color form */}
            {showAddForm && !editingColor && (
              <AddColorForm 
                onColorCreated={handleColorCreated}
                onCancel={() => setShowAddForm(false)}
              />
            )}
            
            {/* Edit color form */}
            {editingColor && (
              <EditColorForm 
                color={editingColor}
                onColorUpdated={handleColorUpdated}
                onCancel={handleCancelEdit}
              />
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading colors...</p>
              </div>
            ) : (
              <>
                {filteredColors.length === 0 ? (
                  <div className="alert alert-info mt-4">
                    No colors found. Please add a new color!
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="cart-wishlist-table table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Actions</th>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: Math.ceil(filteredColors.length / 2) }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                              {/* First color in the row */}
                              <td>{filteredColors[rowIndex * 2].name}</td>
                              <td>
                                <div 
                                  style={{ 
                                    width: '30px', 
                                    height: '30px', 
                                    backgroundColor: filteredColors[rowIndex * 2].colorCode,
                                    border: '1px solid #ddd'
                                  }}
                                ></div>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleEditColor(filteredColors[rowIndex * 2])}
                                >
                                  <i className="fas fa-edit"></i> Edit
                                </button>
                              </td>

                              {/* Second color in the row (if exists) */}
                              {filteredColors[rowIndex * 2 + 1] && (
                                <>
                                  <td>{filteredColors[rowIndex * 2 + 1].name}</td>
                                  <td>
                                    <div 
                                      style={{ 
                                        width: '30px', 
                                        height: '30px', 
                                        backgroundColor: filteredColors[rowIndex * 2 + 1].colorCode,
                                        border: '1px solid #ddd'
                                      }}
                                    ></div>
                                  </td>
                                  <td>
                                    <button 
                                      type="button" 
                                      className="btn btn-primary btn-sm"
                                      onClick={() => handleEditColor(filteredColors[rowIndex * 2 + 1])}
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

export default ColorManagement; 