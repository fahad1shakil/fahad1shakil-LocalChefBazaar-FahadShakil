import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FiImage, 
  FiDollarSign, 
  FiClock, 
  FiMapPin, 
  FiUser, 
  FiStar, 
  FiPlusCircle,
  FiZap,
  FiPackage,
  FiChevronRight
} from 'react-icons/fi';
import { FaUtensils } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AddMeals = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      chefName: user?.displayName || '',
      userEmail: user?.email || '',
    },
  });

  const foodImageFile = watch('foodImage');

  // Handle image preview
  React.useEffect(() => {
    if (foodImageFile && foodImageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(foodImageFile[0]);
    }
  }, [foodImageFile]);

  const generateChefId = (email, foodName) => {
    const emailPart = email.substring(0, 3).toLowerCase();
    const lengthPart = foodName.length;
    const timestamp = Date.now().toString().slice(-4);
    return `${emailPart}${lengthPart}${timestamp}`;
  };

  const onSubmit = async (data) => {
    if (!data.foodImage[0]) return toast.error('Culinary visual required!');
    setLoading(true);

    const formData = new FormData();
    formData.append('image', data.foodImage[0]);

    try {
      const apiKey = '4069702c25ccc162b662f2c5ce170f8d';
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      const imageUrl = response.data.data.url;
      const chefId = generateChefId(user?.email || '', data.foodName);

      const finalData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating || 0),
        ingredients: data.ingredients.split(',').map((item) => item.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: chefId,
        userEmail: user?.email || '',
        createdAt: new Date(),
        deliveryArea: data.deliveryArea,
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_API}/meals`, finalData);

      toast.success('Culinary masterpiece registered!');
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Manifestation failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || Register Culinary Product</title>
      <Toaster position="top-center" />

      {/* Cinematic Header */}
      <div className="relative h-[45vh] flex items-center justify-center overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#121212]/50 to-white dark:to-[#121212] z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-20 grayscale" />
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6db70e]/10 rounded-full blur-[120px] animate-pulse" />

        <div className="relative z-20 text-center px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6db70e] text-[10px] md:text-xs font-black uppercase tracking-[0.8em] mb-4 font-serif italic"
          >
            Culinary Manifestation
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white uppercase leading-none"
          >
            CREATE <span className="text-[#6db70e]">MEAL</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-4 bg-[#6db70e]/10 px-6 py-2 rounded-full border border-[#6db70e]/20 mx-auto w-max">
            <FiZap className="text-[#6db70e] animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#6db70e]">Artisan Registration Protocol Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-10 md:p-14 rounded-[3.5rem] shadow-sm relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <FiPlusCircle size={120} />
             </div>

             <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Food Name */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FaUtensils className="text-[#6db70e]" /> Culinary Product Name
                      </label>
                      <input
                        type="text"
                        {...register('foodName', { required: true })}
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all"
                        placeholder="e.g., Artisanal Bengali Thali"
                      />
                      {errors.foodName && <span className="text-red-500 text-[10px] font-bold uppercase">Required</span>}
                   </div>

                   {/* Chef Name */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FiUser className="text-[#6db70e]" /> Artisan Identity
                      </label>
                      <input
                        type="text"
                        {...register('chefName', { required: true })}
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* Price */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FiDollarSign className="text-[#6db70e]" /> Valuation
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register('price', { required: true })}
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all"
                        placeholder="0.00"
                      />
                   </div>

                   {/* Delivery Time */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FiClock className="text-[#6db70e]" /> Temporal Mark
                      </label>
                      <input
                        type="text"
                        {...register('estimatedDeliveryTime', { required: true })}
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all"
                        placeholder="e.g., 45 min"
                      />
                   </div>

                   {/* Rating (Hidden or preset) */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FiStar className="text-[#6db70e]" /> Initial Reputation
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('rating')}
                        className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-2xl px-6 py-4 text-sm font-bold text-slate-400 cursor-not-allowed outline-none"
                        readOnly
                      />
                   </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                     <FiPackage className="text-[#6db70e]" /> Component Inventory (Comma Separated)
                   </label>
                   <textarea
                     rows="3"
                     {...register('ingredients', { required: true })}
                     className="w-full bg-white dark:bg-slate-800 border-none rounded-[2rem] px-8 py-6 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all resize-none"
                     placeholder="e.g., Organic Rice, Fresh Saffron, Himalayan Salt..."
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Experience */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FiZap className="text-[#6db70e]" /> Professional Tenure
                      </label>
                      <input
                        type="text"
                        {...register('chefExperience', { required: true })}
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all"
                        placeholder="e.g., 8+ Years of Craft"
                      />
                   </div>

                   {/* Delivery Area */}
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <FiMapPin className="text-[#6db70e]" /> Operational Sector
                      </label>
                      <input
                        type="text"
                        {...register('deliveryArea', { required: true })}
                        className="w-full bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm font-bold shadow-sm ring-1 ring-slate-100 dark:ring-white/5 focus:ring-2 focus:ring-[#6db70e] outline-none transition-all"
                        placeholder="e.g., Dhaka North, Gulshan"
                      />
                   </div>
                </div>

                {/* File Upload */}
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                     <FiImage className="text-[#6db70e]" /> Culinary Visualization
                   </label>
                   <div className="relative group">
                      <input
                        type="file"
                        {...register('foodImage', { required: true })}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      <div className="w-full bg-white dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2.5rem] py-12 flex flex-col items-center justify-center gap-4 transition-all group-hover:border-[#6db70e]/40 group-hover:bg-[#6db70e]/5">
                         <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#6db70e] transition-colors">
                            <FiPlusCircle size={32} />
                         </div>
                         <div className="text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Upload Visual Asset</p>
                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">PNG, JPG up to 10MB</p>
                         </div>
                      </div>
                   </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-slate-900 dark:bg-[#6db70e] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-[#6db70e]/30 flex items-center justify-center gap-4 group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Manifest Culinary Product
                      <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
             </form>
          </motion.div>

          {/* Preview Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 sticky top-10"
          >
             <div className="bg-slate-900 dark:bg-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#6db70e]/20 rounded-full blur-[80px] -mr-24 -mt-24" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                   <h3 className="text-2xl font-black tracking-tighter text-white dark:text-slate-900 uppercase leading-none mb-2">Live Preview</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#6db70e] mb-10">Bazaar Visualization</p>
                   
                   <div className="flex-1 flex flex-col items-center justify-center">
                      <AnimatePresence mode="wait">
                        {imagePreview ? (
                          <motion.div 
                            key="preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full aspect-square rounded-[2.5rem] overflow-hidden border-4 border-white/10 dark:border-slate-100 shadow-2xl"
                          >
                             <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="placeholder"
                            className="w-full aspect-square rounded-[2.5rem] bg-white/5 dark:bg-slate-50 border-4 border-dashed border-white/10 dark:border-slate-200 flex flex-col items-center justify-center gap-6"
                          >
                             <FiImage size={64} className="text-white/10 dark:text-slate-200" />
                             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 dark:text-slate-300">Awaiting Visual Input</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>

                   <div className="mt-10 pt-10 border-t border-white/10 dark:border-slate-100 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Merchant Status</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#6db70e]">Verified</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Network Reach</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Global Bazaar</span>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AddMeals;
