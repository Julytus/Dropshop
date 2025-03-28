import React, { useState } from 'react';
import { createSize } from '../../services/api';
import { toast } from 'react-toastify';

const AddSizeForm = ({ onSizeCreated, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sizeData, setSizeData] = useState({
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSizeData({
      ...sizeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!sizeData.name.trim()) {
      toast.error('Size name cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await createSize(sizeData);
      
      if (response && response.code === 201) {
        toast.success('Size created successfully!');
        onSizeCreated();
      } else {
        toast.error('Failed to create size');
      }
    } catch (error) {
      console.error('Error creating size:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while creating the size';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <h4>Add New Size</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="sizeName" className="form-label">Size Name <span className="text-danger">*</span></label>
          <input 
            type="text" 
            className="form-control" 
            id="sizeName" 
            name="name"
            value={sizeData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Size'}
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
  );
};

export default AddSizeForm; 