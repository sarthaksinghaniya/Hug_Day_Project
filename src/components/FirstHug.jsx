import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreathing } from '../hooks/useBreathing';

const FirstHug = (props) => {
  const { onComplete } = props;
  console.log('FirstHug props:', props);
  console.log('onComplete function:', onComplete);
  const [stage, setStage] = useState('approaching');
  const [showHug, setShowHug] = useState(false);
  const { scale, opacity } = useBreathing(4000);

  const handleHug = () => {
    setStage('consent');
    setTimeout(() => {
      setStage('hugging');
      setShowHug(true);
    }, 2000); // Micro-pause for consent moment
  };

  const handleContinue = () => {
    console.log('Continue clicked in FirstHug');
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative vignette">
      {/* 3D-like Scene Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-4xl h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {/* Simple depth representation */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-glow via-opacity-10 to-transparent" />
        </motion.div>
      </div>

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warm-glow via-opacity-5 to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-rose-beige leading-relaxed drop-shadow-glow">
            Some hugs don't make a sound…<br />
            they just say —<br />
            <span className="text-warm-glow">I'm here.</span>
          </h2>
        </motion.div>

        {/* 2D Couple Animation */}
        <motion.div
          className="relative h-64 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
        >
          {/* Left person */}
          <motion.div
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2"
            animate={{
              x: stage === 'hugging' ? 40 : 0,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <motion.div
              style={{ scale, opacity }}
              className="w-20 h-40 bg-cocoa-light rounded-t-full relative shadow-glow"
            >
              {/* Arms */}
              <motion.div
                className="absolute -right-8 top-8 w-16 h-2 bg-cocoa-light origin-left"
                animate={{
                  rotate: stage === 'hugging' ? 30 : 0,
                }}
                transition={{ duration: 3, delay: stage === 'hugging' ? 1 : 0, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Right person */}
          <motion.div
            className="absolute right-1/4 top-1/2 transform -translate-y-1/2"
            animate={{
              x: stage === 'hugging' ? -40 : 0,
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <motion.div
              style={{ scale, opacity }}
              className="w-20 h-40 bg-cocoa-light rounded-t-full relative shadow-glow"
            >
              {/* Arms */}
              <motion.div
                className="absolute -left-8 top-8 w-16 h-2 bg-cocoa-light origin-right"
                animate={{
                  rotate: stage === 'hugging' ? -30 : 0,
                }}
                transition={{ duration: 3, delay: stage === 'hugging' ? 1 : 0, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Hug glow effect */}
          <AnimatePresence>
            {showHug && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.8, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-warm-glow rounded-full blur-xl pulse-glow"
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Interactive button */}
        <AnimatePresence mode="wait">
          {stage === 'approaching' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleHug}
              className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500"
            >
              Give the first hug
            </motion.button>
          )}

          {stage === 'consent' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-warm-glow text-lg animate-pulse"
            >
              ...wait a moment...
            </motion.div>
          )}

          {stage === 'hugging' && (
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              onClick={handleContinue}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500 shadow-glow"
            >
              Continue
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FirstHug;
