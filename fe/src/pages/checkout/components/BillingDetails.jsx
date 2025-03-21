import React, { useState } from 'react';
import { createOrder } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const BillingDetails = () => {
    const navigate = useNavigate();
    const accesstoken = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        country: '',
        street: '',
        city: '',
        district: '',
        number: '',
        zip: '',
        emailAddress: '',
        phoneNumber: '',
        orderNotes: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Xử lý ID để lấy tên trường chính xác
        let fieldName = id.replace('bd', '').toLowerCase();
        
        // Xử lý các trường đặc biệt
        if (fieldName === 'emailaddress') {
            fieldName = 'emailAddress';
        } else if (fieldName === 'phonenumber') {
            fieldName = 'phoneNumber';
        } else if (fieldName === 'ordernotes') {
            fieldName = 'orderNotes';
        }

        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Lấy dữ liệu giỏ hàng từ localStorage
            const cartItems = JSON.parse(localStorage.getItem('shopping_cart') || '[]');

            // Kiểm tra giỏ hàng có trống không
            if (cartItems.length === 0) {
                alert('Giỏ hàng trống!');
                return;
            }

            // Tạo đối tượng orderData theo cấu trúc API
            const orderData = {
                cartItems: cartItems.map(item => ({
                    productId: item.id,
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity
                })),
                addressRequest: {
                    country: formData.country,
                    street: formData.street,
                    city: formData.city,
                    district: formData.district,
                    number: formData.number,
                    zip: formData.zip
                },
                emailAddress: formData.emailAddress,
                phoneNumber: formData.phoneNumber,
                orderNotes: formData.orderNotes,
                token: accesstoken
            };

            // Gọi API tạo đơn hàng
            const response = await createOrder(orderData);
            
            if (response) {
                // Xóa giỏ hàng sau khi tạo đơn hàng thành công
                localStorage.removeItem('shopping_cart');
                
                // Chuyển hướng đến trang thành công
                navigate('/order-success');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!');
        }
    };

    return (
        <>
            <div className="section-title2">
                <h2 className="title">Billing details</h2>
            </div>
            <form onSubmit={handleSubmit} className="checkout-form learts-mb-50">
                <div className="row">
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdCountry">Country <abbr className="required">*</abbr></label>
                        <input 
                            type="text" 
                            id="bdCountry" 
                            className="form-control"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdStreet">Street address <abbr className="required">*</abbr></label>
                        <input 
                            type="text" 
                            id="bdStreet" 
                            className="form-control"
                            placeholder="House number and street name"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdNumber">Apartment, suite, unit etc. (optional)</label>
                        <input 
                            type="text" 
                            id="bdNumber" 
                            className="form-control"
                            value={formData.number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdCity">Town / City <abbr className="required">*</abbr></label>
                        <input 
                            type="text" 
                            id="bdCity" 
                            className="form-control"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdDistrict">District <abbr className="required">*</abbr></label>
                        <input 
                            type="text" 
                            id="bdDistrict" 
                            className="form-control"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdZip">Postcode / ZIP (optional)</label>
                        <input 
                            type="text" 
                            id="bdZip" 
                            className="form-control"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-6 col-12 learts-mb-20">
                        <label htmlFor="bdEmailAddress">Email address <abbr className="required">*</abbr></label>
                        <input 
                            type="email" 
                            id="bdEmailAddress" 
                            className="form-control"
                            value={formData.emailAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 col-12 learts-mb-30">
                        <label htmlFor="bdPhoneNumber">Phone <abbr className="required">*</abbr></label>
                        <input 
                            type="tel" 
                            id="bdPhoneNumber" 
                            className="form-control"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-12 learts-mb-20">
                        <label htmlFor="bdOrderNotes">Order Notes (optional)</label>
                        <textarea 
                            id="bdOrderNotes" 
                            className="form-control"
                            placeholder="Notes about your order, e.g. special notes for delivery."
                            value={formData.orderNotes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <div className="text-center">
                    <p className="payment-note">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                    <button type="submit" className="btn btn-dark btn-outline-hover-dark">Place order</button>
                </div>
            </form>
        </>
    );
};

export default BillingDetails; 