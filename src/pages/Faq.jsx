import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiHelpCircle, FiSearch } from 'react-icons/fi';

const Faq = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const faqs = [
    {
      question: "How do I book a private chef session?",
      answer: "Booking is handled through our elite concierge system. Simply browse our Master Chefs, select your preferred culinary artist, and initiate a 'Consultation Request'. Our team will handle the bespoke arrangements."
    },
    {
      question: "What is the 'Bazaar Concierge' service?",
      answer: "The Bazaar Concierge is our premium support tier. It provides direct access to dedicated staff who handle custom ingredient sourcing, event planning, and emergency culinary assistance for our elite members."
    },
    {
      question: "Are there membership tiers at LocalChefBazaar?",
      answer: "Yes. We offer 'Boutique' and 'Elite' membership tiers. Boutique members enjoy artisanal meal access, while Elite members receive priority booking, bespoke concierge services, and exclusive culinary events."
    },
    {
      question: "How do you vet your Master Chefs?",
      answer: "Every chef undergoes a rigorous 5-step validation process, including heritage recipe auditing, hygiene certification, and a live tasting session with our culinary board of directors."
    },
    {
      question: "Can I request a custom menu for an event?",
      answer: "Absolutely. Our 'Bespoke Events' service allows you to work directly with a Master Chef to curate a signature menu that aligns with your specific vision and dietary requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] text-slate-900 dark:text-white pb-32 transition-colors duration-500">
      {/* Cinematic Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#05070a]/50 to-white dark:to-[#05070a] z-10" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
        />
        
        <div className="relative z-20 text-center px-6">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#6db70e] text-xs font-black uppercase tracking-[0.8em] mb-6"
          >
            Support Archive
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-7xl font-black tracking-tighter mb-8"
          >
            KNOWLEDGE <span className="text-[#6db70e]">HUB</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 dark:text-slate-400 text-lg font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            "Instant clarity for our elite patrons. Explore our repository of common inquiries."
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <button 
                onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                className={`w-full text-left p-8 rounded-[2.5rem] border transition-all duration-500 flex justify-between items-center ${
                  activeTab === index 
                    ? 'bg-[#6db70e] border-[#6db70e] text-black shadow-2xl scale-[1.02]' 
                    : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-[#6db70e]/40'
                }`}
              >
                <span className="text-lg font-black tracking-tight">{faq.question}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  activeTab === index ? 'bg-black text-[#6db70e]' : 'bg-[#6db70e]/10 text-[#6db70e]'
                }`}>
                  {activeTab === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>
              
              {activeTab === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="px-10 py-8 text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic"
                >
                  "{faq.answer}"
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <section className="mt-32 p-16 bg-slate-900 rounded-[3.5rem] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[#6db70e]/5 animate-pulse" />
          <div className="relative z-10">
            <FiHelpCircle className="text-4xl text-[#6db70e] mx-auto mb-6" />
            <h3 className="text-3xl font-black tracking-tighter text-white mb-4">STILL HAVE QUESTIONS?</h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Our senior concierge team is available 24/7 to assist with your bespoke culinary requirements.</p>
            <button className="px-12 py-5 bg-[#6db70e] text-black font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[0_20px_40px_rgba(109,183,14,0.3)]">
              Initiate Direct Consultation
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
