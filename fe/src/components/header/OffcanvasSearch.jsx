import React from 'react';

const OffcanvasSearch = React.memo(({ isOpen, onClose }) => {
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose(e);
    };

    return (
        <div id="offcanvas-search" className={`offcanvas offcanvas-search ${isOpen ? 'offcanvas-open' : ''}`}>
            <div className="inner">
                <div className="offcanvas-search-form">
                    <button className="offcanvas-close" onClick={handleClose}>×</button>
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                        <div className="row mb-n3">
                            <div className="col-lg-8 col-12 mb-3">
                                <input type="text" placeholder="Search Products..." />
                            </div>
                            <div className="col-lg-4 col-12 mb-3">
                                <select className="search-select">
                                    <option value="0">All Categories</option>
                                    <option value="kids-babies">Kids & Babies</option>
                                    <option value="home-decor">Home Decor</option>
                                    <option value="gift-ideas">Gift ideas</option>
                                    <option value="kitchen">Kitchen</option>
                                    <option value="toys">Toys</option>
                                    <option value="kniting-sewing">Kniting & Sewing</option>
                                    <option value="pots">Pots</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <p className="search-description text-body-light mt-2">
                    <span># Type at least 1 character to search</span>
                    <span># Hit enter to search or ESC to close</span>
                </p>
            </div>
        </div>
    );
});

export default OffcanvasSearch; 