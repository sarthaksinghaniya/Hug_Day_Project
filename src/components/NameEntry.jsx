import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProximity } from '../hooks/useProximity';

const NameEntry = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [showNext, setShowNext] = useState(false);
  const { isNear, distance, updateDistance } = useProximity(0.8);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    
    // Simulate couple getting closer as name is typed
    const nameLength = newName.length;
    const newDistance = Math.min(1, nameLength / 10);
    updateDistance(newDistance);
    
    if (nameLength >= 3) {
      setShowNext(true);
    }
  };

  const handleContinue = () => {
    if (name.length >= 3) {
      onComplete(name);
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative vignette">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-warm-glow rounded-full opacity-30"
            animate={{
              y: [-100, window.innerHeight + 100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Couple silhouettes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative w-full max-w-4xl h-96"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {/* Left person */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            animate={{
              x: distance * 100,
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <div className="w-24 h-48 bg-cocoa-light rounded-t-full opacity-60" />
          </motion.div>
          
          {/* Right person */}
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            animate={{
              x: -distance * 100,
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <div className="w-24 h-48 bg-cocoa-light rounded-t-full opacity-60" />
          </motion.div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-light text-rose-beige mb-8 leading-relaxed">
            A name isn't just identity…<br />
            sometimes it's that place<br />
            where the heart comes to rest.
          </h1>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your name..."
            className="w-full px-6 py-4 bg-intimate-dark bg-opacity-50 border border-warm-glow border-opacity-30 rounded-full text-rose-beige placeholder-rose-beige placeholder-opacity-50 focus:outline-none focus:border-opacity-60 transition-all duration-500 text-center text-lg"
            maxLength={20}
          />
          
          {/* Animated letters display */}
          <div className="mt-6 h-8">
            <AnimatePresence mode="wait">
              {name && (
                <motion.div
                  key={name}
                  className="flex justify-center space-x-1"
                  initial={{ opacity: 0, y: 15, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {name.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                      className="text-warm-glow text-xl drop-shadow-glow"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {showNext && (
            <motion.button
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.9 }}
              onClick={handleContinue}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="mt-8 px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500 shadow-glow"
            >
              Continue
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NameEntry;
