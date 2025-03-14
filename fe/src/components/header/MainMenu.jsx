import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = React.memo(() => {
    return (
        <nav className="site-main-menu site-main-menu-left justify-content-center" style={{ position: 'relative' }}>
            <ul>
                <li className="has-children">
                    <Link to="#"><span className="menu-text">Home</span></Link>
                    <ul className="sub-menu mega-menu">
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">HOME GROUP</span></Link>
                            <ul>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-01.webp" alt="home-01" />
                                    <Link to="/"><span className="menu-text">Arts Propelled</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-02.webp" alt="home-02" />
                                    <Link to="/index-2"><span className="menu-text">Decor Thriving</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-03.webp" alt="home-03" />
                                    <Link to="/index-3"><span className="menu-text">Savvy Delight</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-04.webp" alt="home-04" />
                                    <Link to="/index-4"><span className="menu-text">Perfect Escapes</span></Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/index-2" className="mega-menu-title"><span className="menu-text">HOME GROUP</span></Link>
                            <ul>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-05.webp" alt="home-05" />
                                    <Link to="/index-5"><span className="menu-text">Kitchen Cozy</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-06.webp" alt="home-06" />
                                    <Link to="/index-6"><span className="menu-text">Dreamy Designs</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-07.webp" alt="home-07" />
                                    <Link to="/index-7"><span className="menu-text">Crispy Recipes</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-08.webp" alt="home-08" />
                                    <Link to="/index-8"><span className="menu-text">Decoholic Chic</span></Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/index-2" className="mega-menu-title"><span className="menu-text">HOME GROUP</span></Link>
                            <ul>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-9.webp" alt="home-9" />
                                    <Link to="/index-9"><span className="menu-text">Reblended Dish</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-10.webp" alt="home-10" />
                                    <Link to="/index-10"><span className="menu-text">Craftin House</span></Link>
                                </li>
                                <li>
                                    <img className="mmh_img" src="/assets/images/demo/menu/home-11.webp" alt="home-11" />
                                    <Link to="/index-11"><span className="menu-text">Craftswork Biz</span></Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="menu-banner">
                                <img src="/assets/images/banner/menu-banner-1.webp" alt="Home Menu Banner" />
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* Shop Menu */}
                <li className="has-children">
                    <Link to="#"><span className="menu-text">Shop</span></Link>
                    <ul className="sub-menu mega-menu">
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">SHOP PAGES</span></Link>
                            <ul>
                                <li><Link to="/shop"><span className="menu-text">Shop No Sidebar</span></Link></li>
                                <li><Link to="/shop-left-sidebar"><span className="menu-text">Shop Left Sidebar</span></Link></li>
                                <li><Link to="/shop-right-sidebar"><span className="menu-text">Shop Right Sidebar</span></Link></li>
                                <li><Link to="/shop-fullwidth-no-gutters"><span className="menu-text">Shop Fullwidth No Space</span></Link></li>
                                <li><Link to="/shop-fullwidth"><span className="menu-text">Shop Fullwidth No Sidebar</span></Link></li>
                                <li><Link to="/shop-fullwidth-left-sidebar"><span className="menu-text">Shop Fullwidth Left Sidebar</span></Link></li>
                                <li><Link to="/shop-fullwidth-right-sidebar"><span className="menu-text">Shop Fullwidth Right Sidebar</span></Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">PRODUCT PAGES</span></Link>
                            <ul>
                                <li><Link to="/product-details"><span className="menu-text">Basic</span></Link></li>
                                <li><Link to="/product-details-fullwidth"><span className="menu-text">Fullwidth</span></Link></li>
                                <li><Link to="/product-details-sticky"><span className="menu-text">Sticky Details</span></Link></li>
                                <li><Link to="/product-details-sidebar"><span className="menu-text">Width Sidebar</span></Link></li>
                                <li><Link to="/product-details-extra-content"><span className="menu-text">Extra Content</span></Link></li>
                                <li><Link to="/product-details-image-variation"><span className="menu-text">Variations Images</span></Link></li>
                                <li><Link to="/product-details-group"><span className="menu-text">Bought Together</span></Link></li>
                                <li><Link to="/product-details-360"><span className="menu-text">Product 360</span></Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="mega-menu-title"><span className="menu-text">PRODUCT & Other PAGES</span></Link>
                            <ul>
                                <li><Link to="/product-details-background"><span className="menu-text">Product with Background</span></Link></li>
                                <li><Link to="/shopping-cart"><span className="menu-text">Shopping Cart</span></Link></li>
                                <li><Link to="/checkout"><span className="menu-text">Checkout</span></Link></li>
                                <li><Link to="/order-tracking"><span className="menu-text">Order Tracking</span></Link></li>
                                <li><Link to="/wishlist"><span className="menu-text">Wishlist</span></Link></li>
                                <li><Link to="/login-register"><span className="menu-text">Customer Login</span></Link></li>
                                <li><Link to="/my-account"><span className="menu-text">My Account</span></Link></li>
                                <li><Link to="/lost-password"><span className="menu-text">Lost Password</span></Link></li>
                            </ul>
                        </li>
                        <li className="align-self-center">
                            <Link to="#" className="menu-banner">
                                <img src="/assets/images/banner/menu-banner-2.webp" alt="Shop Menu Banner" />
                            </Link>
                        </li>
                    </ul>
                </li>
                {/* Project Menu */}
                <li className="has-children">
                    <Link to="#"><span className="menu-text">Project</span></Link>
                    <ul className="sub-menu">
                        <li><Link to="/portfolio-3-columns"><span className="menu-text">Portfolio 3 Columns</span></Link></li>
                        <li><Link to="/portfolio-4-columns"><span className="menu-text">Portfolio 4 Columns</span></Link></li>
                        <li><Link to="/portfolio-5-columns"><span className="menu-text">Portfolio 5 Columns</span></Link></li>
                        <li><Link to="/portfolio-details"><span className="menu-text">Portfolio Details</span></Link></li>
                    </ul>
                </li>
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
                {/* Blog Menu */}
                <li className="has-children">
                    <Link to="#"><span className="menu-text">Blog</span></Link>
                    <ul className="sub-menu">
                        <li className="has-children">
                            <Link to="/blog-right-sidebar"><span className="menu-text">Standard Layout</span></Link>
                            <ul className="sub-menu">
                                <li><Link to="/blog-right-sidebar"><span className="menu-text">Right Sidebar</span></Link></li>
                                <li><Link to="/blog-left-sidebar"><span className="menu-text">Left Sidebar</span></Link></li>
                                <li><Link to="/blog-fullwidth"><span className="menu-text">Full Width</span></Link></li>
                            </ul>
                        </li>
                        <li className="has-children">
                            <Link to="/blog-grid-right-sidebar"><span className="menu-text">Grid Layout</span></Link>
                            <ul className="sub-menu">
                                <li><Link to="/blog-grid-right-sidebar"><span className="menu-text">Right Sidebar</span></Link></li>
                                <li><Link to="/blog-grid-left-sidebar"><span className="menu-text">Left Sidebar</span></Link></li>
                                <li><Link to="/blog-grid-fullwidth"><span className="menu-text">Full Width</span></Link></li>
                            </ul>
                        </li>
                        <li className="has-children">
                            <Link to="/blog-list-right-sidebar"><span className="menu-text">List Layout</span></Link>
                            <ul className="sub-menu">
                                <li><Link to="/blog-list-right-sidebar"><span className="menu-text">Right Sidebar</span></Link></li>
                                <li><Link to="/blog-list-left-sidebar"><span className="menu-text">Left Sidebar</span></Link></li>
                                <li><Link to="/blog-list-fullwidth"><span className="menu-text">Full Width</span></Link></li>
                            </ul>
                        </li>
                        <li className="has-children">
                            <Link to="/blog-masonry-right-sidebar"><span className="menu-text">Masonry Layout</span></Link>
                            <ul className="sub-menu">
                                <li><Link to="/blog-masonry-right-sidebar"><span className="menu-text">Right Sidebar</span></Link></li>
                                <li><Link to="/blog-masonry-left-sidebar"><span className="menu-text">Left Sidebar</span></Link></li>
                                <li><Link to="/blog-masonry-fullwidth"><span className="menu-text">Full Width</span></Link></li>
                            </ul>
                        </li>
                        <li className="has-children">
                            <Link to="/blog-details-right-sidebar"><span className="menu-text">Single Post Layout</span></Link>
                            <ul className="sub-menu">
                                <li><Link to="/blog-details-right-sidebar"><span className="menu-text">Right Sidebar</span></Link></li>
                                <li><Link to="/blog-details-left-sidebar"><span className="menu-text">Left Sidebar</span></Link></li>
                                <li><Link to="/blog-details-fullwidth"><span className="menu-text">Full Width</span></Link></li>
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