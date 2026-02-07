import { useState, useEffect } from 'react';

export const useHeartbeat = (duration = 3000) => {
  const [heartbeat, setHeartbeat] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(1);
      
      setTimeout(() => setHeartbeat(1.05), duration * 0.1);
      setTimeout(() => setHeartbeat(1), duration * 0.2);
      setTimeout(() => setHeartbeat(1.03), duration * 0.3);
      setTimeout(() => setHeartbeat(1), duration * 0.4);
    }, duration);

    return () => clearInterval(interval);
  }, [duration]);

  return heartbeat;
};
