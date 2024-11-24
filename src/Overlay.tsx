import React, { useEffect } from "react";
import style from "./Overlay.module.css";

type OverlayProps = {
  isVisible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isVisible) return null; 

  return (
    <div
      className={style.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => e.key === "Escape" && onClose?.()}
      tabIndex={-1}
    >
      <div
        className={style.overlayContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Overlay;
