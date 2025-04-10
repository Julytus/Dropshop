import React from 'react';
import { useOffCanvas } from './OffCanvasContext';

const OffCanvasOverlay: React.FC = () => {
  const { activeOffCanvas, closeOffCanvas } = useOffCanvas();
  const isActive = activeOffCanvas !== null;

  return (
    <div 
      className={`offcanvas-overlay ${isActive ? 'active' : ''}`}
      onClick={closeOffCanvas}
    ></div>
  );
};

export default OffCanvasOverlay; 