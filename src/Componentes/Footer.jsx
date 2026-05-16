import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';
import { FiArrowUpRight, FiMapPin, FiPhone, FiMail, FiZap } from 'react-icons/fi';
import { scrollToTop } from '../utils/smoothScroll';

const Footer = () => {
  const footerLinks = {
    marketplace: [
      { name: 'Home Marketplace', path: '/' },
      { name: 'Elite Meals', path: '/allmeals' },
      { name: 'Master Chefs', path: '/chefs', isSpecial: true },
      { name: 'Cuisine Blog', path: '/blog' },
      { name: 'Contact Concierge', path: '/contact' },
    ],
    community: [
      { name: 'Become a Partner', path: '/signup' },
      { name: 'Bazaar Membership', path: '/signup' },
      { name: 'Premium Support', path: '/contact' },
      { name: 'Our Artisan Story', path: '/about' },
      { name: 'Boutique Services', path: '/services' },
    ]
  };

  return (
    <footer className="relative bg-white dark:bg-[#121212] text-slate-900 dark:text-[#e8e8e8] pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-slate-100 dark:border-[#242424] dark:border-[0.5px] transition-colors duration-500">
      
      {/* Signature Elite Background Shape - Matching HeroBanner */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[10%] -bottom-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#6db70e]/5 dark:bg-[#7ecf55]/5 rounded-full z-0 blur-3xl"
      />
      <div className="absolute left-[-5%] top-[20%] w-[300px] h-[300px] border-[30px] border-[#6db70e]/5 rounded-full z-0 hidden lg:block" />

      {/* Massive Watermark - Stylized */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[12vw] font-black text-slate-900/[0.02] dark:text-white/[0.02] whitespace-nowrap tracking-tighter uppercase leading-none">
          LocalChef Bazaar
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Brand & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 mb-24">
          
          {/* Brand Identity - Column 1 (Original Position) */}
          <div className="lg:col-span-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-4 group mb-10">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6db70e] to-[#a2e635] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-all duration-700"></div>
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] shadow-sm group-hover:shadow-xl group-hover:border-[#6db70e] transition-all duration-500">
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="w-[110%] h-[110%] max-w-none object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none group-hover:text-[#6db70e] transition-colors">
                  LocalChef
                </span>
                <span className="text-xs md:text-sm font-black tracking-[0.4em] text-[#6db70e] dark:text-[#7ecf55] uppercase mt-1">
                  Bazaar
                </span>
              </div>
            </Link>

            <div className="relative pl-6">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#6db70e] to-transparent rounded-full opacity-30" />
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-serif italic leading-relaxed">
                "Curating the world's most <span className="text-slate-900 dark:text-white font-bold not-italic">authentic flavors</span> and connecting them with your doorstep through a <span className="text-[#6db70e] dark:text-[#7ecf55] font-black uppercase tracking-widest text-xs not-italic">bespoke marketplace</span> experience."
              </p>
            </div>
          </div>

          {/* Links Columns - Column 2 (Original Position) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] pl-4 border-l-2 border-[#6db70e]">
                Marketplace
              </h4>
              <ul className="space-y-4">
                {footerLinks.marketplace.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="group inline-flex items-center gap-2 text-slate-600 dark:text-[#888888] hover:text-[#6db70e] dark:hover:text-[#7ecf55] font-bold text-sm transition-all uppercase tracking-widest"
                    >
                      <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:w-3 group-hover:bg-[#6db70e] transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] pl-4 border-l-2 border-[#6db70e]">
                Ecosystem
              </h4>
              <ul className="space-y-4">
                {footerLinks.community.map((link, i) => (
                  <li key={i}>
                    <Link 
                      to={link.path} 
                      onClick={scrollToTop}
                      className="group inline-flex items-center gap-2 text-slate-600 dark:text-[#888888] hover:text-[#6db70e] dark:hover:text-[#7ecf55] font-bold text-sm transition-all uppercase tracking-widest"
                    >
                      <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full group-hover:w-3 group-hover:bg-[#6db70e] transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 flex flex-col gap-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] pl-4 border-l-2 border-[#6db70e]">
                Artisan Desk
              </h4>
              <div className="space-y-4">
                <div className="group cursor-pointer">
                  <p className="text-[9px] font-black text-[#6db70e] uppercase tracking-[0.3em] mb-1">Direct Line</p>
                  <div className="flex items-center gap-3 text-slate-900 dark:text-[#e0e0e0] font-black text-sm group-hover:text-[#6db70e] transition-colors">
                    <FiPhone size={14} className="opacity-40" />
                    <span>+880 1619 221 217</span>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <p className="text-[9px] font-black text-[#6db70e] uppercase tracking-[0.3em] mb-1">Studio Mail</p>
                  <div className="flex items-center gap-3 text-slate-900 dark:text-[#e0e0e0] font-black text-sm group-hover:text-[#6db70e] transition-colors">
                    <FiMail size={14} className="opacity-40" />
                    <span className="truncate">fahad1shakil@gmail.com</span>
                  </div>
                </div>
                
                {/* Social Links Restored to Original Position */}
                <div className="pt-4">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Digital Presence</p>
                  <div className="flex gap-3">
                    {[
                      { Icon: FaGithub, href: "https://github.com/fahad1shakil" },
                      { Icon: FaFacebookF, href: "https://www.facebook.com/fahad2shakil" },
                      { Icon: FaLinkedinIn, href: "https://www.linkedin.com/in/fahad1shakil" },
                      { Icon: FaTwitter, href: "https://x.com/fahad11shakil" }
                    ].map(({ Icon, href }, i) => (
                      <motion.a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, backgroundColor: "#6db70e", color: "#fff", borderColor: "#6db70e" }}
                        className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] flex items-center justify-center text-slate-400 dark:text-[#888888] border border-slate-100 dark:border-[#242424] transition-all duration-300 shadow-sm"
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

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 dark:border-[#242424] flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} <span className="text-slate-900 dark:text-white">LocalChefBazaar</span> 
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-[#6db70e] dark:text-[#7ecf55] uppercase tracking-widest">
              <FiZap size={10} />
              <span>Developed by <motion.span 
                animate={{ 
                  color: ['#6db70e', '#a2e635', '#6db70e'],
                  textShadow: [
                    '0 0 0px rgba(109,183,14,0)',
                    '0 0 10px rgba(109,183,14,0.3)',
                    '0 0 0px rgba(109,183,14,0)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="cursor-default"
              >
                Fahad Shakil
              </motion.span> — Senior Engineer</span>
            </div>
          </div>

          <div className="flex gap-10 opacity-40 hover:opacity-100 transition-opacity">
            <Link to="/contact" className="text-[9px] font-black uppercase tracking-[0.4em] hover:text-[#6db70e]">Privacy</Link>
            <Link to="/contact" className="text-[9px] font-black uppercase tracking-[0.4em] hover:text-[#6db70e]">Terms</Link>
            <Link to="/contact" className="text-[9px] font-black uppercase tracking-[0.4em] hover:text-[#6db70e]">Standards</Link>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -5 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-[#1a1a1a] border border-slate-100 dark:border-[#242424] flex items-center justify-center text-slate-400 group-hover:bg-[#6db70e] group-hover:text-white transition-all shadow-sm">
              <FiArrowUpRight size={18} className="-rotate-45" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-all">Top</span>
          </motion.button>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
