import React, { useState, useEffect } from 'react';
import { getCategoryById, updateCategory } from '../../services/api';
import { toast } from 'react-toastify';

const EditCategoryForm = ({ categoryId, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

  // Fetch category data when component mounts
  useEffect(() => {
    loadCategoryData();
  }, [categoryId]);

  const loadCategoryData = async () => {
    try {
      setIsLoading(true);
      const response = await getCategoryById(categoryId);
      
      if (response && response.code === 200 && response.data) {
        setCategoryData({
          name: response.data.name,
          description: response.data.description || ''
        });
      } else {
        toast.error('Failed to load category data.');
      }
    } catch (error) {
      console.error('Error loading category:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while loading the category';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!categoryData.name.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await updateCategory(categoryId, categoryData);
      
      if (response && response.code === 201) {
        toast.success('Category updated successfully!');
        // Notify parent component of success
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error updating category:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the category';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-category-form mb-5 p-4 border rounded">
        <div className="text-center py-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading category data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-category-form mb-5 p-4 border rounded">
      <h4 className="mb-4">Edit Category</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="categoryName" className="form-label">Category Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              id="categoryName" 
              name="name"
              value={categoryData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="categoryDescription" className="form-label">Description</label>
            <input 
              type="text" 
              className="form-control" 
              id="categoryDescription" 
              name="description"
              value={categoryData.description}
              onChange={handleInputChange}
            />
          </div>
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

export default EditCategoryForm; 