import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

// Import các components con
import MainMenu from './MainMenu';
import HeaderTools from './HeaderTools';
import OffcanvasSearch from './OffcanvasSearch';
import OffcanvasCart from './OffcanvasCart';
import OffcanvasMobileMenu from './OffcanvasMobileMenu';

const Header = () => {
    const [activeOffcanvas, setActiveOffcanvas] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Sử dụng useCallback để tránh tạo mới function khi re-render
    const handleOffcanvasOpen = useCallback((offcanvasId) => {
        setActiveOffcanvas(offcanvasId);
        document.body.classList.add('header-offcanvas-open');
    }, []);

    const handleOffcanvasClose = useCallback((e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setActiveOffcanvas(null);
        document.body.classList.remove('header-offcanvas-open');
    }, []);

    return (
        <div className="header-wrapper">
            {/* Normal Header */}
            <div className="header-section section section-fluid bg-white d-none d-xl-block">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <div className="header-logo">
                                <Link to="/"><img src="/assets/images/logo/logo-2.webp" alt="Shop Logo" /></Link>
                            </div>
                        </div>
                        <div className="col-auto me-auto">
                            <MainMenu />
                        </div>
                        <div className="col-auto">
                            <HeaderTools onOffcanvasOpen={handleOffcanvasOpen} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Header */}
            <div className={`sticky-header section bg-white section-fluid d-none d-xl-block ${isSticky ? 'is-sticky' : ''}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-auto col">
                            <div className="header-logo">
                                <Link to="/"><img src="/assets/images/logo/logo-2.webp" alt="Learts Logo" /></Link>
                            </div>
                        </div>
                        <div className="col-auto me-auto d-none d-xl-block">
                            <MainMenu />
                        </div>
                        <div className="col-auto">
                            <HeaderTools onOffcanvasOpen={handleOffcanvasOpen} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="mobile-header bg-white section d-xl-none">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="header-logo">
                                <Link to="/"><img src="/assets/images/logo/logo-2.webp" alt="Learts Logo" /></Link>
                            </div>
                        </div>
                        <div className="col-auto">
                            <HeaderTools isMobile={true} onOffcanvasOpen={handleOffcanvasOpen} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Header */}
            <div className={`mobile-header sticky-header bg-white section d-xl-none ${isSticky ? 'is-sticky' : ''}`}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="header-logo">
                                <Link to="/"><img src="/assets/images/logo/logo-2.webp" alt="Learts Logo" /></Link>
                            </div>
                        </div>
                        <div className="col-auto">
                            <HeaderTools isMobile={true} onOffcanvasOpen={handleOffcanvasOpen} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Offcanvas Components */}
            <OffcanvasSearch isOpen={activeOffcanvas === 'search'} onClose={handleOffcanvasClose} />
            <OffcanvasCart isOpen={activeOffcanvas === 'cart'} onClose={handleOffcanvasClose} />
            <OffcanvasMobileMenu isOpen={activeOffcanvas === 'mobile-menu'} onClose={handleOffcanvasClose} />

            {/* Offcanvas Overlay */}
            <div 
                className={`offcanvas-overlay ${activeOffcanvas ? 'offcanvas-open' : ''}`} 
                onClick={handleOffcanvasClose}
            ></div>
        </div>
    );
};

export default React.memo(Header);

