import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#7C295D]/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-[#7C295D]/10 blur-2xl animate-float" />
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000); // Additional delay for smooth transition
    }, 20000); // Set to 20 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)',
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#7C295D] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">

              {/* Welcome Text */}
              <motion.div
                className="text-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1
                  className="text-3xl sm:text-4xl md:text-6xl font-extrabold space-y-4 sm:space-y-6"
                  data-aos="fade-up"
                >
                  <div className="mb-4">
                    <TypewriterEffect text="Welcome to The CMDians Event Planner!" />
                  </div>
                  <span
                    className="block px-4 bg-gradient-to-r from-indigo-200 via-blue-200 to-purple-200 bg-clip-text text-transparent"
                    data-aos="fade-left"
                    data-aos-delay="200"
                  >
                    A day of fun and adventure awaits you!
                  </span>
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.div
                className="text-center text-lg sm:text-xl text-indigo-100 mt-6"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <p>🌟 Get ready for an unforgettable experience! 🌟</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
