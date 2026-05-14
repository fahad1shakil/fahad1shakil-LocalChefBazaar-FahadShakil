import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiAward, FiZap, FiCheck } from 'react-icons/fi';

const ServicesSection = () => {
  const services = [
    {
      icon: <FiTruck />,
      title: 'Premium Delivery',
      description: 'White-glove express delivery for your gourmet home-cooked meals',
      features: ['15-Min Priority Dispatch', 'Real-Time GPS Tracking', 'Insulated Luxury Packaging'],
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <FiShield />,
      title: 'Chef Certification',
      description: 'Every home chef is strictly verified for hygiene and culinary skill',
      features: ['Background Verified', 'Kitchen Quality Audits', 'Safety First Standard'],
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <FiAward />,
      title: 'Boutique Catering',
      description: 'Exquisite culinary arrangements for your private events and galas',
      features: ['Custom Menu Design', 'Live Chef Experience', 'Elegant Presentation'],
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: <FiZap />,
      title: 'Instant Subscriptions',
      description: 'Curated weekly meal plans tailored to your specific dietary needs',
      features: ['No-Commitment Pause', 'Nutritional Tracking', 'Priority Member Access'],
      color: "bg-[#6db70e]/10 text-[#6db70e]"
    },
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
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl -mr-20 -mb-20 group-hover:bg-blue-500/20 transition-all duration-1000" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[#6db70e] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Premium Logistics</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
              Our Exclusive <span className="text-[#6db70e]">Services</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80 uppercase tracking-widest">
              From quick deliveries to personalized meal planning, we've got you covered
            </p>
            <div className="mt-8 h-1.5 w-24 bg-[#6db70e] rounded-full shadow-[0_0_15px_rgba(109,183,14,0.5)]" />
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg border border-white/20`}>
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black mb-3 text-slate-900 tracking-tighter group-hover:text-[#6db70e] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed flex-1 italic opacity-80">
                "{service.description}"
              </p>

              {/* Features List */}
              <div className="space-y-3 pt-6 border-t border-slate-50">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6db70e] mr-3 shadow-[0_0_8px_rgba(109,183,14,0.6)]" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Interactive Decoration */}
              <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-[2px] bg-[#6db70e] rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
