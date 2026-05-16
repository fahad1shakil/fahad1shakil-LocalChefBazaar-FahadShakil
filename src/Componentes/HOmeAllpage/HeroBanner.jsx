import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiZap } from 'react-icons/fi';

const HeroBanner = () => {
  const [dishes, setDishes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [loading, setLoading] = useState(true);

  const eliteNames = [
    'Old Town Style Mutton Tehari',
    'Korean Bulgogi Beef Rice Bowl',
    'Caramel Macchiato',
    'Mango & Yogurt Lassi',
    'Roasted Beetroot & Feta Summer Salad',
    'Smoked Hilsha with Steamed Rice',
    'Slow-Cooked Lamb Shank'
  ];

  const fallbackDishes = [
    {
      id: 'fb-1',
      name: 'Artisanal Bengali Bhuna',
      description: 'A rich, slow-cooked masterpiece using heritage spices and local farm-fresh ingredients.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      tag: 'Chef Special',
      price: 18.50
    },
    {
      id: 'fb-2',
      name: 'Saffron Infused Biryani',
      description: 'Fragrant long-grain rice layered with tender meat and original Old Town spices.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800',
      tag: 'Bestseller',
      price: 24.00
    },
    {
      id: 'fb-3',
      name: 'Heritage Duck Roast',
      description: 'A traditional winter delicacy, marinated for 24 hours and roasted to perfection.',
      image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800',
      tag: 'Seasonal Elite',
      price: 32.00
    }
  ];

  useEffect(() => {
    const fetchEliteMeals = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/meals`);
        if (response.data.success) {
          const allMeals = response.data.data;
          
          const curated = allMeals.filter(meal =>
            eliteNames.some(name => meal.foodName.toLowerCase().includes(name.toLowerCase()))
          );
          
          let finalSelection = curated.map(meal => ({
            id: meal._id,
            name: meal.foodName,
            description: meal.description || 'A signature artisan creation from the LocalChefBazaar master kitchen.',
            image: meal.foodImage,
            tag: 'Elite Selection',
            price: meal.price
          }));

          if (finalSelection.length < 5) {
            const others = allMeals
              .filter(m => !finalSelection.find(f => f.id === m._id))
              .sort((a, b) => (b.rating || 0) - (a.rating || 0))
              .slice(0, 5 - finalSelection.length)
              .map(meal => ({
                id: meal._id,
                name: meal.foodName,
                description: 'A premium boutique preparation hand-selected for your palate.',
                image: meal.foodImage,
                tag: 'Trending Choice',
                price: meal.price
              }));
            finalSelection = [...finalSelection, ...others];
          }
          
          setDishes(finalSelection.slice(0, 5));
        } else {
           setDishes(fallbackDishes);
        }
      } catch (error) {
        console.error("Error fetching elite meals:", error);
        setDishes(fallbackDishes);
      } finally {
        setLoading(false);
      }
    };
    fetchEliteMeals();
  }, []);

  const handleNext = () => {
    if (isRotating || dishes.length === 0) return;
    setIsRotating(true);
    setActiveIndex((prev) => (prev + 1) % dishes.length);
    setTimeout(() => setIsRotating(false), 800);
  };

  const handlePrev = () => {
    if (isRotating || dishes.length === 0) return;
    setIsRotating(true);
    setActiveIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
    setTimeout(() => setIsRotating(false), 800);
  };

  if (loading) return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-[#121212] transition-colors duration-500">
      <div className="w-16 h-16 border-t-4 border-b-4 border-[#6db70e] dark:border-[#7ecf55] rounded-full animate-spin" />
      <p className="mt-5 text-[10px] font-black uppercase tracking-[0.6em] text-slate-400 dark:text-[#555]">Filtering Elite Collection</p>
    </div>
  );

  if (dishes.length === 0) return null;

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[900px] overflow-hidden bg-white dark:bg-[#121212] transition-colors duration-500 flex items-center pt-24 lg:pt-0">

      {/* Main Green Background Shape - Optimized for Desktop */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 sm:-right-40 md:right-[-25%] lg:right-[-15%] top-20 sm:top-10 md:top-[5%] lg:top-[0%] w-[350px] sm:w-[500px] md:w-[1100px] lg:w-[1300px] h-[350px] sm:h-[500px] md:h-[1100px] lg:h-[1300px] bg-[#6db70e] rounded-full z-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.15)] opacity-80 sm:opacity-90 lg:opacity-100"
      />

      {/* Secondary Background Shape */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -left-24 bottom-10 w-[300px] h-[300px] border-[40px] border-[#6db70e]/5 rounded-full z-0 hidden md:block"
      />
      
      <div className="absolute left-10 top-1/4 w-px h-64 bg-gradient-to-b from-transparent via-[#6db70e]/20 to-transparent z-0 hidden lg:block" />

      <div className="w-full px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 items-center z-10 gap-16 lg:gap-0">

        {/* Left Content */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 relative pb-10 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 dark:bg-[#1a1a1a] text-white dark:text-slate-100 rounded-full text-[9px] font-black uppercase tracking-[0.4em] mb-6 shadow-xl border dark:border-[#242424] dark:border-[0.5px]">
                <FiZap className="text-[#6db70e] dark:text-[#7ecf55]" /> {dishes[activeIndex]?.tag}
              </div>
              <h3 className="text-[#6db70e] dark:text-[#7ecf55] text-4xl md:text-6xl font-bold mb-3 font-serif italic leading-none">
                Elite
              </h3>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[0.9] mb-8 tracking-tighter uppercase max-w-lg">
                {dishes[activeIndex]?.name}
              </h1>
              <div className="relative mb-10 group px-4 lg:px-0">
                <p className="text-slate-600 dark:text-slate-200 text-base md:text-lg leading-relaxed max-w-md font-serif italic line-clamp-3 relative z-10">
                  "{dishes[activeIndex]?.description}"
                </p>
                <div className="absolute -left-4 top-0 w-1 h-full bg-[#6db70e]/20 rounded-full hidden lg:block" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Button + Avatars */}
          <div className="flex flex-col items-center lg:items-start gap-8 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/allmeals" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:min-w-[220px] h-14 md:h-16 bg-[#6db70e] dark:bg-[#6db70e] text-white dark:text-white rounded-full font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 shadow-xl whitespace-nowrap border-2 border-[#6db70e] dark:border-[#6db70e]"
                >
                  <span className="relative z-10 tracking-tight">SHOP THE ELITE</span>
                  <FiArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>
              </Link>
              
              <Link to="/chefs" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:min-w-[200px] h-14 md:h-16 bg-transparent border-2 border-[#6db70e] dark:border-[#7ecf55] text-[#6db70e] dark:text-[#7ecf55] rounded-full font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 whitespace-nowrap"
                >
                  <span className="relative z-10 tracking-tight">VIEW CHEFS</span>
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white dark:border-[#121212] bg-slate-100 dark:bg-[#111111] overflow-hidden shadow-xl border dark:border-[#242424] dark:border-[0.5px]">
                    <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-[3px] border-white dark:border-[#121212] bg-slate-900 dark:bg-[#7ecf55] flex items-center justify-center text-white dark:text-[#0f0f0f] text-[9px] font-black shadow-xl border dark:border-[#242424] dark:border-[0.5px]">
                  +2k
                </div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-[#555]">Global Artisan Network</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2 mt-10 lg:mt-0">
          
          {/* Main dish container */}
          <div className="relative z-20 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] lg:w-[650px] lg:h-[650px] lg:mr-[-40px] flex items-center justify-center">

            {/* Orbit ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[600px] md:h-[600px] lg:w-[850px] lg:h-[850px] border border-[#6db70e]/20 dark:border-white/10 rounded-full pointer-events-none z-10" />

            {/* Dish image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 20 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="w-full h-full p-3 sm:p-5 rounded-full bg-white dark:bg-[#111111] shadow-[0_30px_60px_rgba(0,0,0,0.15)] md:shadow-[0_60px_120px_rgba(0,0,0,0.2)] border-[8px] sm:border-[12px] border-white dark:border-[#121212] border dark:border-[#242424] dark:border-[0.5px]"
              >
                <img
                  src={dishes[activeIndex]?.image}
                  alt={dishes[activeIndex]?.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 p-3 md:p-5 rounded-full bg-white dark:bg-[#111111] text-[#6db70e] dark:text-[#7ecf55] shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 md:border-4 border-[#6db70e] dark:border-[#242424] dark:border-[0.5px]"
            >
              <FiChevronLeft size={20} className="md:w-8 md:h-8" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-40 p-3 md:p-5 rounded-full bg-white dark:bg-[#111111] text-[#6db70e] dark:text-[#7ecf55] shadow-2xl hover:scale-110 active:scale-95 transition-all border-2 md:border-4 border-[#6db70e] dark:border-[#242424] dark:border-[0.5px]"
            >
              <FiChevronRight size={20} className="md:w-8 md:h-8" />
            </button>
          </div>

          {/* Orbiting dishes */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {dishes.map((dish, index) => {
              const diff = (index - activeIndex + dishes.length) % dishes.length;
              if (diff === 0) return null;
              
              const positions = [
                { angle: -30 },
                { angle: -80 },
                { angle: -130 },
                { angle: -180 }
              ];
              
              const pos = positions[diff - 1] || { angle: 0 };
              const angle = pos.angle;
              
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
              
              const radius = isMobile ? 130 : isTablet ? 240 : 380;
              const size = isMobile ? 'w-12 h-12' : isTablet ? 'w-18 h-18' : 'w-24 h-24';
              const offset = isMobile ? 24 : isTablet ? 36 : 48;

              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <motion.div
                  key={dish.id}
                  className={`absolute ${size} rounded-full p-0.5 bg-white dark:bg-[#1a1a1a] shadow-lg cursor-pointer z-30 overflow-hidden border border-white dark:border-[#242424] pointer-events-auto group`}
                  animate={{ x: x - offset, y: y - offset, scale: 0.8 }}
                  whileHover={{ scale: 0.9, y: y - offset - 10 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: "anticipate",
                    scale: { duration: 0.3 },
                    y: { duration: 0.3 }
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover rounded-full transition-opacity duration-300 opacity-60 group-hover:opacity-100" />
                  
                  {/* Smart White Text Overlays */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                     <span className="text-[7px] md:text-[9px] font-black text-white uppercase tracking-tighter text-center px-1 drop-shadow-md">
                        {dish.name.split(' ')[0]}
                     </span>
                     <span className="text-[8px] md:text-[10px] font-black text-[#7ecf55] drop-shadow-md">
                        ${dish.price}
                     </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;