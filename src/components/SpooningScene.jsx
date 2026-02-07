import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreathing } from '../hooks/useBreathing';

const SpooningScene = (props) => {
  const { onComplete } = props;
  console.log('SpooningScene props:', props);
  const [armTightness, setArmTightness] = useState(1);
  const { scale, opacity } = useBreathing(5000);
  const [starPositions, setStarPositions] = useState([]);

  useEffect(() => {
    // Generate random star positions
    const stars = [...Array(12)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setStarPositions(stars);

    // Arm tightening effect every few seconds
    const interval = setInterval(() => {
      setArmTightness(1.2);
      setTimeout(() => setArmTightness(1), 1000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    console.log('Continue clicked in SpooningScene');
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative vignette overflow-hidden">
      {/* Starry night background */}
      <div className="absolute inset-0">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute bg-warm-glow rounded-full"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Candle flicker effect */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-4 h-8 bg-gradient-to-t from-dim-amber to-warm-glow rounded-t-full blur-sm" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-rose-beige leading-relaxed">
            I'm behind you…<br />
            so you don't have to be<br />
            <span className="text-warm-glow">afraid of anything.</span>
          </h2>
        </motion.div>

        {/* Spooning couple animation */}
        <motion.div
          className="relative h-64 mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="relative">
            {/* Front person (being protected) */}
            <motion.div
              className="absolute left-0 bottom-0"
              style={{
                scale: scale * 0.9,
                opacity,
              }}
            >
              {/* Lying body */}
              <div className="w-32 h-16 bg-cocoa-light rounded-full relative">
                {/* Head */}
                <div className="absolute -left-4 top-0 w-12 h-12 bg-cocoa-light rounded-full" />
              </div>
            </motion.div>

            {/* Back person (protecting) */}
            <motion.div
              className="absolute left-4 bottom-0"
              style={{
                scale: scale * 1.1,
                opacity,
              }}
            >
              {/* Lying body */}
              <div className="w-36 h-18 bg-cocoa-light rounded-full relative">
                {/* Head */}
                <div className="absolute -left-4 top-0 w-12 h-12 bg-cocoa-light rounded-full" />
                {/* Protecting arm */}
                <motion.div
                  className="absolute -right-2 top-2 w-20 h-3 bg-cocoa-light origin-right"
                  animate={{
                    rotate: armTightness === 1.2 ? -5 : 0,
                    scaleX: armTightness,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Protection glow */}
            <motion.div
              className="absolute left-8 top-4 w-40 h-20 bg-warm-glow rounded-full opacity-20 blur-lg"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Protection indicator */}
        <motion.div
          className="mb-8"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-warm-glow text-sm">Feeling safe...</div>
        </motion.div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500"
        >
          Go deeper
        </button>
      </div>
    </div>
  );
};

export default SpooningScene;
