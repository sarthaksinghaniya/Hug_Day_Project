import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreathing } from '../hooks/useBreathing';
import { useHeartbeat } from '../hooks/useHeartbeat';

const FinalStayScene = (props) => {
  const { onComplete, userName } = props;
  console.log('FinalStayScene props:', props);
  const [timeSpent, setTimeSpent] = useState(0);
  const { scale: breathingScale, opacity: breathingOpacity } = useBreathing(6000);
  const heartbeat = useHeartbeat(4000);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShare = () => {
    setShowShareOptions(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Could add a toast notification here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative vignette overflow-hidden">
      {/* Infinite ambient warmth */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-warm-glow via-transparent to-candle-light opacity-10"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Floating love particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-warm-glow opacity-20"
            animate={{
              y: [window.innerHeight + 100, -100],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              scale: [0.5, Math.random() * 1.5 + 0.5, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 8}px`,
            }}
          >
            {Math.random() > 0.5 ? '♥' : '✨'}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light text-rose-beige leading-relaxed">
            If you wish…<br />
            we can sit right here<br />
            and <span className="text-warm-glow">breathe a little longer.</span>
          </h2>
        </motion.div>

        {/* Infinite hug visualization */}
        <motion.div
          className="relative h-64 mb-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          <div className="relative">
            {/* Eternal embrace */}
            <motion.div
              style={{ scale: breathingScale, opacity: breathingOpacity }}
              className="relative"
            >
              {/* Two figures in eternal hug */}
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-20 h-32 bg-cocoa-light rounded-t-full relative"
                  style={{ scale: heartbeat }}
                >
                  <div className="absolute -right-3 top-4 w-12 h-3 bg-cocoa-light rounded-full origin-left" />
                </motion.div>
                <motion.div
                  className="w-20 h-32 bg-cocoa-light rounded-t-full relative"
                  style={{ scale: heartbeat }}
                >
                  <div className="absolute -left-3 top-4 w-12 h-3 bg-cocoa-light rounded-full origin-right" />
                </motion.div>
              </div>
            </motion.div>

            {/* Infinite glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-48 h-48 bg-warm-glow rounded-full blur-2xl opacity-40" />
            </motion.div>

            {/* Infinity symbol */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-warm-glow opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="40" height="20" viewBox="0 0 40 20">
                <path
                  d="M10,10 Q20,0 30,10 T50,10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Time spent together */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
        >
          <div className="text-warm-glow text-lg mb-2">We are together</div>
          <div className="text-rose-beige text-2xl font-light">{formatTime(timeSpent)}</div>
        </motion.div>

        {/* Personal message */}
        <motion.div
          className="mb-12 px-6 py-4 bg-intimate-dark bg-opacity-30 rounded-2xl border border-warm-glow border-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 2 }}
        >
          <div className="text-rose-beige text-sm leading-relaxed">
            {userName && `${userName},`} this moment is yours.<br />
            No hurry, no pressure.<br />
            Just you and me... right here.
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500"
          >
            Stay here
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-8 py-3 bg-warm-glow bg-opacity-20 border border-warm-glow border-opacity-40 rounded-full text-rose-beige hover:bg-opacity-30 transition-all duration-500"
          >
            Send this hug
          </motion.button>
        </motion.div>

        {/* Share options */}
        <AnimatePresence>
          {showShareOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 flex gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className="px-6 py-2 bg-intimate-dark bg-opacity-50 rounded-full text-rose-beige text-sm hover:bg-opacity-70 transition-all"
              >
                Copy link
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Breathing reminder */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="text-warm-glow text-xs">Breathe slowly...</div>
      </motion.div>
    </div>
  );
};

export default FinalStayScene;
