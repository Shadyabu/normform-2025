import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [data, setData] = useState({
    windowWidth: 0,
    windowHeight: 0,
    longestSide: 0,
    shortestSide: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleWindowResize = () => {
      setData({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        longestSide: Math.max(window.innerWidth, window.innerHeight),
        shortestSide: Math.min(window.innerWidth, window.innerHeight)
      });
    }
    if (typeof window !== 'undefined') {
      handleWindowResize();
      window.addEventListener('resize', handleWindowResize);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleWindowResize);
      }
    }
  }, []);

  // Return default values during SSR to prevent hydration mismatch
  if (!mounted) {
    return {
      windowWidth: 0,
      windowHeight: 0,
      longestSide: 0,
      shortestSide: 0
    };
  }

  return data;
};

export default useWindowSize;