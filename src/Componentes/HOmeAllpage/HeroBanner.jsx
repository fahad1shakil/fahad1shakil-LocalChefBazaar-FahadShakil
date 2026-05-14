import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const HeroBanner = () => {
  const [dishes, setDishes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/meals/latest');
        if (response.data.success) {
          const mappedDishes = response.data.data.slice(0, 6).map((meal) => ({
            id: meal._id,
            name: meal.foodName,
            image: meal.foodImage
          }));
          setDishes(mappedDishes);
        }
      } catch (error) {
        console.error("Error fetching hero meals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
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
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#6db70e] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (dishes.length === 0) return null;

  return (
    <section className="relative w-full h-screen min-h-[850px] overflow-hidden bg-white flex items-center">
      
      {/* Refined Green Background Sweep */}
      <div className="absolute right-[-10%] top-[-10%] w-[1400px] h-[1400px] bg-[#6db70e] rounded-full z-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]" />

      <div className="w-full px-10 lg:px-24 grid grid-cols-1 lg:grid-cols-12 items-center z-10 h-full pt-32">
        
        {/* Left Content Area */}
        <div className="lg:col-span-5 flex flex-col items-start gap-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <h3 className="text-[#6db70e] text-5xl font-bold mb-4 font-serif italic">
                Delicious
              </h3>
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-tight mb-6">
                {dishes[activeIndex].name}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-sm">
                Savor the authentic flavors of handcrafted meals, prepared by master home chefs using the finest local ingredients.
              </p>
            </motion.div>
          </AnimatePresence>

          <Link to="/meals">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-gradient-to-r from-[#6db70e] to-[#4a8208] text-white rounded-full font-black text-xl shadow-[0_10px_40px_rgba(109,183,14,0.4)] hover:shadow-[0_20px_50px_rgba(109,183,14,0.7)] transition-all overflow-hidden flex items-center gap-4 border border-white/20"
            >
              {/* Dynamic hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#7cd112] to-[#6db70e] transition-opacity duration-500" />
              
              <span className="relative z-10 tracking-wide">See All Meals</span>
              
              <div className="relative z-10 bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-[#6db70e] transition-all duration-300 shadow-inner">
                <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </Link>
        </div>

        {/* Right Section (Green Area with Orbit) */}
        <div className="lg:col-span-7 relative h-full flex items-center justify-center">
          
          {/* Elegant White Circle Ring (The "Circle within Circle" request) */}
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1050px] h-[1050px] bg-white/10 backdrop-blur-sm rounded-full z-0 border-[40px] border-white/5 shadow-2xl" />

          {/* Orbiting Path (Dashed) - Shifted down to avoid Header overlap */}
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[880px] h-[880px] border-2 border-dashed border-white/40 rounded-full z-10 pointer-events-none" />

          {/* Orbiting Small Dishes */}
          <div className="absolute inset-0 flex items-center justify-center pt-32 pointer-events-none">
            {dishes.map((dish, index) => {
              const diff = (index - activeIndex + dishes.length) % dishes.length;
              if (diff === 0) return null;

              // Refined angles to keep dishes strictly on the top arc, completely avoiding the big image and text
              const angles = { 
                1: -35,    // Upper Right
                2: -65,    // Top Right
                3: -95,    // Top Center
                4: -125,   // Top Left
                5: -155    // Upper Left
              };
              const angle = angles[diff] || 0;
              const radius = 440;
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;

              return (
                <motion.div
                  key={dish.id}
                  className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-white shadow-2xl cursor-pointer z-30 overflow-hidden border-2 border-white pointer-events-auto"
                  animate={{ x: x - 50, y: y - 50, scale: 0.9 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  onClick={() => setActiveIndex(index)}
                >
                  <img src={dish.image} alt="" className="w-full h-full object-cover rounded-full" />
                </motion.div>
              );
            })}
          </div>

          {/* Main Massive Dish - Refined size to match path perfectly */}
          <div className="relative z-20 w-[480px] h-[480px] md:w-[650px] md:h-[650px] mt-64 mr-[-200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 15 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full p-4 rounded-full bg-white shadow-[0_80px_120px_rgba(0,0,0,0.3)]"
              >
                <img 
                  src={dishes[activeIndex].image} 
                  alt={dishes[activeIndex].name}
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Perfectly aligned with refined dish size */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-[calc(100%+160px)] flex justify-between z-40 pointer-events-none">
              <button 
                onClick={handlePrev} 
                className="pointer-events-auto p-5 rounded-full bg-[#6db70e] text-white shadow-2xl hover:scale-110 transition-all border-4 border-white ml-[-40px]"
              >
                <FiChevronLeft size={32} />
              </button>
              <button 
                onClick={handleNext} 
                className="pointer-events-auto p-5 rounded-full bg-[#6db70e] text-white shadow-2xl hover:scale-110 transition-all border-4 border-white mr-[-40px]"
              >
                <FiChevronRight size={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;





