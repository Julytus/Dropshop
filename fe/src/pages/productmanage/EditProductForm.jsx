import React, { useState, useEffect } from 'react';
import { fetchProductDetail, updateProductDetail } from '../../services/api';
import { toast } from 'react-toastify';

const EditProductForm = ({ productId, product, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for product detail form
  const [productDetail, setProductDetail] = useState({
    description: '',
    colorIds: [],
    sizeIds: []
  });
  
  // State for thumbnail images
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);
  const [existingThumbnails, setExistingThumbnails] = useState([]);

  // Color mapping (this should be fetched from API in a real implementation)
  const colorOptions = [
    { id: "1", name: "Red" },
    { id: "2", name: "Blue" },
    { id: "3", name: "Green" },
    { id: "4", name: "Black" },
    { id: "5", name: "White" }
  ];
  
  // Size mapping (this should be fetched from API in a real implementation)
  const sizeOptions = [
    { id: "1", name: "S" },
    { id: "2", name: "M" },
    { id: "3", name: "L" },
    { id: "4", name: "XL" },
    { id: "5", name: "XXL" }
  ];

  // Fetch product details when component mounts
  useEffect(() => {
    loadProductDetail();
  }, [productId]);

  // Function to load product details
  const loadProductDetail = async () => {
    try {
      setIsLoading(true);
      const response = await fetchProductDetail(productId);
      
      if (response && response.code === 200 && response.data) {
        const data = response.data;
        
        // Find color IDs based on color names from response
        const selectedColorIds = data.colors
          ? data.colors.map(colorName => {
              const colorOption = colorOptions.find(opt => opt.name === colorName);
              return colorOption ? colorOption.id : null;
            }).filter(id => id !== null)
          : [];
        
        // Find size IDs based on size names from response
        const selectedSizeIds = data.sizes
          ? data.sizes.map(sizeName => {
              const sizeOption = sizeOptions.find(opt => opt.name === sizeName);
              return sizeOption ? sizeOption.id : null;
            }).filter(id => id !== null)
          : [];
        
        // Set product detail state
        setProductDetail({
          description: data.description || '',
          colorIds: selectedColorIds,
          sizeIds: selectedSizeIds
        });
        
        // Set existing thumbnails
        if (data.thumbnail && data.thumbnail.length > 0) {
          setExistingThumbnails(data.thumbnail);
        }
      } else {
        toast.error('Failed to load product details.');
      }
    } catch (error) {
      console.error('Error loading product details:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while loading product details';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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

  // Handle removing a new thumbnail
  const handleRemoveThumbnail = (index) => {
    setThumbnails(thumbnails.filter((_, i) => i !== index));
    setThumbnailPreviews(thumbnailPreviews.filter((_, i) => i !== index));
  };

  // Handle form submission for updating a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create the product detail data
      const productDetailData = {
        description: productDetail.description,
        colorIds: productDetail.colorIds,
        sizeIds: productDetail.sizeIds,
        thumbnails: thumbnails
      };
      
      // Call the API to update product details
      const response = await updateProductDetail(productId, productDetailData);
      
      if (response && response.code === 200) {
        toast.success('Product details updated successfully!');
        
        // Notify parent component of success
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error('Failed to update product details.');
      }
    } catch (error) {
      console.error('Error updating product details:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating product details';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-product-form mb-5 p-4 border rounded">
        <div className="text-center py-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-form mb-5 p-4 border rounded">
      <h4 className="mb-4">Edit Product Details - {product.name}</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="border p-2 rounded">
              <h6>Product Information</h6>
              <p><strong>ID:</strong> {productId}</p>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Category:</strong> {product.categoryName}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </div>
          </div>
          
          <div className="col-md-8 mb-3">
            <div className="border p-2 rounded">
              <h6>Product Image</h6>
              <div className="text-center">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="img-fluid rounded"
                  style={{ maxHeight: '150px' }}
                />
              </div>
            </div>
          </div>

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
              {colorOptions.map(color => (
                <option key={color.id} value={color.id}>{color.name}</option>
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
              {sizeOptions.map(size => (
                <option key={size.id} value={size.id}>{size.name}</option>
              ))}
            </select>
            <small className="form-text text-muted">Hold Ctrl (or Cmd) to select multiple options</small>
          </div>
          
          <div className="col-md-12 mb-3">
            <label className="form-label">Current Product Thumbnails</label>
            <div className="d-flex flex-wrap gap-2">
              {existingThumbnails.length > 0 ? (
                existingThumbnails.map((thumbnailUrl, index) => (
                  <div key={index} className="position-relative" style={{ width: '120px' }}>
                    <img 
                      src={thumbnailUrl} 
                      alt={`Thumbnail ${index+1}`} 
                      className="img-fluid rounded border" 
                      style={{ height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted">No additional images</p>
              )}
            </div>
          </div>
          
          <div className="col-md-12 mb-3">
            <label htmlFor="productThumbnails" className="form-label">New Product Thumbnails</label>
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
              <label className="form-label">New Images Preview</label>
              <div className="d-flex flex-wrap gap-2">
                {thumbnailPreviews.map((preview, index) => (
                  <div key={index} className="position-relative" style={{ width: '100px' }}>
                    <img src={preview} alt={`New Thumbnail ${index+1}`} className="img-fluid rounded" />
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
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
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

export default EditProductForm; 