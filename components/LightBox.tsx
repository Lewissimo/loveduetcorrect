import React from 'react'
import ReactDOM from 'react-dom';

interface LightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
  }
  
  export const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => (
    ReactDOM.createPortal(
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        cursor: 'pointer'
      }} onClick={onClose}>
        <img src={src} alt={alt} style={{ maxHeight: '90%', maxWidth: '90%' }} />
      </div>,
      document.body
    )
  );
  