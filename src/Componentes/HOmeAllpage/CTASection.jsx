import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiClock, FiHeart } from 'react-icons/fi';
import { scrollToTop } from '../../utils/smoothScroll';

const CTASection = () => {
  return (
    <section className="py-32 px-4 bg-white dark:bg-[#0f0f0f] relative overflow-hidden transition-colors duration-500">
      {/* Abstract Minimalist Background - Hidden in dark mode */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6db70e]/5 dark:hidden rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 dark:hidden rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="bg-slate-50 dark:bg-[#111111] rounded-[4rem] p-12 md:p-24 border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Visual Side */}
          <div className="lg:w-1/2 relative">
            <motion.div 
              className="relative rounded-[3rem] overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop" 
                alt="Boutique Food" 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-[#0f0f0f]/40" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 bg-white/90 dark:bg-[#151515]/90 backdrop-blur-md dark:backdrop-filter-none p-6 rounded-3xl shadow-xl border border-white/20 dark:border-[#242424] dark:border-[0.5px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#6db70e] dark:bg-[#7ecf55] rounded-full flex items-center justify-center text-white dark:text-[#0f0f0f] shadow-lg">
                    <FiStar />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 dark:text-[#e0e0e0] text-lg">4.9/5</div>
                    <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest">Bazaar Rating</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative Elements - Hidden in dark mode */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#6db70e]/10 dark:hidden rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 dark:hidden rounded-full blur-3xl" />
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.span 
              className="text-[#6db70e] dark:text-[#7ecf55] text-2xl md:text-3xl font-bold mb-4 font-serif italic block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Ready to begin?
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-7xl font-black text-slate-900 dark:text-[#e0e0e0] mb-6 tracking-tighter leading-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Your Culinary <span className="text-[#6db70e] dark:text-[#7ecf55]">Bazaar</span> Awaits.
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-slate-500 dark:text-[#888888] mb-12 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Join the elite circle of food lovers who experience the soul of local cooking, delivered with boutique care to your doorstep.
            </motion.p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link to="/allmeals" onClick={scrollToTop}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden flex items-center gap-4 px-10 py-5 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-white font-black rounded-full shadow-2xl transition-all duration-500 text-xs uppercase tracking-[0.3em] cursor-pointer"
                >
                  <span className="relative z-10">Start Ordering</span>
                  <FiArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link to="/signup" onClick={scrollToTop}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden flex items-center gap-4 px-10 py-5 bg-white dark:bg-[#151515] text-slate-900 dark:text-[#e0e0e0] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] font-black rounded-full transition-all duration-300 text-xs uppercase tracking-[0.3em] cursor-pointer"
                >
                  <span className="relative z-10">Join as Chef</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40">
              <div className="flex items-center gap-2">
                <FiClock className="text-[#6db70e] dark:text-[#7ecf55]" />
                <span className="text-[10px] font-black text-slate-900 dark:text-[#e0e0e0] uppercase tracking-widest">Express Care</span>
              </div>
              <div className="flex items-center gap-2">
                <FiHeart className="text-[#6db70e] dark:text-[#7ecf55]" />
                <span className="text-[10px] font-black text-slate-900 dark:text-[#e0e0e0] uppercase tracking-widest">Boutique Quality</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;