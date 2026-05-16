import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TipsSlider = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/meals/latest`)
      .then((res) => res.json())
      .then((data) => setMeals(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 py-8 bg-white dark:bg-[#0f0f0f] transition-colors duration-500 rounded-3xl shadow-xl">
      <h2 className="text-4xl font-black text-center mb-12 text-slate-900 dark:text-[#e0e0e0] tracking-tighter uppercase">
        🍴 Featured <span className="text-[#6db70e] dark:text-[#7ecf55]">Dishes</span>
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-3xl"
      >
        {meals.map((meal) => (
          <SwiperSlide key={meal._id}>
            <div className="flex flex-col md:flex-row items-center border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-3xl p-6 md:p-10 bg-white dark:bg-[#111111] shadow-lg hover:shadow-[#6db70e]/20 transition duration-500 gap-6 md:gap-10">
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tight">
                  {meal.foodName}
                </h3>
                <p className="text-[#6db70e] dark:text-[#7ecf55] font-black uppercase tracking-widest text-xs">
                  By Chef {meal.chefName}
                </p>
                <p className="text-slate-500 dark:text-[#888888] text-sm font-medium">
                  Estimated Delivery: <span className="text-slate-900 dark:text-[#e8e8e8] font-bold">{meal.estimatedDeliveryTime} min</span>
                </p>

                <div className="text-sm text-slate-500 dark:text-[#8a8a8a] space-y-3 pt-6 border-t border-slate-50 dark:border-[#242424] dark:border-[0.5px]">
                  <p className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-[#e0e0e0] uppercase text-[10px] tracking-widest w-24">
                      💰 Price:
                    </span>
                    <span className="text-[#6db70e] dark:text-[#7ecf55] font-black">${meal.price}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-[#e0e0e0] uppercase text-[10px] tracking-widest w-24">
                      ⭐ Rating:
                    </span>
                    <span className="text-slate-900 dark:text-[#e8e8e8] font-bold">{meal.rating || 'New Release'}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="font-black text-slate-900 dark:text-[#e0e0e0] uppercase text-[10px] tracking-widest w-24 shrink-0">
                      🧾 Essentials:
                    </span>
                    <span className="text-slate-500 dark:text-[#8a8a8a] text-xs font-medium italic">{meal.ingredients.join(', ')}</span>
                  </p>
                </div>
              </div>

              <div className="flex-1 relative group">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl transform transition duration-700 group-hover:scale-105 shadow-lg border-2 border-white dark:border-[#242424]"
                />
                <div className="absolute inset-0 bg-[#6db70e]/10 rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TipsSlider;
