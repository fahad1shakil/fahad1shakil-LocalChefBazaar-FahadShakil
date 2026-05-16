import React, { useEffect, useState } from 'react';

const HomeStats = () => {
  const [stats, setStats] = useState({
    mealsCount: 0,
    reviewsCount: 0,
    favoritesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/public-stats`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats({
            mealsCount: data.data.totalMeals,
            reviewsCount: data.data.totalReviews,
            favoritesCount: data.data.totalFavorites,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-gray-50 dark:bg-[#111111] rounded-[2rem] shadow-lg p-8 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-[#242424] dark:border-[0.5px]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#6db70e] dark:text-[#7ecf55] tracking-tighter">
            {stats.mealsCount}
          </h2>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-gray-700 dark:text-[#888888]">
            Total Meals
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-[#111111] rounded-[2rem] shadow-lg p-8 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-[#242424] dark:border-[0.5px]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#6db70e] dark:text-[#7ecf55] tracking-tighter">
            {stats.reviewsCount}
          </h2>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-gray-700 dark:text-[#888888]">
            Total Reviews
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-[#111111] rounded-[2rem] shadow-lg p-8 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-[#242424] dark:border-[0.5px]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#6db70e] dark:text-[#7ecf55] tracking-tighter">
            {stats.favoritesCount}
          </h2>
          <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-gray-700 dark:text-[#888888]">
            Total Favorites
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
