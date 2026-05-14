import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/smoothScroll';
import { FiArrowRight, FiClock, FiStar, FiUser } from 'react-icons/fi';

const DalySixDataDB = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/meals/latest`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.data.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSeeAllMeals = () => {
    scrollToTop();
  };

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#6db70e] font-bold tracking-wider uppercase text-sm mb-4 block">
            Fresh & Local
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
            Today's <span className="text-[#6db70e]">Specials</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Handpicked, freshly prepared meals from our top local chefs. Available for immediate delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {meals.map((meal) => (
            <Link
              key={meal._id}
              to={`/mealsd/${meal._id}`}
              onClick={scrollToTop}
              className="bg-white rounded-[2rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(109,183,14,0.12)] transform hover:-translate-y-2 transition-all duration-300 flex flex-col border border-slate-100 group"
            >
              <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-6">
                <img
                  src={meal.foodImage || 'https://via.placeholder.com/400x250'}
                  alt={meal.foodName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                  <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
                  <span className="text-sm font-bold text-slate-800">{meal.rating}</span>
                </div>
              </div>
              
              <div className="px-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#6db70e] transition-colors duration-300 line-clamp-1 pr-4">
                    {meal.foodName}
                  </h3>
                  <span className="text-xl font-black text-[#6db70e]">
                    ${meal.price}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-5 text-slate-500 text-sm font-medium">
                   <div className="flex items-center gap-1.5">
                     <FiUser className="text-[#6db70e]" />
                     <span>Chef {meal.chefName}</span>
                   </div>
                   <span>•</span>
                   <div className="flex items-center gap-1.5">
                     <FiClock className="text-[#6db70e]" />
                     <span>{meal.estimatedDeliveryTime} mins</span>
                   </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                   {meal.ingredients?.slice(0, 3).map((ing, i) => (
                     <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
                       {ing}
                     </span>
                   ))}
                   {meal.ingredients?.length > 3 && (
                     <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
                       +{meal.ingredients.length - 3} more
                     </span>
                   )}
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between group-hover:border-[#6db70e]/20 transition-colors">
                   <span className="text-sm font-bold text-slate-900 group-hover:text-[#6db70e] transition-colors">View Details</span>
                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#6db70e] group-hover:text-white transition-colors duration-300 text-slate-400">
                     <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See All Meals Button */}
        <div className="flex justify-center mt-16">
          <Link to="/allmeals" onClick={handleSeeAllMeals}>
            <button className="group relative px-10 py-4 bg-gradient-to-r from-[#6db70e] to-[#4a8208] text-white rounded-full font-black text-xl shadow-[0_10px_40px_rgba(109,183,14,0.4)] hover:shadow-[0_20px_50px_rgba(109,183,14,0.7)] transition-all overflow-hidden flex items-center gap-4 border border-white/20 cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#7cd112] to-[#6db70e] transition-opacity duration-500" />
              <span className="relative z-10 tracking-wide">Explore Full Menu</span>
              <div className="relative z-10 bg-white/20 p-2 rounded-full group-hover:bg-white group-hover:text-[#6db70e] transition-all duration-300 shadow-inner">
                <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DalySixDataDB;
