import { useState, useEffect } from 'react';

export const useBreathing = (duration = 4000) => {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(1);
      setOpacity(0.8);
      
      setTimeout(() => {
        setScale(1.02);
        setOpacity(1);
      }, duration / 2);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return { scale, opacity };
};
