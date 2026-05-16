import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiHeart,
  FiUsers,
  FiTruck,
  FiAward,
  FiTarget,
  FiEye,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiThumbsUp,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';

const stats = [
  { icon: <FiUsers />, number: '50K+', label: 'Elite Patrons' },
  { icon: <FiTruck />, number: '100K+', label: 'Bespoke Deliveries' },
  { icon: <FiHeart />, number: '200+', label: 'Master Chefs' },
  { icon: <FiAward />, number: '4.9', label: 'Bazaar Rating' }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & Visionary',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'Pioneering the boutique food movement to connect local talent with global standards.',
    experience: '15+ Years Heritage'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Orchestrating seamless logistics to ensure every meal arrives as a masterpiece.',
    experience: '12+ Years Precision'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Curation Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Scouting the most talented masters to maintain the Bazaar’s elite standards.',
    experience: '10+ Years Hospitality'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'The Inception',
    description: 'LocalChefBazaar was founded as a boutique collective of 5 heritage chefs.',
    icon: <FiHeart />
  },
  {
    year: '2022',
    title: 'Elite Expansion',
    description: 'Attained a 4.9-star rating and launched our premium artisan certification.',
    icon: <FiAward />
  },
  {
    year: '2025',
    title: 'Future Heritage',
    description: 'Leading the global movement for sustainable, boutique home-dining.',
    icon: <FiGlobe />
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] pb-32 transition-colors duration-500">
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden mb-20 bg-slate-50 dark:bg-[#0f0f0f]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#0f0f0f]/50 to-white dark:to-[#0f0f0f] z-20" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/071/458/250/large_2x/chefs-cooking-in-a-professional-kitchen-culinary-team-prepares-food-for-restaurant-service-photo.jpg')] bg-cover bg-center z-10"
        />
        
        {/* Subtle Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7ecf55]/10 dark:bg-[#7ecf55]/5 rounded-full blur-[120px] animate-pulse z-0" />
        
        <div className="relative z-30 text-center px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6db70e] dark:text-[#7ecf55] text-[10px] font-black uppercase tracking-[0.8em] mb-4"
          >
            Bazaar Heritage
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-[#e0e0e0]"
          >
            OUR <span className="text-[#6db70e] dark:text-[#7ecf55]">STORY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 dark:text-[#888888] text-lg md:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            "Cultivating a global community where heritage culinary talent meets the precision of modern luxury dining."
          </motion.p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 md:px-24 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#6db70e] dark:text-[#7ecf55] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">The Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 text-slate-900 dark:text-[#e0e0e0]">Revolutionizing the Art of <span className="text-[#6db70e] dark:text-[#7ecf55]">Everyday Dining</span></h2>
            <p className="text-slate-600 dark:text-[#888888] text-lg leading-relaxed mb-6">
              LocalChefBazaar was born from a simple yet profound realization: the most exquisite flavors aren't found in commercial kitchens, but in the hands of dedicated local masters.
            </p>
            <div className="space-y-4">
              {['Bespoke Ingredient Sourcing', 'Heritage Recipe Preservation', 'Sustainable Elite Logistics'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-[#888888]">
                  <FiCheckCircle className="text-[#6db70e] dark:text-[#7ecf55]" />
                  <span className="text-xs font-black uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="h-[500px] rounded-[3rem] bg-slate-100 dark:bg-[#111111] border dark:border-[#242424] dark:border-[0.5px] overflow-hidden"
            >
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-110 transition-all duration-700" alt="Bazaar Kitchen" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 40 }}
              className="h-[400px] rounded-[3rem] bg-slate-100 dark:bg-[#111111] border dark:border-[#242424] dark:border-[0.5px] overflow-hidden mt-20"
            >
              <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-110 transition-all duration-700" alt="Elite Plating" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-6 md:px-24 mb-40">
        <div className="bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-[3rem] p-16 backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-slate-900 dark:text-[#e0e0e0]">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-[#6db70e] dark:text-[#7ecf55] text-3xl mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-black tracking-tighter mb-2">{stat.number}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-[#888888]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Journey Timeline */}
      <section className="px-6 md:px-24 mb-40">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-xs font-black uppercase tracking-[0.6em] text-[#6db70e] mb-12">The Elite Journey</h3>
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-12 group"
              >
                <div className="w-24 text-2xl font-black tracking-tighter text-[#6db70e] dark:text-[#7ecf55] opacity-40 group-hover:opacity-100 transition-opacity">{m.year}</div>
                <div className="flex-1 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] p-8 rounded-[2rem] group-hover:border-[#7ecf55]/40 transition-all">
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-[#e0e0e0]">{m.title}</h4>
                  <p className="text-slate-500 dark:text-[#888888] text-sm italic">"{m.description}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique CTA */}
      <section className="mt-40 text-center px-6">
        <motion.h2 
          className="text-4xl md:text-6xl font-black tracking-tighter mb-12 text-slate-900 dark:text-[#e0e0e0]"
        >
          JOIN THE <span className="text-[#6db70e] dark:text-[#7ecf55]">COLLECTIVE</span>
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/allmeals">
            <button className="px-12 py-5 bg-[#6db70e] dark:bg-[#7ecf55] text-black dark:text-[#0f0f0f] font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all shadow-[0_20px_40px_rgba(109,183,14,0.3)]">
              Initiate Discovery
            </button>
          </Link>
          <Link to="/chefs">
            <button className="px-12 py-5 border border-slate-200 dark:border-[#242424] text-slate-900 dark:text-[#e0e0e0] font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-[#0f0f0f] transition-all">
              Meet The Masters
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;