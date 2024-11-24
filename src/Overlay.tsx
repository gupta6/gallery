import React from 'react';
import style from './Overlay.module.css';

type OverlayProps = {
  isVisible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isVisible, children }) => {
  if (!isVisible) return null; 

  return (
    <div className={style.overlay}>
      <div className={style.overlayContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
