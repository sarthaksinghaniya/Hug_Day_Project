import { useState, useEffect, useRef } from 'react';

export const useHeartbeat = (duration = 3000) => {
  const [heartbeat, setHeartbeat] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create heartbeat sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext());
    
    const createHeartbeat = (startTime) => {
      // First beat (lub)
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      
      osc1.frequency.setValueAtTime(60, startTime);
      gain1.gain.setValueAtTime(0, startTime);
      gain1.gain.linearRampToValueAtTime(0.8, startTime + 0.01); // 4x volume
      gain1.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      
      osc1.start(startTime);
      osc1.stop(startTime + 0.1);
      
      // Second beat (dub)
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      
      osc2.frequency.setValueAtTime(80, startTime + 0.15);
      gain2.gain.setValueAtTime(0, startTime + 0.15);
      gain2.gain.linearRampToValueAtTime(0.6, startTime + 0.16); // 4x volume
      gain2.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
      
      osc2.start(startTime + 0.15);
      osc2.stop(startTime + 0.25);
    };

    const interval = setInterval(() => {
      const now = audioContext.currentTime;
      createHeartbeat(now);
    }, duration);

    audioRef.current = { audioContext, interval };

    return () => {
      clearInterval(interval);
    };
  }, [duration]);

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
