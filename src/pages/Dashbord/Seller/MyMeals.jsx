import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../../Componentes/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEdit3, 
  FiTrash2, 
  FiDollarSign, 
  FiClock, 
  FiTag, 
  FiZap,
  FiX,
  FiCheckCircle,
  FiPlusCircle,
  FiStar,
  FiChevronRight,
  FiPackage
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchChefMeals = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-meals/${user.email}`);
        if (res.data.success) {
          setMeals(res.data.data || []);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Failed to sync culinary inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchChefMeals();
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: '<span class="text-slate-900 font-black uppercase tracking-tight">De-register Asset?</span>',
      html: '<p class="text-slate-500 font-medium text-sm">This culinary creation will be permanently removed from the bazaar network.</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#0f172a',
      confirmButtonText: 'Yes, Terminate',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[2rem] border border-slate-100 shadow-2xl',
        confirmButton: 'px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs ml-2',
        cancelButton: 'px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/meals/${id}`);
          if (res.data.success) {
            setMeals((prev) => prev.filter((meal) => meal._id !== id));
            toast.success('Asset de-registered successfully');
          }
        } catch (err) {
          console.error(err);
          toast.error('Protocol termination failed');
        }
      }
    });
  };

  const handleOpenModal = (meal) => setSelectedMeal({ ...meal });
  const handleCloseModal = () => setSelectedMeal(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedMeal || !selectedMeal._id) return;

    setUpdating(true);
    const payload = { ...selectedMeal };
    const id = selectedMeal._id;
    delete payload._id;
    
    // Type conversion
    if (payload.price) payload.price = parseFloat(payload.price);
    if (payload.estimatedDeliveryTime) payload.estimatedDeliveryTime = parseInt(payload.estimatedDeliveryTime);

    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_API}/meals/${id}`, payload);
      if (res.data.success) {
        setMeals(prev => prev.map(m => m._id === id ? { ...m, ...payload } : m));
        handleCloseModal();
        toast.success('Culinary identity re-synchronized!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Identity synchronization failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || My Culinary Assets</title>
      <Toaster position="top-center" />
      
      {/* Cinematic Header */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6db70e]/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-[#6db70e]/10 px-5 py-2 rounded-full border border-[#6db70e]/20">
                <FiZap className="text-[#6db70e] animate-pulse" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6db70e]">Artisan Inventory Active</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
                My <span className="text-[#6db70e]">Meals</span>
              </h1>
              <p className="text-slate-400 font-serif italic text-sm md:text-base max-w-xl">
                Managing your registered culinary products within the LocalChefBazaar network. Current capacity: <span className="text-[#6db70e] font-black">{meals.length} Registered Units</span>.
              </p>
            </div>
            
            <Link 
              to="/dashboard/addmeals"
              className="group flex items-center gap-3 bg-slate-900 dark:bg-[#6db70e] text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all shadow-[#6db70e]/20"
            >
              <FiPlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-500" /> 
              <span>Register New Asset</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {meals.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[3.5rem] p-24 text-center"
          >
            <div className="w-24 h-24 bg-white dark:bg-white/10 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 text-slate-300">
               <FiPackage size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mb-4">Inventory Offline</h3>
            <p className="text-slate-400 font-serif italic mb-10">No culinary assets have been detected in your artisan terminal.</p>
            <Link to="/dashboard/addmeals" className="inline-flex items-center gap-3 text-[#6db70e] font-black uppercase tracking-widest text-[10px] group">
               Initialize First Product <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {meals.map((meal, idx) => (
              <motion.div
                key={meal._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[3rem] overflow-hidden hover:shadow-2xl hover:border-[#6db70e]/30 transition-all duration-500 relative"
              >
                <div className="relative h-72 overflow-hidden">
                   <img
                     src={meal.foodImage}
                     alt={meal.foodName}
                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                   />
                   <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-2 shadow-2xl border border-white/20 dark:border-white/5">
                      <FiDollarSign className="text-[#6db70e]" size={14} />
                      <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">{meal.price}</span>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-10">
                   <div className="flex justify-between items-start mb-6">
                      <div className="min-w-0">
                         <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none truncate mb-2">{meal.foodName}</h3>
                         <div className="flex items-center gap-2">
                           <span className="text-[9px] font-black text-[#6db70e] uppercase tracking-[0.3em]">Serial</span>
                           <span className="text-[10px] font-bold text-slate-400 tracking-wider truncate">{meal.chefId}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-500 font-black text-xs bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                         <FiStar size={14} /> <span>{meal.rating}</span>
                      </div>
                   </div>

                   <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-[#888888]">
                         <div className="w-8 h-8 rounded-xl bg-[#6db70e]/10 flex items-center justify-center text-[#6db70e]">
                            <FiClock size={14} /> 
                         </div>
                         <span>{meal.estimatedDeliveryTime} Minute Delivery Protocol</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-[#888888]">
                         <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <FiTag size={14} />
                         </div>
                         <span className="truncate italic">
                           {Array.isArray(meal.ingredients) ? meal.ingredients.join(' • ') : meal.ingredients}
                         </span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleOpenModal(meal)}
                        className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-[#6db70e] text-white py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-[#6db70e]/20 transition-all active:scale-95"
                      >
                        <FiEdit3 size={14} /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(meal._id)}
                        className="flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                      >
                        <FiTrash2 size={14} /> Remove
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal (Artisan Configuration) */}
      <AnimatePresence>
        {selectedMeal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative bg-white dark:bg-[#151515] w-full max-w-xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-white/10"
            >
               <div className="p-10 md:p-14">
                  <div className="flex items-center justify-between mb-12">
                     <div className="space-y-1">
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Update <span className="text-[#6db70e]">Asset</span></h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#6db70e]">Culinary Re-Synchronization</p>
                     </div>
                     <button onClick={handleCloseModal} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all active:rotate-90">
                        <FiX size={24} />
                     </button>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-6">
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Meal Identity</label>
                           <input 
                             type="text" 
                             name="foodName" 
                             value={selectedMeal.foodName || ''} 
                             onChange={handleChange} 
                             className="w-full bg-slate-50 dark:bg-[#111111] border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none ring-1 ring-slate-100 dark:ring-[#242424] focus:ring-[#6db70e] transition-all" 
                             required 
                           />
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Market Price ($)</label>
                           <input 
                             type="number" 
                             step="0.01"
                             name="price" 
                             value={selectedMeal.price || ''} 
                             onChange={handleChange} 
                             className="w-full bg-slate-50 dark:bg-[#111111] border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none ring-1 ring-slate-100 dark:ring-[#242424] focus:ring-[#6db70e] transition-all" 
                             required 
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Visual Source URL</label>
                        <input 
                          type="text" 
                          name="foodImage" 
                          value={selectedMeal.foodImage || ''} 
                          onChange={handleChange} 
                          className="w-full bg-slate-50 dark:bg-[#111111] border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none ring-1 ring-slate-100 dark:ring-[#242424] focus:ring-[#6db70e] transition-all" 
                          required 
                        />
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Fulfillment Protocol (min)</label>
                        <input 
                          type="number" 
                          name="estimatedDeliveryTime" 
                          value={selectedMeal.estimatedDeliveryTime || ''} 
                          onChange={handleChange} 
                          className="w-full bg-slate-50 dark:bg-[#111111] border-none rounded-2xl px-6 py-4 text-sm font-bold outline-none ring-1 ring-slate-100 dark:ring-[#242424] focus:ring-[#6db70e] transition-all" 
                          required 
                        />
                     </div>

                     <button 
                       type="submit" 
                       disabled={updating}
                       className="w-full py-6 bg-slate-900 dark:bg-[#6db70e] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-[#6db70e]/30 mt-8 flex items-center justify-center gap-3 group disabled:opacity-50"
                     >
                        {updating ? 'Synchronizing...' : <><FiCheckCircle className="group-hover:scale-110 transition-transform" /> Commit Changes</>}
                     </button>
                  </form>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MyMeals;
