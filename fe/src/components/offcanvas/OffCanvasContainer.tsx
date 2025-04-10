import React from 'react';
import OffCanvasSearch from './OffCanvasSearch';
import OffCanvasWishlist from './OffCanvasWishlist';
import OffCanvasCart from './OffCanvasCart';
import OffCanvasOverlay from './OffCanvasOverlay';

const OffCanvasContainer: React.FC = () => {
  return (
    <>
      {/* OffCanvas Search */}
      <OffCanvasSearch />
      
      {/* OffCanvas Wishlist */}
      <OffCanvasWishlist />
      
      {/* OffCanvas Cart */}
      <OffCanvasCart />

      {/* OffCanvas Overlay */}
      <OffCanvasOverlay />
    </>
  );
};

export default OffCanvasContainer; 