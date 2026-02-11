import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreathing } from '../hooks/useBreathing';

const CuddleScene = (props) => {
  const { onComplete } = props;
  console.log('CuddleScene props:', props);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const { scale, opacity } = useBreathing(6000);
  const [blanketWrap, setBlanketWrap] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlanketWrap(1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleContinue = () => {
    console.log('Continue clicked in CuddleScene');
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative vignette overflow-hidden">
      {/* Blanket gradient wrap effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: blanketWrap * 0.3 }}
        transition={{ duration: 3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-soft-peach via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-soft-peach via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-soft-peach via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-soft-peach via-transparent to-transparent" />
      </motion.div>

      {/* Ambient warmth particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-warm-glow rounded-full opacity-20 blur-sm"
            animate={{
              y: [window.innerHeight, -100],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-rose-beige leading-relaxed drop-shadow-glow">
            Embrace like this<br />
            as if for a little while<br />
            <span className="text-warm-glow">the world needs to stay outside.</span>
          </h2>
        </motion.div>

        {/* Cuddling couple animation */}
        <motion.div
          className="relative h-80 mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Sitting couple */}
          <div className="relative">
            {/* Person leaning (left) */}
            <motion.div
              className="absolute left-0 bottom-0"
              style={{
                scale: scale * 0.9,
                opacity,
              }}
            >
              <div className="w-16 h-24 bg-cocoa-light rounded-t-full relative shadow-glow">
                {/* Head on shoulder effect */}
                <motion.div
                  className="absolute -right-2 top-0 w-8 h-8 bg-cocoa-light rounded-full"
                  animate={{
                    y: breathingPhase === 'inhale' ? -2 : 0,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
              {/* Body */}
              <div className="w-16 h-20 bg-cocoa-light rounded-b-lg" />
            </motion.div>

            {/* Person being leaned on (right) */}
            <motion.div
              className="absolute left-12 bottom-0"
              style={{
                scale: scale * 1.1,
                opacity,
              }}
            >
              <div className="w-20 h-28 bg-cocoa-light rounded-t-full relative shadow-glow">
                {/* Shoulder */}
                <div className="absolute -left-4 top-4 w-8 h-4 bg-cocoa-light rounded-full" />
              </div>
              {/* Body */}
              <div className="w-20 h-24 bg-cocoa-light rounded-b-lg" />
            </motion.div>

            {/* Breathing chest effect */}
            <motion.div
              className="absolute left-8 bottom-20 w-24 h-8 bg-warm-glow rounded-full opacity-20 blur-md"
              animate={{
                scaleY: breathingPhase === 'inhale' ? 1.3 : 0.8,
                opacity: breathingPhase === 'inhale' ? 0.4 : 0.2,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          onClick={handleContinue}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500 shadow-glow"
        >
          Come closer
        </motion.button>
      </div>

      {/* Breathing indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-warm-glow text-sm">Breathing...</div>
      </motion.div>
    </div>
  );
};

export default CuddleScene;
