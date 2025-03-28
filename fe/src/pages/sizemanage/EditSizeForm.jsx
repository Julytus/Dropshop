import React, { useState, useEffect } from 'react';
import { getSizeByName, updateSize } from '../../services/api';
import { toast } from 'react-toastify';

const EditSizeForm = ({ size, onSizeUpdated, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sizeData, setSizeData] = useState({
    name: ''
  });

  // Fetch size data when component mounts or size changes
  useEffect(() => {
    loadSizeData();
  }, [size]);

  const loadSizeData = async () => {
    try {
      setIsLoading(true);
      const response = await getSizeByName(size.name);
      
      if (response && response.code === 200 && response.data) {
        setSizeData({
          name: response.data.name
        });
      } else {
        toast.error('Failed to load size data.');
      }
    } catch (error) {
      console.error('Error loading size:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while loading the size';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await updateSize(size.id, sizeData);
      
      if (response && response.code === 200) {
        toast.success('Size updated successfully!');
        onSizeUpdated();
      } else {
        toast.error('Failed to update size');
      }
    } catch (error) {
      console.error('Error updating size:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the size';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-size-form mb-4 p-4 border rounded">
        <div className="text-center py-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading size data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <h4>Edit Size</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="editSizeName" className="form-label">Size Name <span className="text-danger">*</span></label>
          <input 
            type="text" 
            className="form-control" 
            id="editSizeName" 
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
            {isSubmitting ? 'Saving...' : 'Update Size'}
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

export default EditSizeForm; 