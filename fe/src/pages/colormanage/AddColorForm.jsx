import React from 'react';
import { createColor } from '../../services/api';
import { toast } from 'react-toastify';

const AddColorForm = ({ onColorCreated, onCancel }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const colorData = {
      name: formData.get('name').trim(),
      colorCode: formData.get('colorCode').trim()
    };

    try {
      const response = await createColor(colorData);
      if (response && response.code === 201) {
        toast.success('Color created successfully!');
        onColorCreated();
      } else {
        toast.error('Failed to create color');
      }
    } catch (error) {
      console.error('Error creating color:', error);
      toast.error('An error occurred while creating the color');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
      <h4>Add New Color</h4>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="colorName" className="form-label">Color Name <span className="text-danger">*</span></label>
          <input 
            type="text" 
            className="form-control" 
            id="colorName" 
            name="name"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="colorCode" className="form-label">Color Code <span className="text-danger">*</span></label>
          <input 
            type="color" 
            className="form-control form-control-color" 
            id="colorCode" 
            name="colorCode"
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add Color</button>
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

export default AddColorForm; 