import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiCalendar, 
  FiGift, 
  FiCoffee, 
  FiTruck, 
  FiClock, 
  FiShield, 
  FiHeart, 
  FiCheck,
  FiArrowRight,
  FiZap
} from 'react-icons/fi';

const Services = () => {
  const mainServices = [
    {
      icon: <FiZap className="text-4xl" />,
      title: "Bespoke Delivery",
      description: "Artisanal meals delivered via our elite courier network within 30 minutes.",
      features: ["Real-time concierge tracking", "Climate-controlled transport", "Contactless signature service"],
      price: "Complimentary on elite orders",
      tag: "PREMIUM"
    },
    {
      icon: <FiCalendar className="text-4xl" />,
      title: "Curated Subscriptions",
      description: "Personalized weekly and monthly culinary plans tailored to your palette.",
      features: ["Dedicated menu curator", "Flexible frequency", "Artisanal ingredient sourcing"],
      price: "Starting at $120 / week",
      tag: "SIGNATURE"
    },
    {
      icon: <FiGift className="text-4xl" />,
      title: "Bazaar Events",
      description: "Full-scale catering solutions for your most prestigious gatherings.",
      features: ["On-site chef preparation", "Custom menu architecture", "Professional event styling"],
      price: "Bespoke pricing available",
      tag: "ELITE"
    },
    {
      icon: <FiCoffee className="text-4xl" />,
      title: "Master Mentorship",
      description: "One-on-one culinary sessions with our most decorated master chefs.",
      features: ["Private technical training", "Heritage recipe discovery", "Nutrition & wellness audit"],
      price: "$150 / private session",
      tag: "MASTERS"
    }
  ];

  const additionalServices = [
    { icon: <FiTruck />, title: "Flash Logistic", desc: "15-minute priority arrival" },
    { icon: <FiClock />, title: "Time Capsule", desc: "Advance scheduling up to 14 days" },
    { icon: <FiShield />, title: "Elite Protocol", desc: "100% satisfaction guarantee" },
    { icon: <FiHeart />, title: "Wellness Hub", desc: "Dietary-specific medical grade prep" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-slate-900 dark:text-white pb-32 transition-colors duration-500">
      {/* Cinematic Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mb-20 bg-slate-50 dark:bg-[#0f0f0f]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#0f0f0f]/50 to-white dark:to-[#0f0f0f] z-10" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
        />
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6db70e]/10 dark:bg-[#7ecf55]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] animate-pulse delay-1000 dark:hidden" />

        <div className="relative z-20 text-center px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6db70e] dark:text-[#7ecf55] text-xs font-black uppercase tracking-[0.8em] mb-6"
          >
            Bazaar Concierge
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-white"
          >
            ELITE <span className="text-[#6db70e] dark:text-[#7ecf55]">SERVICES</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-white text-lg md:text-xl font-serif italic max-w-2xl mx-auto"
          >
            "Elevating everyday dining into a world-class boutique experience through meticulous service and culinary excellence."
          </motion.p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="px-6 md:px-24 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-[2.5rem] p-10 backdrop-blur-md hover:border-[#6db70e] dark:hover:border-[#7ecf55] transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-20 h-20 rounded-3xl bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 flex items-center justify-center text-[#6db70e] dark:text-[#7ecf55] group-hover:scale-110 group-hover:bg-[#6db70e] dark:group-hover:bg-[#7ecf55] group-hover:text-white dark:group-hover:text-[#0f0f0f] transition-all duration-500">
                  {service.icon}
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-[#6db70e] dark:text-[#7ecf55] border border-[#6db70e]/30 dark:border-[#7ecf55]/30 px-4 py-2 rounded-full">
                  {service.tag}
                </span>
              </div>

              <h3 className="text-3xl font-black tracking-tight mb-4 text-slate-950 dark:text-white group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-700 dark:text-white text-lg mb-10 leading-relaxed max-w-sm">
                {service.description}
              </p>

              <div className="space-y-4 mb-12">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-800 dark:text-white">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6db70e] dark:bg-[#7ecf55]" />
                    <span className="text-sm font-bold uppercase tracking-widest text-[10px]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-200 dark:border-[#242424] flex justify-between items-center">
                <span className="text-[#6db70e] dark:text-[#7ecf55] text-sm font-black uppercase tracking-widest">{service.price}</span>
                <Link to="/contact" className="w-12 h-12 rounded-full border border-slate-200 dark:border-[#242424] flex items-center justify-center text-slate-900 dark:text-white hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] hover:text-white dark:hover:text-[#0f0f0f] hover:border-[#6db70e] dark:hover:border-[#7ecf55] transition-all">
                  <FiArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features Bar */}
      <section className="px-6 md:px-24">
        <div className="bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-[3rem] p-12 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {additionalServices.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-[#6db70e] dark:text-[#7ecf55] mb-6 flex justify-center text-3xl group-hover:scale-125 transition-transform duration-500">
                  {service.icon}
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-2 text-slate-950 dark:text-white">{service.title}</h4>
                <p className="text-slate-700 dark:text-white text-[10px] uppercase tracking-widest">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique CTA */}
      <section className="mt-40 text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter mb-12 text-slate-950 dark:text-white"
        >
          READY TO <span className="text-[#6db70e] dark:text-[#7ecf55]">EXPERIENCE</span> ELITE?
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/allmeals">
            <button className="px-12 py-5 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-slate-900 hover:text-white transition-all shadow-[0_20px_40px_rgba(109,183,14,0.3)] border dark:border-[#7ecf55]/30">
              Initiate Order
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-12 py-5 border border-slate-200 dark:border-[#242424] text-slate-900 dark:text-white font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-[#0f0f0f] hover:border-[#6db70e] dark:hover:border-[#7ecf55] transition-all">
              Consult Concierge
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
