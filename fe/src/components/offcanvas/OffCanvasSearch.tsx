import React from 'react';
import { useOffCanvas } from './OffCanvasContext';

const OffCanvasSearch: React.FC = () => {
  const { activeOffCanvas, closeOffCanvas } = useOffCanvas();
  const isActive = activeOffCanvas === 'search';

  return (
    <div id="offcanvas-search" className={`offcanvas offcanvas-search ${isActive ? 'offcanvas-open' : ''}`}>
      <div className="inner">
        <div className="offcanvas-search-form">
          <button className="offcanvas-close" onClick={closeOffCanvas}>×</button>
          <form action="#">
            <div className="row mb-n3">
              <div className="col-lg-8 col-12 mb-3">
                <input type="text" placeholder="Search Products..." />
              </div>
              <div className="col-lg-4 col-12 mb-3">
                <select className="search-select select2-basic">
                  <option value="0">All Categories</option>
                  <option value="kids-babies">Kids &amp; Babies</option>
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
};

export default OffCanvasSearch; 