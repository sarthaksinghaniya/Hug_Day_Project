import { useState, useEffect, useRef } from 'react';

export const useBreathing = (duration = 6000) => {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(0.8);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create breathing sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create multiple oscillators for more natural breathing sound
    const createBreathCycle = (startTime) => {
      // Main breath sound (low frequency, like air movement)
      const breathOsc = audioContext.createOscillator();
      const breathGain = audioContext.createGain();
      breathOsc.connect(breathGain);
      breathGain.connect(audioContext.destination);
      
      // Use sine wave for softer sound, lower frequency
      breathOsc.type = 'sine';
      breathOsc.frequency.setValueAtTime(40, startTime); // Much lower frequency
      
      // Add some noise for more natural sound
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = audioContext.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      const noiseGain = audioContext.createGain();
      noiseSource.connect(noiseGain);
      noiseGain.connect(audioContext.destination);
      
      // Create breathing envelope (softer, more gradual)
      const now = startTime;
      
      // Inhale phase (gradual increase)
      breathGain.gain.setValueAtTime(0, now);
      breathGain.gain.linearRampToValueAtTime(0.005, now + 1.0); // Almost silent inhale
      breathGain.gain.linearRampToValueAtTime(0.003, now + 1.5); // Hold
      breathGain.gain.linearRampToValueAtTime(0, now + 2.0); // Exhale
      
      // Noise envelope (quieter, for texture)
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.linearRampToValueAtTime(0.001, now + 1.0); // Completely silent noise
      noiseGain.gain.linearRampToValueAtTime(0.0005, now + 1.0);
      noiseGain.gain.linearRampToValueAtTime(0, now + 2.0);
      
      // Add slight frequency modulation for more natural sound
      breathOsc.frequency.linearRampToValueAtTime(45, now + 1.0);
      breathOsc.frequency.linearRampToValueAtTime(35, now + 2.0);
      
      breathOsc.start(now);
      breathOsc.stop(now + 2.0);
      noiseSource.start(now);
      noiseSource.stop(now + 2.0);
    };
    
    // Start first breath cycle immediately
    createBreathCycle(audioContext.currentTime);
    
    // Repeat breathing cycle
    const interval = setInterval(() => {
      createBreathCycle(audioContext.currentTime);
    }, duration);
    
    audioRef.current = { audioContext, interval };
    
    return () => {
      clearInterval(interval);
    };
  }, []);

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
