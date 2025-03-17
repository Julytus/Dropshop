import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createProduct, fetchProducts, deleteProduct } from '../../services/api';
import { toast } from 'react-toastify';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ref to prevent multiple API calls
  const apiCalled = useRef(false);
  
  // State for new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: '',
    price: ''
  });
  
  // State for image file
  const [primaryImage, setPrimaryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  // Handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file format and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validImageTypes.includes(file.type)) {
        toast.error('Only JPG, PNG or WebP image formats are accepted');
        return;
      }
      
      if (file.size > maxSize) {
        toast.error('File size cannot exceed 10MB');
        return;
      }
      
      setPrimaryImage(file);
      
      // Create preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission for adding a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newProduct.name.trim()) {
      toast.error('Product name cannot be empty');
      return;
    }
    
    if (!newProduct.categoryId.trim()) {
      toast.error('Product category cannot be empty');
      return;
    }
    
    if (!newProduct.price || isNaN(parseFloat(newProduct.price)) || parseFloat(newProduct.price) <= 0) {
      toast.error('Product price must be a positive number');
      return;
    }
    
    if (!primaryImage) {
      toast.error('Please select an image for the product');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Convert price from string to float
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price)
      };
      
      const response = await createProduct(productData, primaryImage);
      
      if (response && response.code === 201) {
        toast.success('Product added successfully!');
        
        // Reset form
        setNewProduct({
          name: '',
          categoryId: '',
          price: ''
        });
        setPrimaryImage(null);
        setPreviewImage('');
        setShowAddForm(false);
        
        // Update product list
        loadProducts();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while adding the product';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
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

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <>
      {/* Page Title/Header Start */}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="page-title">
              <h1 className="title">Product Management</h1>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/admin">Admin</Link></li>
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
                <button 
                  className="btn btn-dark btn-outline-hover-dark mb-3" 
                  type="button"
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  {showAddForm ? 'Close Form' : 'Add New Product'}
                </button>
              </div>
            </div>

            {/* Add product form */}
            {showAddForm && (
              <div className="add-product-form mb-5 p-4 border rounded">
                <h4 className="mb-4">Add New Product</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="productName" className="form-label">Product Name <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="productName" 
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="productCategory" className="form-label">Product Category <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="productCategory" 
                        name="categoryId"
                        value={newProduct.categoryId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="productPrice" className="form-label">Price <span className="text-danger">*</span></label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="productPrice" 
                        name="price"
                        min="0"
                        step="0.01"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="productImage" className="form-label">Product Image <span className="text-danger">*</span></label>
                      <input 
                        type="file" 
                        className="form-control" 
                        id="productImage"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        required
                      />
                      <small className="form-text text-muted">Supported formats: JPG, PNG, WebP. Maximum size: 5MB</small>
                    </div>
                    
                    {previewImage && (
                      <div className="col-12 mb-3">
                        <label className="form-label">Image Preview</label>
                        <div className="image-preview" style={{ maxWidth: '200px' }}>
                          <img src={previewImage} alt="Preview" className="img-fluid rounded" />
                        </div>
                      </div>
                    )}
                    
                    <div className="col-12 mt-3">
                      <button 
                        type="submit" 
                        className="btn btn-dark btn-outline-hover-dark" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : 'Add Product'}
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-light ms-2" 
                        onClick={() => setShowAddForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
                        <th className="edit">Product details</th>
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
                          <td className="price">
                            <span>{formatPrice(product.price)}</span>
                          </td>
                          <td className="price">
                            <span>{product.categoryName}</span>
                          </td>
                          <td className="subtotal">
                            <span>{product.id}</span>
                          </td>
                          <td className="edit">
                            <span>Edit</span>
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
