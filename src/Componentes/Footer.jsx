import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
} from 'react-icons/fa';
import { FiArrowUpRight, FiMapPin, FiPhone, FiMail, FiDownload } from 'react-icons/fi';
import { scrollToTop } from '../utils/smoothScroll';

const Footer = () => {
  const footerLinks = {
    marketplace: [
      { name: 'Daily Meals', path: '/allmeals' },
      { name: 'Featured Chefs', path: '/chefs', isSpecial: true },
      { name: 'Cuisine Journal', path: '/blog' },
      { name: 'Boutique Services', path: '/services' },
    ],
    community: [
      { name: 'Join as Chef', path: '/signup' },
      { name: 'Bazaar Elite', path: '/signup' },
      { name: 'Help Concierge', path: '/contact' },
      { name: 'Our Story', path: '/about' },
    ]
  };

  return (
    <footer className="bg-[#0a0f16] text-white pt-32 pb-16 px-6 md:px-20 relative overflow-hidden">
      {/* Hyper-Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-[#6db70e]/20 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05] 
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-[#6db70e]/10 rounded-full blur-[150px]" 
        />
        {/* Massive Watermark Logo */}
        <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap select-none tracking-tighter">
          LOCALCHEF BAZAAR
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-32">
          
          {/* Brand & Signature Column - JOSS Horizontal Style */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6 mb-12"
            >
              <div className="relative flex-shrink-0">
                {/* Intense Animated Aura */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-[#6db70e] rounded-full blur-[40px]" 
                />
                <img 
                  src="/Adobe Express - file.png" 
                  alt="Logo" 
                  className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10 filter drop-shadow-[0_0_20px_rgba(109,183,14,0.3)]" 
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none">
                  LocalChef<span className="text-[#6db70e]">Bazaar</span>
                </h2>
                <span className="text-[9px] font-black text-[#6db70e] uppercase tracking-[0.6em] mt-2 block opacity-50">Excellence</span>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-slate-400 mb-10 leading-loose max-w-sm relative"
            >
              <span className="text-[#6db70e] font-serif italic text-4xl absolute -left-4 -top-2 opacity-30">"</span>
              <span className="relative z-10">
                Elevating the soul of home cooking into a <span className="text-white font-black italic">gorgeous boutique experience</span>. Discover authentic flavors crafted with passion by local artisans, and join us in celebrating the true <span className="text-[#6db70e] font-black uppercase tracking-[0.2em] text-[10px] ml-1">art of everyday dining.</span>
              </span>
            </motion.p>
          </div>

          {/* Links Columns - Dynamic Smart Style Expanded */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="text-[#6db70e] text-xs font-black uppercase tracking-[0.4em] mb-10 opacity-80 border-l-2 border-[#6db70e] pl-4">Marketplace</h4>
              <ul className="space-y-4">
                {footerLinks.marketplace.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="group relative inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all text-base font-black uppercase tracking-widest py-2 px-4 rounded-full hover:bg-white/5"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${link.isSpecial ? 'bg-[#6db70e] animate-pulse shadow-[0_0_10px_#6db70e]' : 'bg-[#6db70e]/20'} group-hover:bg-[#6db70e] transition-colors`} />
                      {link.name}
                      {link.isSpecial && <span className="text-[8px] bg-[#6db70e] text-black px-1.5 py-0.5 rounded-sm ml-2 animate-bounce">HOT</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#6db70e] text-xs font-black uppercase tracking-[0.4em] mb-10 opacity-80 border-l-2 border-[#6db70e] pl-4">Community</h4>
              <ul className="space-y-4">
                {footerLinks.community.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="group relative inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all text-base font-black uppercase tracking-widest py-2 px-4 rounded-full hover:bg-white/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6db70e]/20 group-hover:bg-[#6db70e] transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <h4 className="text-[#6db70e] text-xs font-black uppercase tracking-[0.4em] mb-10 opacity-80 border-l-2 border-[#6db70e] pl-4 flex items-center gap-2">
                Developer <span className="text-white">Desk</span>
              </h4>
              <div className="space-y-4">
                {[
                  { label: "Direct Line", val: "+880 1619 221 217", Icon: FiPhone, href: "tel:+8801619221217" },
                  { label: "Email Address", val: "fahad1shakiL@gmail.com", Icon: FiMail, href: "mailto:fahad1shakiL@gmail.com" },
                  { label: "Based In", val: "Narayanganj, Bangladesh", Icon: FiMapPin }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-5 rounded-[1.5rem] border border-white/5 backdrop-blur-md transition-all group cursor-pointer"
                  >
                    <span className="text-[9px] font-black text-[#6db70e] uppercase tracking-[0.3em] block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="text-white text-base font-black hover:text-[#6db70e] transition-all tracking-tight flex items-center gap-3">
                        <item.Icon className="text-[#6db70e] opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" size={18} />
                        {item.val}
                      </a>
                    ) : (
                      <div className="text-white text-base font-black tracking-tight flex items-center gap-3">
                        <item.Icon className="text-[#6db70e] opacity-40" size={18} />
                        {item.val}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div className="group pt-6">
                  <span className="text-[10px] font-black text-[#6db70e] uppercase tracking-[0.3em] block mb-4 opacity-60">Digital Presence</span>
                  <div className="flex gap-4">
                    {[
                      { Icon: FaGithub, href: "https://github.com/fahad1shakil" },
                      { Icon: FaFacebookF, href: "https://www.facebook.com/fahad2shakil" },
                      { Icon: FaLinkedinIn, href: "https://www.facebook.com/fahad2shakil" },
                      { Icon: FaTwitter, href: "https://x.com/fahad11shakil" }
                    ].map(({ Icon, href }, i) => (
                      <motion.a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white hover:text-[#6db70e] hover:border-[#6db70e]/50 hover:bg-[#6db70e]/5 transition-all duration-300 backdrop-blur-md shadow-lg"
                      >
                        <Icon size={16} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Horizontal Rules & Bottom Section */}
        <div className="relative pt-12 border-t border-white/5">
          <div className="absolute top-0 left-0 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#6db70e] to-transparent animate-pulse" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.6em] mb-4">
                © {new Date().getFullYear()} <span className="text-white">LocalChefBazaar</span> Global | Bespoke Development by 
                <motion.span 
                  animate={{ color: ["#fff", "#6db70e", "#fff"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="ml-2 font-serif italic tracking-normal text-lg"
                >
                  Fahad Shakil
                </motion.span>
              </p>
              <div className="flex gap-8 justify-center md:justify-start opacity-30 hover:opacity-100 transition-opacity">
                <Link to="/contact" className="text-[9px] font-black uppercase tracking-widest hover:text-[#6db70e]">Privacy</Link>
                <Link to="/contact" className="text-[9px] font-black uppercase tracking-widest hover:text-[#6db70e]">Terms</Link>
                <Link to="/contact" className="text-[9px] font-black uppercase tracking-widest hover:text-[#6db70e]">Standards</Link>
              </div>
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#6db70e] group-hover:bg-[#6db70e] group-hover:text-white transition-all shadow-2xl">
                <FiArrowUpRight size={24} className="-rotate-45" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500 group-hover:text-white transition-all">Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
