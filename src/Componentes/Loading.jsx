import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      {/* Animated Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl flex items-center gap-1 mb-12"
      >
        <span className="font-black text-slate-900 tracking-tight">LocalChef</span>
        <span className="font-medium text-[#6db70e] tracking-[0.2em] uppercase text-2xl md:text-3xl mt-1">Bazaar</span>
      </motion.div>

      {/* Modern Circular Loader */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating dashed circle */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute w-24 h-24 rounded-full border-[3px] border-slate-200 border-t-[#6db70e] border-r-[#6db70e]"
        />
        {/* Inner pulsing circle */}
        <motion.div 
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-[#6db70e]/20 flex items-center justify-center"
        >
          <div className="w-6 h-6 rounded-full bg-[#6db70e] shadow-[0_0_15px_rgba(109,183,14,0.5)]" />
        </motion.div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-slate-400 font-bold tracking-[0.2em] uppercase text-xs"
      >
        Preparing your experience...
      </motion.p>
    </div>
  );
};

export default Loading;
