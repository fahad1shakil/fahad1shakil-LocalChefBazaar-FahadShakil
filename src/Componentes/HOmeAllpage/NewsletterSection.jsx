import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck, FiStar, FiZap, FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setTimeout(() => {
      setIsSubscribed(true);
      toast.success('Successfully joined the LocalChefBazaar family!');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-32 px-4 bg-white dark:bg-[#0f0f0f] relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Elements - Hidden in dark mode for flat design */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6db70e] dark:hidden rounded-full blur-[150px] -mr-96 -mt-96" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500 dark:hidden rounded-full blur-[150px] -ml-80 -mb-80" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="bg-slate-950 dark:bg-[#111111] rounded-[4rem] p-10 md:p-24 text-center overflow-hidden relative shadow-2xl border border-white/5 dark:border-[#242424] dark:border-[0.5px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Floating Decorative Icons */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 left-20 text-[#6db70e]/20 dark:text-[#7ecf55]/10 hidden lg:block"
          >
            <FiStar size={40} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-20 text-orange-500/20 dark:hidden hidden lg:block"
          >
            <FiHeart size={40} />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-10 text-white/10 hidden xl:block"
          >
            <FiZap size={60} />
          </motion.div>

          {/* Luxury Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#6db70e]/50 dark:via-[#7ecf55]/30 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Boutique Subheader with Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-[#6db70e] dark:text-[#7ecf55] text-2xl md:text-3xl font-bold mb-4 font-serif italic tracking-wide">
                Join the Elite
              </h3>
            </motion.div>
            
            {/* Main Title - Dynamic Typography */}
            <motion.h2 
              className="text-4xl md:text-8xl font-black text-white dark:text-[#e0e0e0] mb-8 tracking-tighter leading-[0.9]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Stay <span className="text-[#6db70e] dark:text-[#7ecf55] inline-block hover:scale-105 transition-transform duration-300">Inspired</span> With Us
            </motion.h2>

            <motion.div 
              className="h-1.5 w-32 bg-[#6db70e] dark:bg-[#7ecf55] rounded-full mb-10"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ delay: 0.5, duration: 1 }}
            />

            {/* Premium Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-slate-400 dark:text-[#888888] mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Experience the pulse of <span className="text-white dark:text-[#e0e0e0] font-bold">LocalChefBazaar</span>. Exclusive recipes, new chef spotlights, and seasonal secrets—delivered only to our family.
            </motion.p>

            {!isSubscribed ? (
              <motion.form 
                onSubmit={handleSubmit} 
                className="w-full max-w-xl mx-auto group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex flex-col md:flex-row gap-4 p-3 bg-white/5 dark:bg-[#0f0f0f]/40 rounded-[2rem] border border-white/10 dark:border-[#242424] dark:border-[0.5px] backdrop-blur-xl dark:backdrop-filter-none shadow-2xl transition-all duration-500 group-focus-within:border-[#6db70e]/50 dark:group-focus-within:border-[#7ecf55]/50 group-focus-within:bg-white/10">
                  <div className="relative flex-1">
                    <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6db70e] dark:text-[#7ecf55] transition-transform duration-300 group-focus-within:scale-110" size={24} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your elite email address"
                      className="w-full pl-16 pr-4 py-6 bg-transparent text-white dark:text-[#e0e0e0] placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none font-black text-sm uppercase tracking-widest"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] font-black rounded-[1.5rem] uppercase text-xs tracking-[0.3em] shadow-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="w-24 h-24 bg-[#6db70e] dark:bg-[#7ecf55] rounded-full flex items-center justify-center shadow-xl">
                  <FiCheck size={48} className="text-white dark:text-[#0f0f0f]" />
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-black text-white dark:text-[#e0e0e0] mb-2">Welcome Home!</h4>
                  <p className="text-[#6db70e] dark:text-[#7ecf55] font-black uppercase tracking-[0.4em] text-xs">You are now part of the Elite Bazaar Circle</p>
                </div>
              </motion.div>
            )}

            {/* Dynamic Trust Elements */}
            <div className="mt-20 flex flex-wrap justify-center gap-10 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
              {[
                { label: 'Chef Secrets', icon: <FiZap /> },
                { label: 'Early Access', icon: <FiStar /> },
                { label: 'Market Deals', icon: <FiHeart /> }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 + (i * 0.1) }}
                >
                  <span className="text-[#6db70e] dark:text-[#7ecf55]">{item.icon}</span>
                  <span className="text-[10px] md:text-xs font-black text-white dark:text-[#e0e0e0] uppercase tracking-[0.5em]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
