import React, { createContext, useContext, useState, ReactNode } from 'react';

type OffCanvasType = 'search' | 'wishlist' | 'cart' | null;

interface OffCanvasContextType {
  activeOffCanvas: OffCanvasType;
  openOffCanvas: (type: OffCanvasType) => void;
  closeOffCanvas: () => void;
}

const OffCanvasContext = createContext<OffCanvasContextType | undefined>(undefined);

interface OffCanvasProviderProps {
  children: ReactNode;
}

export const OffCanvasProvider: React.FC<OffCanvasProviderProps> = ({ children }) => {
  const [activeOffCanvas, setActiveOffCanvas] = useState<OffCanvasType>(null);

  // Mở offcanvas theo loại
  const openOffCanvas = (type: OffCanvasType) => {
    setActiveOffCanvas(type);
    document.body.classList.add('offcanvas-open');
  };

  // Đóng offcanvas
  const closeOffCanvas = () => {
    setActiveOffCanvas(null);
    document.body.classList.remove('offcanvas-open');
  };

  return (
    <OffCanvasContext.Provider value={{ activeOffCanvas, openOffCanvas, closeOffCanvas }}>
      {children}
    </OffCanvasContext.Provider>
  );
};

// Hook để sử dụng offcanvas context
export const useOffCanvas = (): OffCanvasContextType => {
  const context = useContext(OffCanvasContext);
  if (!context) {
    throw new Error('useOffCanvas must be used within an OffCanvasProvider');
  }
  return context;
}; 