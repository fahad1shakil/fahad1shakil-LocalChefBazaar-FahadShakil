import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/smoothScroll';
import { FiArrowRight, FiClock, FiStar, FiUser } from 'react-icons/fi';

const DalySixDataDB = () => {
  const [meals, setMeals] = useState([]);

  const fallbackMeals = [
    {
      _id: 'fb-m1',
      foodName: 'Rustic Beef Curry',
      foodImage: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
      price: 15,
      rating: 4.8,
      chefName: 'Arman',
      estimatedDeliveryTime: 45,
      ingredients: ['Beef', 'Spices', 'Organic Oil']
    },
    {
      _id: 'fb-m2',
      foodName: 'Mughlai Pulao',
      foodImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400',
      price: 12,
      rating: 4.7,
      chefName: 'Sultana',
      estimatedDeliveryTime: 30,
      ingredients: ['Rice', 'Saffron', 'Rose Water']
    },
    {
      _id: 'fb-m3',
      foodName: 'Winter Pitha Platter',
      foodImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      price: 10,
      rating: 4.9,
      chefName: 'Rina',
      estimatedDeliveryTime: 25,
      ingredients: ['Rice Flour', 'Jaggery', 'Coconut']
    }
  ];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/meals/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.data)) {
          setMeals(data.data.slice(0, 6));
        } else {
          setMeals(fallbackMeals);
        }
      })
      .catch((err) => {
        console.error(err);
        setMeals(fallbackMeals);
      });
  }, []);

  const handleSeeAllMeals = () => {
    scrollToTop();
  };

  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#6db70e] dark:text-[#7ecf55] font-bold tracking-wider uppercase text-sm mb-4 block">
            Fresh & Local
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-[#e0e0e0] tracking-tight">
            Today's <span className="text-[#6db70e] dark:text-[#7ecf55]">Specials</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-[#888888] max-w-2xl mx-auto leading-relaxed">
            Handpicked, freshly prepared meals from our top local chefs. Available for immediate delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {meals.map((meal) => (
            <Link
              key={meal._id}
              to={`/mealsd/${meal._id}`}
              onClick={scrollToTop}
              className="bg-white dark:bg-[#111111] rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col border border-slate-100 dark:border-[#242424] dark:border-[0.5px] group"
            >
              <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-6">
                <img
                  src={meal.foodImage || 'https://via.placeholder.com/400x250'}
                  alt={meal.foodName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border dark:border-[#242424] dark:border-[0.5px]">
                  <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
                  <span className="text-sm font-bold text-slate-800 dark:text-[#e8e8e8]">{meal.rating}</span>
                </div>
              </div>
              
              <div className="px-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-[#e0e0e0] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors duration-300 line-clamp-1 pr-4">
                    {meal.foodName}
                  </h3>
                  <span className="text-xl font-black text-[#6db70e] dark:text-[#7ecf55]">
                    ${meal.price}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-5 text-slate-500 dark:text-[#8a8a8a] text-sm font-medium">
                   <div className="flex items-center gap-1.5">
                     <FiUser className="text-[#6db70e] dark:text-[#7ecf55]" />
                     <span>Chef {meal.chefName}</span>
                   </div>
                   <span>•</span>
                   <div className="flex items-center gap-1.5">
                     <FiClock className="text-[#6db70e] dark:text-[#7ecf55]" />
                     <span>{meal.estimatedDeliveryTime} mins</span>
                   </div>
                </div>

                {/* Premium Ingredients */}
                <div className="mb-4 h-[80px] overflow-hidden">
                  <p className="text-[9px] font-black text-[#6db70e] dark:text-[#7ecf55] uppercase tracking-[0.2em] mb-2.5">Premium Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {meal.ingredients?.slice(0, 4).map((ing, i) => (
                      <span 
                        key={i} 
                        className="max-w-[120px] truncate px-3 py-1 bg-slate-50 dark:bg-[#0f0f0f] text-slate-600 dark:text-[#888888] text-[10px] font-black rounded-lg border border-slate-100 dark:border-[#242424] dark:border-[0.5px] group-hover:bg-[#6db70e]/5 group-hover:border-[#6db70e]/20 group-hover:text-[#6db70e] transition-all duration-300"
                        title={ing}
                      >
                        {ing}
                      </span>
                    ))}
                    {meal.ingredients?.length > 4 && (
                      <span className="px-3 py-1 bg-slate-50 dark:bg-[#0f0f0f] text-slate-600 dark:text-[#888888] text-[10px] font-black rounded-lg border border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
                        +{meal.ingredients.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex items-center justify-between group-hover:border-[#6db70e]/20 transition-colors">
                   <span className="text-sm font-bold text-slate-900 dark:text-[#e0e0e0] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors">View Details</span>
                   <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-[#0f0f0f] flex items-center justify-center group-hover:bg-[#6db70e] dark:group-hover:bg-[#7ecf55] group-hover:text-white dark:group-hover:text-[#0f0f0f] transition-colors duration-300 text-slate-400 border dark:border-[#242424] dark:border-[0.5px]">
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
            <button className="group relative px-10 py-4 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] rounded-full font-black text-xl shadow-xl hover:scale-105 transition-all overflow-hidden flex items-center gap-4 border border-white/20 dark:border-[#242424] dark:border-[0.5px] cursor-pointer">
              <span className="relative z-10 tracking-wide">Explore Full Menu</span>
              <div className="relative z-10 bg-white/20 dark:bg-[#0f0f0f]/20 p-2 rounded-full group-hover:bg-white dark:group-hover:bg-white transition-all duration-300 shadow-inner group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55]">
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
