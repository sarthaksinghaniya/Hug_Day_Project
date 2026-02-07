import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeartbeat } from '../hooks/useHeartbeat';

const HeartbeatScene = (props) => {
  const { onComplete } = props;
  console.log('HeartbeatScene props:', props);
  const [isPressed, setIsPressed] = useState(false);
  const [warmth, setWarmth] = useState(0.3);
  const [pressDuration, setPressDuration] = useState(0);
  const heartbeat = useHeartbeat(3000);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    let interval;
    if (isPressed) {
      interval = setInterval(() => {
        setPressDuration(prev => prev + 100);
        setWarmth(prev => Math.min(1, prev + 0.05));
      }, 100);
    } else {
      // Slowly fade warmth when released
      const fadeInterval = setInterval(() => {
        setWarmth(prev => Math.max(0.3, prev - 0.02));
      }, 200);
      return () => clearInterval(fadeInterval);
    }

    return () => clearInterval(interval);
  }, [isPressed]);

  useEffect(() => {
    if (pressDuration > 2000) {
      setShowContinue(true);
    }
  }, [pressDuration]);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setPressDuration(0);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsPressed(true);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsPressed(false);
    setPressDuration(0);
  };

  const handleContinue = () => {
    console.log('Continue clicked in HeartbeatScene');
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative vignette overflow-hidden">
      {/* Pulsating background glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(255, 143, 0, ${warmth * 0.2}) 0%, transparent 70%)`,
        }}
      />

      {/* Heart particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-warm-glow opacity-30"
            animate={{
              y: [-100, window.innerHeight + 100],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-rose-beige leading-relaxed">
            In this hug there's no promise…<br />
            just this belief<br />
            <span className="text-warm-glow">that you are okay.</span>
          </h2>
        </motion.div>

        {/* Interactive heart hug */}
        <motion.div
          className="relative h-64 mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.div
            className="relative cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ scale: heartbeat }}
            whileHover={{ scale: heartbeat * 1.05 }}
            whileTap={{ scale: heartbeat * 0.95 }}
          >
            {/* Heart shape */}
            <div className="relative">
              {/* Left curve */}
              <motion.div 
                className="absolute w-16 h-16 bg-warm-glow rounded-full shadow-glow"
                style={{ 
                  clipPath: 'ellipse(50% 50% at 50% 50%)',
                  left: '0px',
                  top: '8px'
                }}
                animate={{
                  scale: heartbeat,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {/* Right curve */}
              <motion.div 
                className="absolute w-16 h-16 bg-warm-glow rounded-full shadow-glow"
                style={{ 
                  clipPath: 'ellipse(50% 50% at 50% 50%)',
                  right: '0px',
                  top: '8px'
                }}
                animate={{
                  scale: heartbeat,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              {/* Bottom point */}
              <motion.div 
                className="absolute w-12 h-12 bg-warm-glow rounded-full shadow-glow"
                style={{ 
                  clipPath: 'ellipse(50% 50% at 50% 100%)',
                  left: '10px',
                  bottom: '0px'
                }}
                animate={{
                  scale: heartbeat * 1.1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{
                opacity: isPressed ? warmth * 0.8 : warmth * 0.4,
                scale: isPressed ? 1.5 : 1.2,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-40 h-40 bg-warm-glow rounded-full blur-2xl pulse-glow" />
            </motion.div>

            {/* Pulse rings */}
            {isPressed && (
              <>
                <motion.div
                  className="absolute inset-0 w-32 h-32 border-2 border-warm-glow rounded-full"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 w-32 h-32 border-2 border-warm-glow rounded-full"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Interaction feedback */}
        <AnimatePresence mode="wait">
          {isPressed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <div className="text-warm-glow text-lg">
                {pressDuration < 1000 ? "Keep pressing..." : "Very good..."}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warmth indicator */}
        <motion.div
          className="mb-8 h-2 bg-intimate-dark bg-opacity-50 rounded-full overflow-hidden max-w-xs mx-auto"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-warm-glow to-candle-light"
            animate={{ width: `${warmth * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Continue button */}
        <AnimatePresence>
          {showContinue && (
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500"
            >
              Go to final stage
            </button>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      {!showContinue && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-warm-glow text-sm">Press and hold the heart...</div>
        </motion.div>
      )}
    </div>
  );
};

export default HeartbeatScene;
