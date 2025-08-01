import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [data, setData] = useState({
    windowWidth: 1,
    windowHeight: 1,
    longestSide: 1,
    shortestSide: 1
  });

  useEffect(() => {
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

  return data;
};

export default useWindowSize;