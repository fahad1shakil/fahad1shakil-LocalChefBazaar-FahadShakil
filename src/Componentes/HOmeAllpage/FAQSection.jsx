import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiHelpCircle, FiArrowRight } from 'react-icons/fi';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Default first open for boutique feel

  const faqs = [
    {
      question: "How does LocalChefBazaar ensure food quality?",
      answer: "Quality is our obsession. Every chef undergoes a rigorous 3-step verification process, including a professional kitchen inspection and a taste-test by our culinary panel. We only partner with chefs who share our commitment to hygiene and excellence."
    },
    {
      question: "Can I customize my meals for specific dietary needs?",
      answer: "Absolutely. Our platform allows you to filter by 'Gluten-Free', 'High-Protein', or 'Organic Only'. Additionally, you can leave private notes for your chef to adjust spice levels or omit specific ingredients during checkout."
    },
    {
      question: "What is your delivery range and typical timing?",
      answer: "We focus on ultra-local delivery to ensure peak freshness. Most meals are delivered within a 5-8km radius of the chef's kitchen, typically arriving within 35-45 minutes of preparation to maintain that just-cooked temperature."
    },
    {
      question: "How do you support local sustainable farming?",
      answer: "We prioritize 'Bazaar Verified' chefs who source at least 60% of their ingredients from our network of local organic growers. By reducing food miles, we ensure your meal has a lower carbon footprint and higher nutrient density."
    },
    {
      question: "What happens if I'm not satisfied with my experience?",
      answer: "We stand by our community. Our 'Chef-to-Table' promise ensures that if your experience isn't extraordinary, our boutique support team will handle a full resolution—whether it's a replacement or a complete refund—within 24 hours."
    },
    {
      question: "Is there a subscription for regular gourmet meals?",
      answer: "Yes, our 'Bazaar Elite' membership offers curated weekly meal plans. You get priority delivery slots, exclusive access to limited-edition seasonal dishes, and a 15% flat discount on all orders from our top-rated chefs."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 px-4 bg-white relative overflow-hidden">
      {/* Dynamic Brand Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6db70e]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header - Boutique Style */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[#6db70e] text-3xl md:text-4xl font-bold mb-4 font-serif italic block">
            Got questions?
          </span>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6">
            Frequently Asked <span className="text-[#6db70e]">Questions</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about joining the world's most exclusive local culinary community.
          </p>
        </motion.div>

        {/* FAQ Grid - Dynamic Layout */}
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                className={`
                  rounded-[2.5rem] border transition-all duration-500
                  ${isOpen 
                    ? 'bg-slate-900 border-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.3)]' 
                    : 'bg-white border-slate-100 hover:border-[#6db70e]/30 shadow-sm'}
                `}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 md:px-12 py-8 text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <span className={`
                      text-lg font-black transition-colors duration-300
                      ${isOpen ? 'text-[#6db70e]' : 'text-slate-300 group-hover:text-[#6db70e]'}
                    `}>
                      0{index + 1}
                    </span>
                    <h3 className={`
                      text-xl md:text-2xl font-black tracking-tight transition-colors duration-300
                      ${isOpen ? 'text-white' : 'text-slate-800'}
                    `}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                    ${isOpen ? 'bg-[#6db70e] text-white rotate-180' : 'bg-slate-50 text-slate-400'}
                  `}>
                    {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 md:px-12 pb-10 ml-14">
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                        <motion.button 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mt-6 flex items-center gap-2 text-[#6db70e] text-xs font-black uppercase tracking-widest hover:gap-4 transition-all"
                        >
                          Learn more about this <FiArrowRight />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA */}
        <motion.div 
          className="mt-20 text-center p-12 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="text-slate-500 font-medium mb-6">Still have a question that isn't listed here?</p>
          <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-full uppercase text-xs tracking-widest hover:bg-[#6db70e] transition-all flex items-center gap-3 mx-auto shadow-xl">
            <FiHelpCircle size={18} /> Contact Boutique Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;