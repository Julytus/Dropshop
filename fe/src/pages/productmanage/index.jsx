import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../services/api';
import { toast } from 'react-toastify';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import ManageBar from '../../components/managebar';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for editing
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Ref to prevent multiple API calls
  const apiCalled = useRef(false);

  // Load product list when component mounts
  useEffect(() => {
    // Only call API if not called before
    if (!apiCalled.current) {
      apiCalled.current = true;
      loadProducts();
    }
  }, []);

  // Function to load product list
  const loadProducts = async () => {
    // Don't call API if already loading
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      const response = await fetchProducts();
      console.log('API Response:', response);
      
      if (response && response.data) {
        // Check data structure
        if (response.data.data && Array.isArray(response.data.data)) {
          // If structure is {data: [...]}
          setProducts(response.data.data);
        } else if (Array.isArray(response.data)) {
          // If response.data is already an array
          setProducts(response.data);
        } else {
          console.error('Returned data is not an array:', response.data);
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error loading product list:', error);
      toast.error('Unable to load product list');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search products
  const handleSearch = async () => {
    // Don't call API if already loading
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const response = await fetchProducts({ name: searchTerm });
      
      if (response && response.data) {
        // Check data structure
        if (response.data.data && Array.isArray(response.data.data)) {
          // If structure is {data: [...]}
          setProducts(response.data.data);
        } else if (Array.isArray(response.data)) {
          // If response.data is already an array
          setProducts(response.data);
        } else {
          console.error('Returned data is not an array:', response.data);
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      toast.error('Unable to search products');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await deleteProduct(productId);
        
        // Check if the deletion was successful based on the response
        if (response && response.code === 200) {
          toast.success(response.message || 'Product deleted successfully!');
          // Update the product list after successful deletion
          loadProducts();
        } else {
          toast.error('Failed to delete product. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        const errorMessage = error.response?.data?.message || 'Unable to delete product';
        toast.error(errorMessage);
      }
    }
  };

  // Handle successful product creation
  const handleProductCreated = () => {
    setShowAddForm(false);
    loadProducts();
  };
  
  // Handle product edit
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setEditingProduct(product);
    // Close add form if it's open
    setShowAddForm(false);
  };
  
  // Handle successful product edit
  const handleProductUpdated = () => {
    setEditingProductId(null);
    setEditingProduct(null);
    loadProducts();
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditingProduct(null);
  };

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <>
      {/* Page Title/Header Start */}
      <div className="container">
      <ManageBar />

        <div className="row">

          <div className="col">
            <div className="page-title">
              <h1 className="title">Product Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Product</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Page Title/Header End */}

      <div className="section section-padding">
        <div className="container">
          <div className="cart-form">
            <div className="row justify-content-between mb-n3">
              <div className="col-auto mb-3">
                <div className="cart-coupon">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button 
                    className="btn" 
                    type="button" 
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
              <div className="col-auto">
                {!editingProductId && (
                  <button 
                    className="btn btn-dark btn-outline-hover-dark mb-3" 
                    type="button"
                    onClick={() => setShowAddForm(!showAddForm)}
                  >
                    {showAddForm ? 'Close Form' : 'Add New Product'}
                  </button>
                  
                )}
                {editingProductId && (
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

            {/* Add product form */}
            {showAddForm && !editingProductId && (
              <AddProductForm 
                onSuccess={handleProductCreated}
                onCancel={() => setShowAddForm(false)}
              />
            )}
            
            {/* Edit product form */}
            {editingProductId && editingProduct && (
              <EditProductForm 
                productId={editingProductId}
                product={editingProduct}
                onSuccess={handleProductUpdated}
                onCancel={handleCancelEdit}
              />
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading data...</p>
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="alert alert-info mt-4">
                    No products found. Please add a new product!
                  </div>
                ) : (
                  <table className="cart-wishlist-table table">
                    <thead>
                      <tr>
                        <th className="name" colSpan="2">Product</th>
                        <th className="price">Price</th>
                        <th className="quantity">Category</th>
                        <th className="subtotal">ID</th>
                        <th className="edit">Actions</th>
                        <th className="remove">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="thumbnail">
                            <Link to={`/product-details/${product.id}`}>
                              <img 
                                src={product.image_url} 
                                alt={product.name} 
                              />
                            </Link>
                          </td>
                          <td className="name">
                            <Link to={`/product-details/${product.id}`}>{product.name}</Link>
                          </td>
                          <td className="name">
                            <span>{formatPrice(product.price)}</span>
                          </td>
                          <td className="name">
                            <span>{product.category}</span>
                          </td>
                          <td className="name">
                            <span>{product.id}</span>
                          </td>
                          <td className="edit">
                            <button 
                              type="button" 
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEditProduct(product)}
                              title="Edit product details"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                          </td>
                          <td className="remove">
                            <button 
                              type="button" 
                              className="btn"
                              onClick={() => handleDeleteProduct(product.id)}
                              title="Delete product"
                            >
                              ×
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

export default ProductManagement;
