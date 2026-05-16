import React from 'react';
import { motion } from 'framer-motion';

const CulinaryBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden hidden md:block select-none">
      {/* Container for the subtle rising steam/glow effect */}
      <div className="absolute inset-0 opacity-10 dark:opacity-[0.07]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: '100%', 
              x: `${15 + (i * 15)}%`,
              scale: 0.8 
            }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0], 
              y: '-20%', 
              x: [`${15 + (i * 15)}%`, `${15 + (i * 15) + (i % 2 === 0 ? 5 : -5)}%`],
              scale: [1, 1.5, 2]
            }}
            transition={{ 
              duration: 25 + (i * 5), 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 4 
            }}
            className="absolute bottom-0 w-[400px] h-[600px] rounded-full blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(109, 183, 14, 0.2) 0%, rgba(255, 172, 51, 0.1) 50%, transparent 100%)',
              filter: 'contrast(1.2)'
            }}
          />
        ))}
      </div>

      {/* Static very faint texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.01] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </div>
  );
};

export default CulinaryBackground;
