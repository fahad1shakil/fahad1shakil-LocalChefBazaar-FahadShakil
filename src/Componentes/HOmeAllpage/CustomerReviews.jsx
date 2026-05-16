import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../Loading';
import axios from 'axios';
import { FaUtensils, FaStar, FaHeart } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars || (i === fullStars && clampedRating % 1 >= 0.5)) {
      stars.push(
        <span key={i} className="text-yellow-500">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-300">
          ★
        </span>
      );
    }
  }

  return <div className="inline-flex text-xl">{stars}</div>;
};

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ totalMeals: 0, totalReviews: 0, totalFavorites: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsRes, statsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_API}/reviews/latest`),
          axios.get(`${import.meta.env.VITE_BACKEND_API}/public-stats`)
        ]);

        if (reviewsRes.data?.success) setReviews(reviewsRes.data.data);
        if (statsRes.data?.success) setStats(statsRes.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Data fetch failed:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  if (reviews.length === 0)
    return (
      <section className="py-24 relative overflow-hidden bg-[#fafafa] dark:bg-[#0f0f0f] transition-colors duration-500">
        {/* Premium Background Accents - Hidden in dark mode */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6db70e]/10 dark:hidden rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:hidden rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Gorgeous Text & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <span className="inline-block px-4 py-1.5 bg-[#6db70e]/10 dark:bg-[#6bcf7f]/10 text-[#6db70e] dark:text-[#6bcf7f] text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6 border dark:border-[#242424]">
                Culinary Insights
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-[#e0e0e0] mb-8 tracking-tighter leading-[0.95]">
                Be the <span className="text-[#6db70e] dark:text-[#6bcf7f]">First</span> <br/>
                to Share Your <br/>
                <span className="italic font-serif text-slate-400 dark:text-[#8a8a8a]">Flavor Story</span>
              </h2>
              <p className="text-slate-500 dark:text-[#8a8a8a] text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed opacity-80">
                Our kitchen is buzzing with authentic recipes and local talent. While we await our first review of the season, your feedback could be the inspiration others are looking for.
              </p>
              <button className="group relative px-10 py-5 bg-slate-900 dark:bg-[#6bcf7f] text-white dark:text-[#0f0f0f] rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <span className="relative z-10">Write a Review</span>
                <div className="absolute inset-0 bg-[#6db70e] dark:bg-[#5ab86e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>

            {/* Right Column: Integrated Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center text-center group hover:shadow-[#6db70e]/10 transition-all duration-500">
                <div className="text-[#6db70e] text-3xl mb-4 group-hover:scale-110 transition-transform">
                  <FaUtensils />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] mb-2 tracking-tighter">
                  {stats.totalMeals}
                </div>
                <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
                  Total Meals
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center text-center group hover:shadow-[#6db70e]/10 transition-all duration-500">
                <div className="text-[#6db70e] text-3xl mb-4 group-hover:scale-110 transition-transform">
                  <FaStar />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] mb-2 tracking-tighter">
                  {stats.totalReviews}
                </div>
                <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
                  Reviews
                </div>
              </div>

              <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-[#242424] flex flex-col items-center text-center group hover:shadow-[#6db70e]/10 transition-all duration-500">
                <div className="text-[#6db70e] text-3xl mb-4 group-hover:scale-110 transition-transform">
                  <FaHeart />
                </div>
                <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] mb-2 tracking-tighter">
                  {stats.totalFavorites}
                </div>
                <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
                  Favorites
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      {/* Background Decorative Elements - Hidden in dark mode */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#6db70e]/5 dark:hidden rounded-full blur-[100px] -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-500/5 dark:hidden rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#6db70e] dark:text-[#7ecf55] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Guest Experiences</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-[#e0e0e0] mb-6 tracking-tighter">
            What Our <span className="text-[#6db70e] dark:text-[#7ecf55]">Customers</span> Say
          </h2>
          <div className="h-1.5 w-24 bg-[#6db70e] dark:bg-[#7ecf55] mx-auto rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={review._id || index} className="px-4 py-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/60 dark:bg-[#111111] backdrop-blur-xl dark:backdrop-filter-none p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-50 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center text-center relative"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-10 left-10 text-6xl text-[#6db70e]/10 font-serif leading-none">"</div>
                  
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-[#6db70e]/20 rounded-full blur-xl scale-125" />
                    <img
                      src={review.reviewerImage || 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=User'}
                      alt={review.reviewerName}
                      className="w-24 h-24 rounded-full object-cover relative z-10 border-4 border-white shadow-xl"
                    />
                  </div>

                  <StarRating rating={review.rating} />
                  
                  <h3 className="text-2xl md:text-3xl font-black mt-6 mb-4 text-slate-900 dark:text-[#e8e8e8] tracking-tight leading-tight">
                    {review.title || `"${review.mealName}"`}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-[#888888] text-lg md:text-xl font-medium leading-relaxed max-w-3xl mb-8 italic opacity-90">
                    "{review.comment}"
                  </p>

                  <div className="flex flex-col items-center">
                    <p className="font-black text-slate-900 dark:text-[#e8e8e8] uppercase tracking-widest text-xs">
                      {review.reviewerName || 'Anonymous Guest'}
                    </p>
                    <p className="text-[9px] font-black text-slate-400 dark:text-[#555] uppercase tracking-[0.2em] mt-2">
                      {review.date ? new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Season 2024'}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Stats Section at the bottom */}
        <div className="mt-24 border-t border-slate-50 dark:border-[#242424] dark:border-[0.5px] pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#111111] p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center justify-center group hover:shadow-[0_20px_50px_rgba(109,183,14,0.1)] transition-all duration-500"
            >
              <div className="text-[#6db70e] text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <FaUtensils />
              </div>
              <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tighter mb-1">
                {stats.totalMeals}
              </div>
              <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
                Total Meals
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#111111] p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center justify-center group hover:shadow-[0_20px_50px_rgba(109,183,14,0.1)] transition-all duration-500"
            >
              <div className="text-[#6db70e] text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <FaStar />
              </div>
              <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tighter mb-1">
                {stats.totalReviews}
              </div>
              <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
                Total Reviews
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#111111] p-8 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center justify-center group hover:shadow-[0_20px_50px_rgba(109,183,14,0.1)] transition-all duration-500"
            >
              <div className="text-[#6db70e] text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">
                <FaHeart />
              </div>
              <div className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tighter mb-1">
                {stats.totalFavorites}
              </div>
              <div className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.3em]">
                Total Favorites
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
