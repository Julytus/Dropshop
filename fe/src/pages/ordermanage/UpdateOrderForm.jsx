import React, { useState } from 'react';
import { updateOrderStatus } from '../../services/api';
import { toast } from 'react-toastify';

const UpdateOrderForm = ({ orderId, currentStatus, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const response = await updateOrderStatus(orderId, selectedStatus);
      
      if (response && response.code === 200) {
        toast.success('Order status updated successfully!');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response?.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the order status';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update-order-form mb-5 p-4 border rounded">
      <h4 className="mb-4">Update Order Status</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="orderStatus" className="form-label">Order Status <span className="text-danger">*</span></label>
            <select 
              className="form-select" 
              id="orderStatus" 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mt-3">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Status'}
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

export default UpdateOrderForm; 