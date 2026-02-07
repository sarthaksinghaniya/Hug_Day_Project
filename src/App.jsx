import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NameEntry from './components/NameEntry';
import FirstHug from './components/FirstHug';
import CuddleScene from './components/CuddleScene';
import SpooningScene from './components/SpooningScene';
import HeartbeatScene from './components/HeartbeatScene';
import FinalStayScene from './components/FinalStayScene';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [userName, setUserName] = useState('');

  const sections = [
    { component: NameEntry, key: 'name' },
    { component: FirstHug, key: 'firstHug' },
    { component: CuddleScene, key: 'cuddle' },
    { component: SpooningScene, key: 'spooning' },
    { component: HeartbeatScene, key: 'heartbeat' },
    { component: FinalStayScene, key: 'final' },
  ];

  const handleSectionComplete = (name = '') => {
    console.log('handleSectionComplete called with:', name);
    if (name) {
      setUserName(name);
    }
    setCurrentSection(prev => {
      console.log('Current section:', prev, 'Next section:', prev + 1);
      return prev + 1;
    });
  };

  const CurrentComponent = sections[currentSection]?.component;

  return (
    <div className="relative min-h-screen bg-romantic-bg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="min-h-screen"
        >
          {CurrentComponent && (
            <CurrentComponent 
              onComplete={handleSectionComplete}
              userName={userName}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-warm-glow"
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{
                opacity: index <= currentSection ? 1 : 0.3,
                scale: index === currentSection ? 1.2 : 0.8,
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
