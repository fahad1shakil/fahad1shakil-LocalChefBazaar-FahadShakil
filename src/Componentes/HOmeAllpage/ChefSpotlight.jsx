import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiAward, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ChefSpotlight = () => {
  const featuredChefs = [
    {
      id: 1,
      name: "Chef Sultana Parvin",
      specialty: "Bengali Heritage",
      experience: "22 years",
      rating: 4.9,
      location: "Dhaka North",
      image: "/chef_sultana.png",
      signature: "Traditional Mutton Rezala",
      orders: "3,800+",
      bio: "A master of spices, Sultana brings the authentic, forgotten flavors of rural Bengal to the modern table."
    },
    {
      id: 2,
      name: "Chef Arman Hossain",
      specialty: "Artisanal Grill",
      experience: "14 years",
      rating: 4.8,
      location: "Gulshan",
      image: "/chef_arman.png",
      signature: "Smoked Honey Glazed Lamb",
      orders: "2,100+",
      bio: "Merging traditional clay oven techniques with modern fusion grilling for a unique artisanal experience."
    },
    {
      id: 3,
      name: "Chef Nusrat Jahan",
      specialty: "Gourmet Pastries",
      experience: "11 years",
      rating: 4.9,
      location: "Banani",
      image: "/chef_nusrat.png",
      signature: "Saffron Infused Rasmalai",
      orders: "2,900+",
      bio: "A dedicated pastry artist reimagining traditional sweets into luxury artisanal dessert experiences."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Banner Style Header */}
        <motion.div
          className="relative bg-slate-900 rounded-[2.5rem] p-12 mb-16 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#6db70e]/10 rounded-full blur-3xl -ml-32 -mt-32 group-hover:bg-[#6db70e]/20 transition-all duration-1000" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl -mr-20 -mb-20 group-hover:bg-orange-500/20 transition-all duration-1000" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[#6db70e] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Our Culinary Legends</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
              Meet Our <span className="text-[#6db70e]">Featured Chefs</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80 uppercase tracking-widest">
              Talented local chefs bringing authentic flavors and culinary expertise to your doorstep
            </p>
            <div className="mt-8 h-1.5 w-24 bg-[#6db70e] rounded-full shadow-[0_0_15px_rgba(109,183,14,0.5)]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredChefs.map((chef, index) => (
            <motion.div
              key={chef.id}
              className="group relative bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden m-3 rounded-[2rem]">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/20">
                    <FiStar className="text-[#6db70e] fill-current" size={16} />
                    <span className="font-black text-slate-900 text-sm">{chef.rating}</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 bg-[#6db70e] text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20">
                  {chef.orders} Orders
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 pt-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-[#6db70e] transition-colors duration-300">
                      {chef.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FiMapPin className="text-[#6db70e]" size={14} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {chef.location}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#6db70e]/10 flex items-center justify-center border border-[#6db70e]/20">
                    <FiAward className="text-[#6db70e]" size={20} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-[#6db70e] uppercase tracking-widest">
                    {chef.specialty}
                  </span>
                  <span className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {chef.experience} Exp
                  </span>
                </div>

                <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 mb-6 group-hover:bg-white group-hover:border-[#6db70e]/20 transition-all duration-300">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <div className="w-4 h-[2px] bg-[#6db70e]" /> Signature Dish
                  </h4>
                  <p className="text-slate-900 font-black text-base tracking-tight leading-tight">
                    {chef.signature}
                  </p>
                </div>

                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-8 flex-1 italic opacity-80">
                  "{chef.bio}"
                </p>

                <Link to="/allmeals" className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] hover:bg-[#6db70e] hover:shadow-[0_15px_30px_rgba(109,183,14,0.3)] transition-all duration-300 shadow-lg border border-white/5"
                  >
                    Explore Menu
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/chefs">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-slate-900 text-white font-black rounded-[1.2rem] text-sm uppercase tracking-[0.3em] shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:bg-[#6db70e] hover:shadow-[0_15px_40px_rgba(109,183,14,0.3)] transition-all duration-300"
            >
              Meet All Our Chefs
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ChefSpotlight;