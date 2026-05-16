import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  const categories = [
    {
      name: "Artisanal Bengali",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%B6_%E0%A6%AE%E0%A6%BE%E0%A6%9B_%E0%A6%AD%E0%A6%BE%E0%A6%9C%E0%A6%BE_%E0%A6%93_%E0%A6%AD%E0%A6%BE%E0%A6%A4.jpg",
      count: "45+ Dishes",
      color: "from-orange-600/80 to-red-700/80"
    },
    {
      name: "Italian Heritage",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&h=400&fit=crop",
      count: "38+ Dishes",
      color: "from-[#6db70e]/80 to-emerald-700/80"
    },
    {
      name: "Pan-Asian Fusion",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
      count: "52+ Dishes",
      color: "from-blue-600/80 to-indigo-700/80"
    },
    {
      name: "Continental Grill",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop",
      count: "29+ Dishes",
      color: "from-purple-600/80 to-slate-800/80"
    }
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Banner Style Header */}
        <motion.div
          className="relative bg-slate-900 dark:bg-[#111111] rounded-[2.5rem] p-12 mb-16 overflow-hidden shadow-2xl border dark:border-[#242424] dark:border-[0.5px] group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative Background Elements - Hidden in dark mode for flat design */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6db70e]/20 dark:hidden rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-[#6db70e]/30 transition-all duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 dark:hidden rounded-full blur-2xl -ml-20 -mb-20 group-hover:bg-[#6db70e]/20 transition-all duration-1000" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[#6db70e] dark:text-[#7ecf55] text-xs font-black uppercase tracking-[0.5em] mb-4 block">International Flavors</span>
            <h2 className="text-4xl md:text-5xl font-black text-white dark:text-[#e0e0e0] mb-6 tracking-tighter leading-tight">
              Explore Global <span className="text-[#6db70e] dark:text-[#7ecf55]">Cuisines</span>
            </h2>
            <p className="text-slate-400 dark:text-[#888888] text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
              Discover flavors from around the world, prepared by local chefs with authentic recipes
            </p>
            <div className="mt-8 h-1.5 w-24 bg-[#6db70e] dark:bg-[#7ecf55] rounded-full" />
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-[1.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-80"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-[#0f0f0f]/40 group-hover:bg-[#0f0f0f]/60 transition-colors duration-500`}></div>
                <div className="absolute inset-0 border-b-8 border-transparent group-hover:border-[#6bcf7f] transition-all duration-500"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white dark:text-[#e8e8e8] z-10">
                <span className="text-[#6db70e] dark:text-[#6bcf7f] text-[10px] font-black uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  {category.count}
                </span>
                <h3 className="text-xl font-black mb-3 tracking-tight group-hover:text-[#6db70e] dark:group-hover:text-[#6bcf7f] transition-colors duration-300">
                  {category.name}
                </h3>
                
                <Link to="/allmeals" className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="px-5 py-2 bg-white/10 dark:bg-[#7ecf55] backdrop-blur-md dark:backdrop-filter-none text-white dark:text-[#0f0f0f] border border-white/20 dark:border-[#7ecf55] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#6db70e] dark:hover:bg-[#5a9c0c] transition-all duration-300">
                    Explore
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;