import React, { useState } from 'react';
import { createCategory } from '../../services/api';
import { toast } from 'react-toastify';

const AddCategoryForm = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: ''
  });

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
      const response = await createCategory(categoryData);
      
      if (response && response.code === 201) {
        toast.success('Category created successfully!');
        // Reset form
        setCategoryData({
          name: '',
          description: ''
        });
        // Notify parent component of success
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error creating category:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while creating the category';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-category-form mb-5 p-4 border rounded">
      <h4 className="mb-4">Add New Category</h4>
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
              className="btn btn-dark btn-outline-hover-dark" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Add Category'}
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

export default AddCategoryForm; 