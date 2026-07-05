import React, { useEffect, useState } from 'react';

const DynamicCursor = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Handle both mouse and touch events
    const updatePosition = (clientX, clientY) => {
      setPosition({ x: clientX, y: clientY });
    };

    const handleMouseMove = (e) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleStart = () => {
      setIsClicking(true);
    };

    const handleEnd = () => {
      setIsClicking(false);
    };

    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mouseup', handleEnd);

    // Touch events
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleStart);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchend', handleEnd);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const cursorStyle = {
    position: 'fixed',
    left: position.x - (isMobile ? 20 : 16),
    top: position.y - (isMobile ? 20 : 16),
    width: isMobile ? '40px' : '32px',
    height: isMobile ? '40px' : '32px',
    backgroundImage: `url('${isClicking ? '/cursor1.png' : '/cursor.png'}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    pointerEvents: 'none',
    zIndex: 999999,
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform',
    opacity: isMobile ? 0.9 : 1,
  };

  return <div style={cursorStyle} className="dynamic-cursor-react" />;
};

export default DynamicCursor;