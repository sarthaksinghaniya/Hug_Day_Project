import { useState, useEffect } from 'react';

export const useProximity = (threshold = 0.8) => {
  const [isNear, setIsNear] = useState(false);
  const [distance, setDistance] = useState(1);

  const updateDistance = (newDistance) => {
    setDistance(newDistance);
    setIsNear(newDistance >= threshold);
  };

  return { isNear, distance, updateDistance };
};
