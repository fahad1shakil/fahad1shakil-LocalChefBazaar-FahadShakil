import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiShield, FiHeart, FiTruck, FiStar, FiUsers } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiClock size={32} />,
      title: "Fast Delivery",
      description: "Get your meals delivered in under 30 minutes with our express delivery service."
    },
    {
      icon: <FiShield size={32} />,
      title: "Quality Assured",
      description: "All our meals are prepared with fresh ingredients and highest quality standards."
    },
    {
      icon: <FiHeart size={32} />,
      title: "Made with Love",
      description: "Every dish is crafted with passion by our talented local chefs."
    },
    {
      icon: <FiTruck size={32} />,
      title: "Free Delivery",
      description: "Enjoy free delivery on orders above $25. No hidden charges, just great food."
    },
    {
      icon: <FiStar size={32} />,
      title: "Top Rated",
      description: "Consistently rated 4.9/5 by our satisfied customers across the city."
    },
    {
      icon: <FiUsers size={32} />,
      title: "Local Chefs",
      description: "Supporting local talent and bringing authentic flavors to your doorstep."
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#6db70e] font-bold tracking-wider uppercase text-sm mb-4 block">
            The LocalChefBazaar Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We're committed to delivering exceptional dining experiences, connecting you with the best culinary talent right in your neighborhood.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(109,183,14,0.12)] transition-all duration-300 group border border-slate-100 flex flex-col items-center text-center hover:-translate-y-2 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-slate-50 group-hover:bg-[#6db70e] rounded-full flex items-center justify-center mb-6 transition-colors duration-300">
                <div className="text-[#6db70e] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-[#6db70e] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;