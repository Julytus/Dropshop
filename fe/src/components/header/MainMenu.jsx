import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = React.memo(() => {
    return (
        <nav className="site-main-menu site-main-menu-left justify-content-center" style={{ position: 'relative' }}>
            <ul>

                {/* Elements Menu */}
                <li className="has-children">
                    <Link to="#"><span className="menu-text">Elements</span></Link>
                    <ul className="sub-menu mega-menu">
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">Column One</span></Link>
                            <ul>
                                <li><Link to="/elements-products"><span className="menu-text">Product Styles</span></Link></li>
                                <li><Link to="/elements-products-tabs"><span className="menu-text">Product Tabs</span></Link></li>
                                <li><Link to="/elements-product-sale-banner"><span className="menu-text">Product & Sale Banner</span></Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">Column Two</span></Link>
                            <ul>
                                <li><Link to="/elements-category-banner"><span className="menu-text">Category Banner</span></Link></li>
                                <li><Link to="/elements-team"><span className="menu-text">Team Member</span></Link></li>
                                <li><Link to="/elements-testimonials"><span className="menu-text">Testimonials</span></Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">Column Three</span></Link>
                            <ul>
                                <li><Link to="/elements-instagram"><span className="menu-text">Instagram</span></Link></li>
                                <li><Link to="/elements-map"><span className="menu-text">Google Map</span></Link></li>
                                <li><Link to="/elements-icon-box"><span className="menu-text">Icon Box</span></Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">Column Four</span></Link>
                            <ul>
                                <li><Link to="/elements-buttons"><span className="menu-text">Buttons</span></Link></li>
                                <li><Link to="/elements-faq"><span className="menu-text">FAQs / Toggles</span></Link></li>
                                <li><Link to="/elements-brands"><span className="menu-text">Brands</span></Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                {/* Pages Menu */}
                <li className="has-children">
                    <Link to="#"><span className="menu-text">Pages</span></Link>
                    <ul className="sub-menu">
                        <li><Link to="/about-us"><span className="menu-text">About us</span></Link></li>
                        <li><Link to="/about-us-2"><span className="menu-text">About us 02</span></Link></li>
                        <li><Link to="/contact-us"><span className="menu-text">Contact us</span></Link></li>
                        <li><Link to="/coming-soon"><span className="menu-text">Coming Soon</span></Link></li>
                        <li><Link to="/404"><span className="menu-text">Page 404</span></Link></li>
                    </ul>
                </li>
 
            </ul>
        </nav>
    );
});

export default MainMenu; 