import React from 'react';

const OffcanvasMobileMenu = React.memo(({ isOpen, onClose }) => {
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(e);
    };

    const handleMenuExpand = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const target = e.currentTarget;
        const parent = target.closest('li');
        if (parent) {
            parent.classList.toggle('open');
            target.classList.toggle('active');
            const subMenu = parent.querySelector('.sub-menu');
            if (subMenu) {
                if (subMenu.style.display === 'block') {
                    subMenu.style.display = 'none';
                } else {
                    subMenu.style.display = 'block';
                }
            }
        }
    };

    const handleLinkClick = (e) => {
        // Chỉ ngăn chặn load lại trang cho các link thử nghiệm, không phải link thực tế
        if (e.currentTarget.getAttribute('href') === '#') {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <div id="offcanvas-mobile-menu" className={`offcanvas offcanvas-mobile-menu ${isOpen ? 'offcanvas-open' : ''}`}>
            <div className="inner customScroll">
                <div className="offcanvas-menu-search-form">
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Search..." />
                        <button onClick={(e) => e.preventDefault()}><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className="offcanvas-menu">
                    <ul>
                        <li>
                            <span className="menu-expand" onClick={handleMenuExpand}></span>
                            <a href="#" onClick={handleLinkClick}><span className="menu-text">Home</span></a>
                            <ul className="sub-menu">
                                <li>
                                    <span className="menu-expand" onClick={handleMenuExpand}></span>
                                    <a href="#" onClick={handleLinkClick}><span className="menu-text">Home Group</span></a>
                                    <ul className="sub-menu">
                                        <li><a href="index.html" onClick={handleLinkClick}><span className="menu-text">Arts Propelled</span></a></li>
                                        <li><a href="index-2.html" onClick={handleLinkClick}><span className="menu-text">Decor Thriving</span></a></li>
                                        <li><a href="index-3.html" onClick={handleLinkClick}><span className="menu-text">Savvy Delight</span></a></li>
                                        <li><a href="index-4.html" onClick={handleLinkClick}><span className="menu-text">Perfect Escapes</span></a></li>
                                    </ul>
                                </li>
                                {/* ... Các menu item khác tương tự ... */}
                            </ul>
                        </li>
                        {/* ... Các menu item khác tương tự ... */}
                    </ul>
                </div>
                <div className="offcanvas-buttons">
                    <div className="header-tools">
                        <div className="header-login">
                            <a href="my-account.html" onClick={handleLinkClick}><i className="far fa-user"></i></a>
                        </div>
                        <div className="header-cart">
                            <a href="shopping-cart.html" onClick={handleLinkClick}><span className="cart-count">3</span><i className="fas fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
                <div className="offcanvas-social">
                    <a href="#" onClick={handleLinkClick}><i className="fab fa-facebook-f"></i></a>
                    <a href="#" onClick={handleLinkClick}><i className="fab fa-twitter"></i></a>
                    <a href="#" onClick={handleLinkClick}><i className="fab fa-instagram"></i></a>
                    <a href="#" onClick={handleLinkClick}><i className="fab fa-youtube"></i></a>
                </div>
                <button className="offcanvas-close" onClick={handleClose}>×</button>
            </div>
        </div>
    );
});

export default OffcanvasMobileMenu; 