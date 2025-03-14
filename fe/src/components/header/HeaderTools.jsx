import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const MobileMenuToggle = ({ onClick }) => (
    <a href="#" onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
    }} className="offcanvas-toggle">
        <svg viewBox="0 0 800 600">
            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" className="top"></path>
            <path d="M300,320 L540,320" className="middle"></path>
            <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" className="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318)"></path>
        </svg>
    </a>
);

const HeaderTools = React.memo(({ isMobile = false, onOffcanvasOpen }) => {
    // Sử dụng refs để lưu trữ các hiệu ứng ripple element
    const rippleRefs = useRef({});
    
    const handleOffcanvasClick = (offcanvasId, e) => {
        // Ngăn chặn hành vi mặc định và sự kiện bubbling
        e.preventDefault();
        e.stopPropagation();
        
        // Thay vì tạo một DOM element mới cho ripple, sử dụng tham chiếu cố định
        // để tránh tạo quá nhiều DOM elements
        const targetElement = e.currentTarget;
        const rippleKey = `${offcanvasId}-ripple`;
        
        // Nếu chưa có ripple element, tạo một cái và lưu vào refs
        if (!rippleRefs.current[rippleKey]) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            rippleRefs.current[rippleKey] = ripple;
        }
        
        const ripple = rippleRefs.current[rippleKey];
        
        // Xóa ripple khỏi DOM nếu đã có
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
        
        // Add ripple effect cho better UX
        const rect = targetElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Thêm vào DOM
        targetElement.appendChild(ripple);
        
        // Clean up effect sau khi hoàn tất
        setTimeout(() => {
            if (ripple.parentNode === targetElement) {
                targetElement.removeChild(ripple);
            }
        }, 600);
        
        // Kích hoạt offcanvas sau một chút delay để hoàn tất hiệu ứng
        setTimeout(() => {
            onOffcanvasOpen(offcanvasId);
        }, 50);
    };

    return (
        <div className="header-tools justify-content-end">
            <div className={`header-login ${isMobile ? 'd-none d-sm-block' : ''}`}>
                <Link to="/my-account"><i className="far fa-user"></i></Link>
            </div>
            <div className={`header-search ${isMobile ? 'd-none d-sm-block' : ''}`}>
                <a href="#" onClick={(e) => handleOffcanvasClick('search', e)} className="offcanvas-toggle">
                    <i className="fas fa-search"></i>
                </a>
            </div>
            <div className={`header-wishlist ${isMobile ? 'd-none d-sm-block' : ''}`}>
                <a href="#" onClick={(e) => handleOffcanvasClick('wishlist', e)} className="offcanvas-toggle">
                    <span className="wishlist-count">3</span>
                    <i className="far fa-heart"></i>
                </a>
            </div>
            <div className="header-cart">
                <a href="#" onClick={(e) => handleOffcanvasClick('cart', e)} className="offcanvas-toggle">
                    <span className="cart-count">3</span>
                    <i className="fas fa-shopping-cart"></i>
                </a>
            </div>
            {isMobile && (
                <div className="mobile-menu-toggle">
                    <MobileMenuToggle onClick={(e) => handleOffcanvasClick('mobile-menu', e)} />
                </div>
            )}
        </div>
    );
});

export default HeaderTools; 