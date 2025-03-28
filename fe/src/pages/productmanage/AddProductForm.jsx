import React, { useState, useEffect } from 'react';
import { createProduct, createProductDetail, getAllColors, getAllSizes, getAllCategories } from '../../services/api';
import { toast } from 'react-toastify';

const AddProductForm = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    categoryId: '',
    price: ''
  });
  
  // State for product detail form
  const [productDetail, setProductDetail] = useState({
    description: '',
    colorIds: [],
    sizeIds: []
  });
  
  // State for image file
  const [primaryImage, setPrimaryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  
  // State for thumbnail images
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);

  // State for options
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load options when component mounts
  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      setIsLoading(true);
      
      // Load colors
      const colorsResponse = await getAllColors();
      if (colorsResponse && colorsResponse.code === 200 && colorsResponse.data) {
        setColors(colorsResponse.data.data);
      }

      // Load sizes
      const sizesResponse = await getAllSizes();
      if (sizesResponse && sizesResponse.code === 200 && sizesResponse.data) {
        setSizes(sizesResponse.data.data);
      }

      // Load categories
      const categoriesResponse = await getAllCategories();
      if (categoriesResponse && categoriesResponse.code === 200 && categoriesResponse.data) {
        setCategories(categoriesResponse.data.data);
      }
    } catch (error) {
      console.error('Error loading options:', error);
      toast.error('Failed to load form options');
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

  // Handle product detail input changes
  const handleDetailInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetail({
      ...productDetail,
      [name]: value
    });
  };

  // Handle multi-select inputs (colors, sizes)
  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setProductDetail({
      ...productDetail,
      [name]: selectedValues
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

  // Handle thumbnail images upload
  const handleThumbnailsChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Check each file format and size
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      const validFiles = files.filter(file => {
        if (!validImageTypes.includes(file.type)) {
          toast.error(`File ${file.name}: Only JPG, PNG or WebP image formats are accepted`);
          return false;
        }
        
        if (file.size > maxSize) {
          toast.error(`File ${file.name}: Size cannot exceed 10MB`);
          return false;
        }
        
        return true;
      });
      
      setThumbnails([...thumbnails, ...validFiles]);
      
      // Create preview URLs for the valid images
      const newPreviews = [];
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === validFiles.length) {
            setThumbnailPreviews([...thumbnailPreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle removing a thumbnail
  const handleRemoveThumbnail = (index) => {
    setThumbnails(thumbnails.filter((_, i) => i !== index));
    setThumbnailPreviews(thumbnailPreviews.filter((_, i) => i !== index));
  };

  // Handle form submission for adding a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newProduct.name.trim()) {
      toast.error('Product name cannot be empty');
      return;
    }
    
    if (!newProduct.categoryId) {
      toast.error('Please select a category');
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
        toast.success('Product created successfully!');
        
        // If we have product details to submit
        if (productDetail.description || productDetail.colorIds.length > 0 || 
            productDetail.sizeIds.length > 0 || thumbnails.length > 0) {
          
          try {
            // Get the product ID from the response
            const productId = response.data.id;
            
            // Create the product detail data
            const productDetailData = {
              description: productDetail.description,
              colorIds: productDetail.colorIds,
              sizeIds: productDetail.sizeIds,
              thumbnails: thumbnails
            };
            
            // Call the API to create product details
            const detailResponse = await createProductDetail(productId, productDetailData);
            
            if (detailResponse && detailResponse.code === 201) {
              toast.success('Product details added successfully!');
            } else {
              toast.error('Failed to add product details.');
            }
          } catch (detailError) {
            console.error('Error adding product details:', detailError);
            const errorMessage = detailError.response?.data?.message || 'An error occurred while adding product details';
            toast.error(errorMessage);
          }
        }
        
        // Reset form
        resetForm();
        
        // Notify parent component of success
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while adding the product';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form to initial state
  const resetForm = () => {
    setNewProduct({
      name: '',
      categoryId: '',
      price: ''
    });
    setProductDetail({
      description: '',
      colorIds: [],
      sizeIds: []
    });
    setPrimaryImage(null);
    setPreviewImage('');
    setThumbnails([]);
    setThumbnailPreviews([]);
  };

  if (isLoading) {
    return (
      <div className="add-product-form mb-5 p-4 border rounded">
        <div className="text-center py-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading form options...</p>
        </div>
      </div>
    );
  }

  return (
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
            <select 
              className="form-control" 
              id="productCategory" 
              name="categoryId"
              value={newProduct.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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

          <div className="col-12 mb-4 mt-4">
            <h5>Product Details</h5>
            <hr />
          </div>
          
          <div className="col-md-12 mb-3">
            <label htmlFor="productDescription" className="form-label">Product Description</label>
            <textarea 
              className="form-control" 
              id="productDescription" 
              name="description"
              rows="4"
              value={productDetail.description}
              onChange={handleDetailInputChange}
            ></textarea>
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="productColors" className="form-label">Available Colors</label>
            <select 
              multiple 
              className="form-control" 
              id="productColors" 
              name="colorIds"
              onChange={handleMultiSelectChange}
              value={productDetail.colorIds}
            >
              {colors.map(color => (
                <option key={color.id} value={color.id} style={{ color: color.colorCode }}>
                  {color.name}
                </option>
              ))}
            </select>
            <small className="form-text text-muted">Hold Ctrl (or Cmd) to select multiple options</small>
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="productSizes" className="form-label">Available Sizes</label>
            <select 
              multiple 
              className="form-control" 
              id="productSizes" 
              name="sizeIds"
              onChange={handleMultiSelectChange}
              value={productDetail.sizeIds}
            >
              {sizes.map(size => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
            </select>
            <small className="form-text text-muted">Hold Ctrl (or Cmd) to select multiple options</small>
          </div>
          
          <div className="col-md-12 mb-3">
            <label htmlFor="productThumbnails" className="form-label">Additional Product Images</label>
            <input 
              type="file" 
              className="form-control" 
              id="productThumbnails"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleThumbnailsChange}
              multiple
            />
            <small className="form-text text-muted">You can select multiple images. Supported formats: JPG, PNG, WebP. Maximum size: 5MB each</small>
          </div>
          
          {thumbnailPreviews.length > 0 && (
            <div className="col-12 mb-3">
              <label className="form-label">Additional Images Preview</label>
              <div className="d-flex flex-wrap gap-2">
                {thumbnailPreviews.map((preview, index) => (
                  <div key={index} className="position-relative" style={{ width: '100px' }}>
                    <img src={preview} alt={`Thumbnail ${index+1}`} className="img-fluid rounded" />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute"
                      style={{ top: '0', right: '0' }}
                      onClick={() => handleRemoveThumbnail(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
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
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm; 