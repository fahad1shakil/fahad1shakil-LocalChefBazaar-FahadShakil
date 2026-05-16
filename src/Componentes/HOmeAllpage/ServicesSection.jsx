import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiAward, FiZap } from 'react-icons/fi';

const ServicesSection = () => {
  const services = [
    {
      icon: <FiTruck />,
      title: 'Premium Delivery',
      description: 'White-glove express delivery for your gourmet home-cooked meals',
      features: ['15-Min Priority Dispatch', 'Real-Time GPS Tracking', 'Insulated Luxury Packaging'],
      color: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400"
    },
    {
      icon: <FiShield />,
      title: 'Chef Certification',
      description: 'Every home chef is strictly verified for hygiene and culinary skill',
      features: ['Background Verified', 'Kitchen Quality Audits', 'Safety First Standard'],
      color: "bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400"
    },
    {
      icon: <FiAward />,
      title: 'Boutique Catering',
      description: 'Exquisite culinary arrangements for your private events and galas',
      features: ['Custom Menu Design', 'Live Chef Experience', 'Elegant Presentation'],
      color: "bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400"
    },
    {
      icon: <FiZap />,
      title: 'Instant Subscriptions',
      description: 'Curated weekly meal plans tailored to your specific dietary needs',
      features: ['No-Commitment Pause', 'Nutritional Tracking', 'Priority Member Access'],
      color: "bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 text-[#6db70e] dark:text-[#7ecf55]"
    },
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Banner Style Header */}
        <motion.div
          className="relative bg-slate-900 dark:bg-[#111111] rounded-[2.5rem] p-12 mb-16 overflow-hidden shadow-2xl border dark:border-[#242424] dark:border-[0.5px] group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Decorative Background Elements - Hidden in dark mode */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-[#6db70e]/10 dark:hidden rounded-full blur-3xl -ml-32 -mt-32 group-hover:bg-[#6db70e]/20 transition-all duration-1000" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 dark:hidden rounded-full blur-2xl -mr-20 -mb-20 group-hover:bg-blue-500/20 transition-all duration-1000" />
          
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[#6db70e] dark:text-[#7ecf55] text-xs font-black uppercase tracking-[0.5em] mb-4 block">Premium Logistics</span>
            <h2 className="text-4xl md:text-5xl font-black text-white dark:text-[#e0e0e0] mb-6 tracking-tighter leading-tight uppercase">
              Our Exclusive <span className="text-[#6db70e] dark:text-[#7ecf55]">Services</span>
            </h2>
            <p className="text-slate-400 dark:text-[#888888] text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80 uppercase tracking-widest">
              From quick deliveries to personalized meal planning, we've got you covered
            </p>
            <div className="mt-8 h-1.5 w-24 bg-[#6db70e] dark:bg-[#7ecf55] rounded-full" />
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-[#242424] dark:border-[0.5px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg border border-white/20 dark:border-[#242424]`}>
                {service.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black mb-3 text-slate-900 dark:text-[#e0e0e0] tracking-tighter group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-[#888888] font-medium mb-8 leading-relaxed flex-1 italic opacity-80">
                "{service.description}"
              </p>

              {/* Features List */}
              <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-[#242424]">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-center text-[10px] font-black text-slate-400 dark:text-[#555] uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-[#e8e8e8] transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6db70e] dark:bg-[#7ecf55] mr-3" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Interactive Decoration */}
              <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-[2px] bg-[#6db70e] dark:bg-[#7ecf55] rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
