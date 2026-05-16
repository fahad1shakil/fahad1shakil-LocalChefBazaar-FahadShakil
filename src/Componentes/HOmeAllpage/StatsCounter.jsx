import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaStar, FaHeart } from 'react-icons/fa';
import axios from 'axios';

const StatsCounter = () => {
  const [stats, setStats] = useState({
    totalMeals: 0,
    totalReviews: 0,
    totalFavorites: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/public-stats`);
        if (res.data?.success) {
          const data = res.data.data;
          setStats({
            totalMeals: data.totalMeals || 0,
            totalReviews: data.totalReviews || 0,
            totalFavorites: data.totalFavorites || 0
          });
        }
      } catch (err) {
        console.error('Stats fetch failed:', err);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    { label: 'Total Meals', value: stats.totalMeals, icon: <FaUtensils />, color: 'text-[#6db70e]' },
    { label: 'Total Reviews', value: stats.totalReviews, icon: <FaStar />, color: 'text-[#6db70e]' },
    { label: 'Total Favorites', value: stats.totalFavorites, icon: <FaHeart />, color: 'text-[#6db70e]' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {statItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#111111] p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center justify-center group hover:shadow-[0_20px_50px_rgba(109,183,14,0.1)] transition-all duration-500"
        >
          <div className={`${item.color} text-4xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
            {item.icon}
          </div>
          <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tighter mb-1">
            {item.value}
          </div>
          <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCounter;
