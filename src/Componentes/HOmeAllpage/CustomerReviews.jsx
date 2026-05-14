import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../Loading';
import axios from 'axios';

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
      <section className="py-24 relative overflow-hidden bg-[#fafafa]">
        {/* Premium Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#6db70e]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Gorgeous Text & CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <span className="inline-block px-4 py-1.5 bg-[#6db70e]/10 text-[#6db70e] text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-6">
                Culinary Insights
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]">
                Be the <span className="text-[#6db70e]">First</span> <br/>
                to Share Your <br/>
                <span className="italic font-serif text-slate-400">Flavor Story</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed opacity-80">
                Our kitchen is buzzing with authentic recipes and local talent. While we await our first review of the season, your feedback could be the inspiration others are looking for.
              </p>
              <button className="group relative px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <span className="relative z-10">Write a Review</span>
                <div className="absolute inset-0 bg-[#6db70e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>

            {/* Right Column: Integrated Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col items-center text-center">
                <div className="text-5xl font-black text-[#6db70e] mb-2 tracking-tighter">
                  {stats.totalMeals}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Total Meals
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center">
                <div className="text-3xl font-black text-[#6db70e] mb-1 tracking-tighter">
                  {stats.totalReviews}
                </div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Reviews
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center">
                <div className="text-3xl font-black text-[#6db70e] mb-1 tracking-tighter">
                  {stats.totalFavorites}
                </div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Favorites
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#6db70e]/5 rounded-full blur-[100px] -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[100px] -ml-24 -mb-24" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#6db70e] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Guest Experiences</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            What Our <span className="text-[#6db70e]">Customers</span> Say
          </h2>
          <div className="h-1.5 w-24 bg-[#6db70e] mx-auto rounded-full shadow-[0_0_15px_rgba(109,183,14,0.3)]" />
        </div>

        <div className="max-w-5xl mx-auto">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={review._id || index} className="px-4 py-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/60 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-slate-50 flex flex-col items-center text-center relative"
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
                  
                  <h3 className="text-2xl md:text-3xl font-black mt-6 mb-4 text-slate-900 tracking-tight leading-tight">
                    {review.title || `"${review.mealName}"`}
                  </h3>
                  
                  <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mb-8 italic opacity-90">
                    "{review.comment}"
                  </p>

                  <div className="flex flex-col items-center">
                    <p className="font-black text-slate-900 uppercase tracking-widest text-xs">
                      {review.reviewerName || 'Anonymous Guest'}
                    </p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                      {review.date ? new Date(review.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Season 2024'}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Stats Section at the bottom */}
        <div className="mt-24 border-t border-slate-50 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-slate-100 flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-black text-[#6db70e] mb-2 tracking-tighter">
                {stats.totalMeals}
              </div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Total Meals
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-slate-100 flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-black text-[#6db70e] mb-2 tracking-tighter">
                {stats.totalReviews}
              </div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Total Reviews
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-slate-100 flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-black text-[#6db70e] mb-2 tracking-tighter">
                {stats.totalFavorites}
              </div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                Total Favorites
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
