import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 relative overflow-hidden px-6">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#6db70e]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

      {/* Main Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl bg-slate-900 rounded-[3rem] p-12 md:p-20 shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-white/5 text-center overflow-hidden group"
      >
        {/* Animated Inner Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#6db70e]/20 rounded-full blur-3xl group-hover:bg-[#6db70e]/30 transition-all duration-1000" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-20 flex flex-col items-center"
        >
          {/* Logo Integration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src="/logo.png"
              alt="LocalChefBazaar Logo"
              className="w-64 md:w-80 drop-shadow-2xl"
            />
          </motion.div>

          <span className="text-[#6db70e] text-xs font-black uppercase tracking-[0.5em] mb-6 block">Error Code</span>
          
          <h1 className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-none opacity-90">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight uppercase">
            Oops! <span className="text-[#6db70e]">Page Missing</span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg mb-12 max-w-md font-medium leading-relaxed opacity-80">
            The culinary destination you're looking for seems to have moved or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link to="/" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full group relative px-10 py-4 bg-[#6db70e] text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(109,183,14,0.3)] hover:shadow-[0_20px_40px_rgba(109,183,14,0.5)] transition-all flex items-center justify-center gap-3"
              >
                <FiHome size={16} />
                <span>Return Home</span>
              </motion.button>
            </Link>

            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <FiArrowLeft size={16} />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>

        {/* Decorative Bottom Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#6db70e] to-transparent opacity-30" />
      </motion.div>

      {/* Footer Branding */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 text-slate-400 font-black text-[10px] uppercase tracking-[0.4em]"
      >
        LocalChefBazaar © 2026 — Boutique Marketplace
      </motion.p>
    </div>
  );
};

export default Error;
