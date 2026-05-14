import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../Componentes/Loading';
import { FiMail, FiMapPin, FiStar, FiArrowRight, FiUser } from 'react-icons/fi';

const fallbackChefs = [
  {
    _id: 'fallback-1',
    name: 'Chef Arman Hossain',
    role: 'Artisanal Bengali Specialist',
    profileImg: '/chef_arman.png',
    bio: 'Specializing in lost recipes of rural Bengal, Chef Arman brings 15 years of heritage cooking to your table.',
    cuisines: ['Bengali', 'Mughlai', 'Slow-Cooked'],
    email: 'arman.hossain@bazaar.com',
    address: 'Gulshan 2, Dhaka'
  },
  {
    _id: 'fallback-2',
    name: 'Nusrat Jahan',
    role: 'Modern Fusion Pastry Chef',
    profileImg: '/chef_nusrat.png',
    bio: 'Merging traditional spices with French pastry techniques. Known for her Saffron Macarons and Rose Petal tarts.',
    cuisines: ['Pastry', 'Fusion', 'Desserts'],
    email: 'nusrat.j@bazaar.com',
    address: 'Banani, Dhaka'
  },
  {
    _id: 'fallback-3',
    name: 'Sultana Parvin',
    role: 'Master of Spices',
    profileImg: '/chef_sultana.png',
    bio: 'A home-cook turned professional mentor. Sultana specializes in the perfect spice balance of traditional Bhuna.',
    cuisines: ['Authentic', 'Bhuna', 'Local'],
    email: 'sultana.p@bazaar.com',
    address: 'Dhanmondi, Dhaka'
  },
  {
    _id: 'fallback-4',
    name: 'Chef Tariq Ali',
    role: 'Coastal Seafood Expert',
    profileImg: '/chef_tariq.png',
    bio: 'Mastering the art of coastal spices and fresh catches. Tariq brings the vibrant taste of the sea to life.',
    cuisines: ['Seafood', 'Coastal', 'Grill'],
    email: 'tariq.ali@bazaar.com',
    address: 'Coxs Bazar, BD'
  },
  {
    _id: 'fallback-5',
    name: 'Chef Rina Begum',
    role: 'Traditional Pitha Artisan',
    profileImg: '/chef_rina.png',
    bio: 'Preserving the heritage of Bengali sweets. Rina crafts exquisite, hand-made winter pithas all year round.',
    cuisines: ['Sweets', 'Pitha', 'Traditional'],
    email: 'rina.begum@bazaar.com',
    address: 'Old Dhaka, BD'
  },
  {
    _id: 'fallback-6',
    name: 'Chef Zayan',
    role: 'Middle Eastern Fusion',
    profileImg: '/chef_zayan.png',
    bio: 'Blending ancient spices with modern Middle Eastern techniques. Zayan’s grill is a journey through history.',
    cuisines: ['Levantine', 'Fusion', 'Grill'],
    email: 'zayan.chef@bazaar.com',
    address: 'Baridhara, Dhaka'
  },
  {
    _id: 'fallback-7',
    name: 'Chef Meher',
    role: 'Sustainable Organic Master',
    profileImg: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=400&h=400&auto=format&fit=crop',
    bio: 'A farm-to-table pioneer. Meher creates vibrant, soul-healing meals using only 100% organic, local harvest.',
    cuisines: ['Organic', 'Vegan', 'Health'],
    email: 'meher.green@bazaar.com',
    address: 'Uttara, Dhaka'
  },
  {
    _id: 'fallback-8',
    name: 'Chef Kabir',
    role: 'Himalayan Herbal Specialist',
    profileImg: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&h=400&auto=format&fit=crop',
    bio: 'Infusing every dish with the healing power of Himalayan herbs. Kabir brings the energy of the mountains to you.',
    cuisines: ['Herbal', 'Infusion', 'Authentic'],
    email: 'kabir.himalaya@bazaar.com',
    address: 'Sylhet, BD'
  }
];

const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/users/chefs`);
        if (response.data?.success && response.data.data?.length > 0) {
          setChefs(response.data.data);
        } else {
          setChefs(fallbackChefs); // Use premium fallbacks if empty
        }
      } catch (err) {
        console.error('Error fetching chefs:', err);
        setChefs(fallbackChefs); // Use premium fallbacks on error
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] text-slate-900 dark:text-white pb-32 transition-colors duration-500">
      {/* Cinematic Hero Header */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#05070a]/50 to-white dark:to-[#05070a] z-10" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-60 dark:opacity-40"
        />
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6db70e]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] animate-pulse delay-1000" />

        <div className="relative z-20 text-center px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6db70e] text-xs font-black uppercase tracking-[0.8em] mb-6"
          >
            Bazaar Elite Circle
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white"
          >
            MASTER <span className="text-[#6db70e]">CARDS</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-serif italic max-w-2xl mx-auto"
          >
            Discover the culinary storytellers behind every meal. Our chefs are not just cooks; they are keepers of heritage and innovators of flavor.
          </motion.p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {chefs.map((chef, index) => (
              <motion.article
                key={chef._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl hover:bg-white dark:hover:bg-white/10 transition-all duration-500 hover:border-[#6db70e]/30 shadow-2xl"
              >
                {/* Profile Image Section */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={chef.profileImg}
                    alt={chef.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#05070a] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Special Label */}
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#6db70e] text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      Bazaar Verified
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 relative">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-1 group-hover:text-[#6db70e] transition-colors">
                    {chef.name}
                  </h2>
                  <p className="text-[#6db70e] text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                    {chef.role}
                  </p>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 italic">
                    "{chef.bio}"
                  </p>

                  {/* Cuisines Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {chef.cuisines?.map((c, i) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5 group-hover:border-[#6db70e]/20 transition-all">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Contact Info Footer */}
                  <div className="pt-8 border-t border-slate-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <FiMapPin className="text-[#6db70e]" size={16} />
                      <span className="text-xs font-black uppercase tracking-widest truncate">{chef.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <FiMail className="text-[#6db70e]" size={16} />
                      <span className="text-xs font-black tracking-widest truncate">{chef.email}</span>
                    </div>
                  </div>

                  {/* Hover Arrow Overlay */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                    <div className="w-12 h-12 rounded-full bg-[#6db70e] flex items-center justify-center text-black shadow-xl">
                      <FiArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Empty State Hub */}
        {chefs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center"
          >
            <div className="w-32 h-32 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-slate-200 dark:border-white/10">
              <FiUser size={48} className="text-[#6db70e] opacity-40" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 uppercase">The Kitchen is Getting Ready</h3>
            <p className="text-slate-500 dark:text-slate-400 font-serif italic text-lg">Our elite chefs are currently preparing their stories. Check back soon for the grand reveal.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Chefs;