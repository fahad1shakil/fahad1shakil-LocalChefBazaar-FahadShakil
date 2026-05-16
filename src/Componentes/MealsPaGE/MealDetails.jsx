import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../Loading';
import { 
  FiArrowLeft, 
  FiStar, 
  FiClock, 
  FiMapPin, 
  FiUser, 
  FiDollarSign,
  FiHeart,
  FiShoppingCart,
  FiCalendar,
  FiMessageCircle,
  FiThumbsUp,
  FiShare2,
  FiEye
} from 'react-icons/fi';
import { scrollToTop } from '../../utils/smoothScroll';

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedMeals, setRelatedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  });

  // Get images for the gallery
  const getImages = (mainImage) => {
    // If we have additionalImages in the database, use them. 
    // Otherwise, just use the main foodImage.
    if (meal?.additionalImages && Array.isArray(meal.additionalImages) && meal.additionalImages.length > 0) {
      return [mainImage, ...meal.additionalImages];
    }
    // Return only the main image if no others are available
    return [mainImage];
  };

  useEffect(() => {
    scrollToTop({ immediate: true }); // Ensure page starts at top with Lenis
    fetchMealDetails();
    fetchReviews();
  }, [id]); // Only depend on id to avoid infinite loops

  const fetchMealDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/meals/${id}`);
      if (res.data.success) {
        setMeal(res.data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error('Failed to load meal details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/reviews/${id}`);
      setReviews(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRelatedMeals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/meals?limit=4`);
      if (res.data.success) {
        setRelatedMeals(res.data.data.filter(m => m._id !== id).slice(0, 4));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return navigate('/signin');
    }

    if (!reviewData.rating || !reviewData.comment) {
      return toast.error('Rating and comment are required!');
    }

    setReviewLoading(true);

    const newReview = {
      foodId: id,
      mealName: meal.foodName,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      date: new Date().toISOString(),
      reviewerEmail: user?.email || '',
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/reviews`, newReview);
      toast.success('Review added successfully!');
      setReviewData({ rating: 0, comment: '' });
      fetchReviews();
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!user) {
      toast.error('Please sign in to add favorites');
      return navigate('/signin');
    }
    
    if (!meal) return toast.error('Meal not loaded yet');

    const favData = {
      userEmail: user.email,
      mealId: meal._id.toString(),
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/favorites`, favData);
      if (res.data.success) {
        toast.success('Added to favorites!');
      } else {
        toast.error(res.data.message || 'Failed to add to favorites');
      }
    } catch (err) {
      console.error('Favorite add error:', err);
      toast.error(err.response?.data?.message || 'Failed to add to favorites');
    }
  };

  const handleOrderNow = () => {
    if (!user) {
      toast.error('Please sign in to place an order');
      return navigate('/signin');
    }
    navigate(`/order/${meal._id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meal.foodName,
        text: `Check out this delicious meal: ${meal.foodName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : meal?.rating || 0;

  if (loading) return <Loading />;
  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  const images = getImages(meal.foodImage);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] font-sans transition-colors duration-500">
      {/* Header */}
      <div className="bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md border-b border-slate-100 dark:border-[#242424] dark:border-[0.5px] sticky top-[100px] z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 text-slate-500 dark:text-[#888888] hover:text-[#6db70e] dark:hover:text-[#7ecf55] transition-all duration-300 cursor-pointer group"
            >
              <div className="p-2 bg-slate-100 dark:bg-[#151515] rounded-xl group-hover:bg-[#6db70e]/10 dark:group-hover:bg-[#7ecf55]/10 group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55]">
                <FiArrowLeft size={20} />
              </div>
              <span className="font-black uppercase tracking-widest text-xs">Back to Marketplace</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-3 px-5 py-2.5 bg-slate-900 dark:bg-[#151515] text-white dark:text-[#e0e0e0] rounded-xl hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] dark:hover:text-[#0f0f0f] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_8px_20px_rgba(109,183,14,0.3)] font-black uppercase tracking-widest text-[10px] border dark:border-[#242424] dark:border-[0.5px]"
              >
                <FiShare2 size={16} />
                <span>Share Dish</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] group">
                <img
                  src={images[currentImageIndex] || meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 right-6 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] px-5 py-2 rounded-2xl shadow-xl border-2 border-[#5a9c0c] dark:border-[#7ecf55]/30 backdrop-blur-sm z-10">
                  <div className="flex items-center gap-2">
                    <FiStar className="fill-current" size={20} />
                    <span className="font-black text-xl tracking-tighter">{averageRating}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 relative w-24 h-24 overflow-hidden rounded-2xl transition-all duration-300 border-4 ${
                        currentImageIndex === index 
                          ? 'border-[#6db70e] dark:border-[#7ecf55] shadow-lg scale-105' 
                          : 'border-white dark:border-[#242424] hover:border-slate-200 dark:hover:border-[#7ecf55]/30'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${meal.foodName} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Meal Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {/* Title and Price */}
              <div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-[#e0e0e0] mb-6 tracking-tight leading-tight">
                  {meal.foodName}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 mb-4">
                  {/* PRICE HIGHLIGHT */}
                  <div className="bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] px-7 py-3.5 rounded-[1.5rem] shadow-[0_15px_30px_rgba(109,183,14,0.25)] border-2 border-white/20 dark:border-[#7ecf55]/30 transform hover:scale-105 transition-all duration-500 group">
                    <div className="flex items-center gap-2 mb-0.5">
                      <div className="h-0.5 w-6 bg-white/50 dark:bg-[#121212]/50 rounded-full" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Premium Price</span>
                    </div>
                    <span className="text-3xl font-black tracking-tighter block">
                      ${meal.price}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#111111] px-4 py-2 rounded-xl text-slate-400 dark:text-[#888888] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] font-bold uppercase tracking-widest text-[10px] shadow-sm">
                      <FiEye className="text-[#6db70e] dark:text-[#7ecf55]" />
                      <span>Verified Fresh</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-[#111111] px-4 py-2 rounded-xl text-slate-400 dark:text-[#888888] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] font-bold uppercase tracking-widest text-[10px] shadow-sm">
                      <FiStar className="text-yellow-500" />
                      <span>Top Rated Dish</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#111111] p-4 rounded-[1.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 dark:border-[#242424] dark:border-[0.5px] hover:border-[#6db70e]/20 dark:hover:border-[#7ecf55]/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <FiClock size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest leading-none mb-1">Speed</p>
                      <p className="text-base font-black text-slate-900 dark:text-[#e0e0e0] tracking-tight">
                        {meal.estimatedDeliveryTime} mins
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#111111] p-4 rounded-[1.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 dark:border-[#242424] dark:border-[0.5px] hover:border-[#6db70e]/20 dark:hover:border-[#7ecf55]/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 text-[#6db70e] dark:text-[#7ecf55] rounded-xl group-hover:bg-[#6db70e] dark:group-hover:bg-[#7ecf55] group-hover:text-white dark:group-hover:text-[#0f0f0f] transition-all">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest leading-none mb-1">Zone</p>
                      <p className="text-base font-black text-slate-900 dark:text-[#e0e0e0] tracking-tight">
                        {meal.deliveryArea || 'Local'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chef Information */}
              <div className="bg-white dark:bg-[#111111] p-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 bg-slate-50 dark:bg-[#111111] text-slate-300 dark:text-[#888888] rounded-bl-[1.2rem] group-hover:bg-[#6db70e]/10 dark:group-hover:bg-[#7ecf55]/10 group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-all">
                  <FiUser size={18} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-900 dark:bg-[#111111] rounded-xl flex items-center justify-center text-white dark:text-[#e0e0e0] shadow-xl relative overflow-hidden border dark:border-[#242424] dark:border-[0.5px]">
                     <div className="absolute inset-0 bg-[#6db70e]/20 dark:bg-[#7ecf55]/20" />
                     <span className="text-xl font-black relative z-10">{meal.chefName?.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tight">
                      {meal.chefName}
                    </h3>
                    <p className="text-[#6db70e] dark:text-[#7ecf55] font-black uppercase tracking-widest text-[9px]">
                      Master Chef • {meal.chefExperience} Yrs Exp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* ORDER BUTTON HIGHLIGHT */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOrderNow}
                  className="flex-2 flex items-center justify-center gap-3 bg-slate-900 dark:bg-[#111111] text-white dark:text-[#e0e0e0] hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] dark:hover:text-[#0f0f0f] px-8 py-4.5 rounded-[1.5rem] font-black text-lg shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_35px_rgba(109,183,14,0.3)] transition-all duration-500 cursor-pointer group border-2 border-white/10 dark:border-[#242424] dark:border-[0.5px]"
                >
                  <FiShoppingCart className="group-hover:rotate-12 transition-transform" />
                  <span>{user ? 'Secure Checkout' : 'Login to Order'}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddFavorite}
                  className="flex-1 items-center justify-center gap-3 bg-white dark:bg-[#111111] text-slate-900 dark:text-[#e0e0e0] border-2 border-slate-100 dark:border-[#242424] dark:border-[0.5px] px-6 py-4.5 rounded-[1.5rem] font-black hover:border-red-500 hover:text-red-500 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl flex"
                >
                  <FiHeart size={22} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
          {/* Description & Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Description */}
            <div className="bg-white dark:bg-[#111111] p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
              <h2 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-6 tracking-tight uppercase">
                Chef's <span className="text-[#6db70e] dark:text-[#7ecf55]">Story</span>
              </h2>
              <div className="prose max-w-none">
                <p className="text-slate-500 dark:text-[#888888] font-medium text-base leading-relaxed mb-4">
                  Indulge in our signature {meal.foodName}, a culinary masterpiece crafted with passion and expertise by Chef {meal.chefName}. This delectable dish combines the finest ingredients to create an unforgettable dining experience.
                </p>
                <p className="text-slate-500 dark:text-[#888888] font-medium text-base leading-relaxed">
                  Prepared using traditional cooking methods and premium ingredients, this meal represents the perfect balance of flavor, nutrition, and presentation.
                </p>
              </div>

              {/* Ingredients */}
              {meal.ingredients && (
                <div className="mt-8 pt-8 border-t border-slate-50">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Premium Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(meal.ingredients) ? meal.ingredients : meal.ingredients.split(',')).map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-slate-50 dark:bg-[#121212] text-slate-700 dark:text-[#888888] rounded-xl text-[11px] font-black border border-slate-50 dark:border-[#242424] dark:border-[0.5px] hover:border-[#6db70e] dark:hover:border-[#7ecf55] hover:bg-[#6db70e]/5 dark:hover:bg-[#7ecf55]/5 transition-all cursor-default"
                      >
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Reviews & Ratings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Rating Summary */}
            <div className="bg-white dark:bg-[#111111] p-7 rounded-[2rem] shadow-[0_8px_30px_rgba(109,183,14,0.08)] border-2 border-[#6db70e]/10 dark:border-[#7ecf55]/10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6db70e]/5 dark:bg-[#7ecf55]/5 rounded-full blur-2xl" />
              <h3 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-6 tracking-tight uppercase">
                Guest <span className="text-[#6db70e] dark:text-[#7ecf55]">Rating</span>
              </h3>
              <div className="text-center">
                <div className="text-5xl font-black text-[#6db70e] dark:text-[#7ecf55] mb-2 tracking-tighter">
                  {averageRating}
                </div>
                <div className="flex justify-center gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      size={18}
                      className={`${
                        star <= Math.round(averageRating)
                          ? 'text-[#6db70e] dark:text-[#7ecf55] fill-current'
                          : 'text-slate-200 dark:text-[#242424]'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px]">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>

            {/* Leave Review */}
            <div className="bg-white dark:bg-[#111111] p-7 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
              <h3 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-6 tracking-tight uppercase">
                Your <span className="text-[#6db70e] dark:text-[#7ecf55]">Opinion</span>
              </h3>
              {user ? (
                <div className="space-y-5">
                  <div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewData({ ...reviewData, rating: star })}
                          className={`text-2xl transition-all transform hover:scale-110 ${
                            star <= reviewData.rating
                              ? 'text-[#6db70e] dark:text-[#7ecf55]'
                              : 'text-slate-100 dark:text-[#242424]'
                          }`}
                        >
                          <FiStar className={star <= reviewData.rating ? 'fill-current' : ''} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      placeholder="Your feedback..."
                      rows="3"
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-[#111111] border-2 border-slate-50 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none resize-none text-sm"
                    />
                  </div>
                  
                  <button
                    onClick={handleReviewSubmit}
                    disabled={reviewLoading}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 dark:bg-[#111111] text-white dark:text-[#e0e0e0] px-6 py-3.5 rounded-xl font-black hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] dark:hover:text-[#0f0f0f] transition-all text-sm uppercase tracking-widest shadow-lg disabled:opacity-50 cursor-pointer border dark:border-[#242424] dark:border-[0.5px]"
                  >
                    {reviewLoading ? 'Sending...' : 'Post Review'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <button
                    onClick={() => navigate('/signin')}
                    className="px-8 py-3 bg-slate-900 dark:bg-[#111111] text-white dark:text-[#e0e0e0] rounded-xl font-black hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] dark:hover:text-[#0f0f0f] transition-all text-xs uppercase tracking-widest border dark:border-[#242424] dark:border-[0.5px]"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedMeals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="p-8 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
              <h2 className="text-2xl font-black text-slate-900 dark:text-[#e0e0e0] mb-8 tracking-tight uppercase">
                Related <span className="text-[#6db70e] dark:text-[#7ecf55]">Pairings</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedMeals.map((relatedMeal) => (
                  <Link
                    key={relatedMeal._id}
                    to={`/mealsd/${relatedMeal._id}`}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-50 dark:bg-[#111111] border border-slate-50 dark:border-[#242424] dark:border-[0.5px] group-hover:border-[#6db70e]/20 dark:group-hover:border-[#7ecf55]/20 transition-all duration-500">
                      <img
                        src={relatedMeal.foodImage}
                        alt={relatedMeal.foodName}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="p-4">
                        <h3 className="font-black text-sm text-slate-900 dark:text-[#e0e0e0] mb-2 line-clamp-1 group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors">
                          {relatedMeal.foodName}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-[#6db70e] dark:text-[#7ecf55] font-black text-base tracking-tighter">
                            ${relatedMeal.price}
                          </span>
                          <div className="flex items-center gap-1 bg-white dark:bg-[#111111] px-2 py-0.5 rounded border border-slate-50 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
                            <FiStar className="text-yellow-500 fill-current text-[10px]" />
                            <span className="text-[10px] font-black text-slate-900 dark:text-[#e0e0e0]">
                              {relatedMeal.rating || '4.5'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
