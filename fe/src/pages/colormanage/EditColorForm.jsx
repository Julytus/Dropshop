import React, { useState, useEffect } from 'react';
import { getColorByName, updateColor } from '../../services/api';
import { toast } from 'react-toastify';

const EditColorForm = ({ color, onColorUpdated, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [colorData, setColorData] = useState({
    name: '',
    colorCode: '#000000'
  });

  // Fetch color data when component mounts or colorId changes
  useEffect(() => {
    loadColorData();
  }, [color]);

  const loadColorData = async () => {
    try {
      setIsLoading(true);
      const response = await getColorByName(color.name);
      
      if (response && response.code === 200 && response.data) {
        setColorData({
          name: response.data.name,
          colorCode: response.data.colorCode
        });
      } else {
        toast.error('Failed to load color data.');
      }
    } catch (error) {
      console.error('Error loading color:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while loading the color';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setColorData({
      ...colorData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!colorData.name.trim()) {
      toast.error('Color name cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const response = await updateColor(colorId, colorData);
      
      if (response && response.code === 200) {
        toast.success('Color updated successfully!');
        onColorUpdated();
      } else {
        toast.error('Failed to update color');
      }
    } catch (error) {
      console.error('Error updating color:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the color';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-color-form mb-4 p-4 border rounded">
        <div className="text-center py-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading color data...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <h4>Edit Color</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="editColorName" className="form-label">Color Name <span className="text-danger">*</span></label>
          <input 
            type="text" 
            className="form-control" 
            id="editColorName" 
            name="name"
            value={colorData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="editColorCode" className="form-label">Color Code <span className="text-danger">*</span></label>
          <input 
            type="color" 
            className="form-control form-control-color" 
            id="editColorCode" 
            name="colorCode"
            value={colorData.colorCode}
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
            {isSubmitting ? 'Saving...' : 'Update Color'}
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

export default EditColorForm; 