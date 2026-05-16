import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck, FiX, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '7ecdb9b5-f537-4155-ab8c-745a33ca4a13');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('from_name', 'LocalChefBazaar Contact Form');
      formDataToSend.append('to_name', 'LocalChefBazaar Team');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Concierge notified. We will reach out shortly.', {
          icon: '💎',
          duration: 5000,
          style: {
            background: '#05070a',
            color: '#6db70e',
            border: '1px solid #6db70e',
            fontWeight: 'bold',
          },
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Transmission failed. Please attempt again.', {
        icon: '⚠️',
        duration: 4000,
        style: {
          background: '#05070a',
          color: '#ff4444',
          border: '1px solid #ff4444',
          fontWeight: 'bold',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiPhone />,
      title: "Direct Line",
      details: ["+880 1619 221 217"],
      tag: "Urgent"
    },
    {
      icon: <FiMail />,
      title: "Digital Inquiries",
      details: ["fahad1shakiL@gmail.com"],
      tag: "Standard"
    },
    {
      icon: <FiMapPin />,
      title: "Bazaar Headquarters",
      details: ["Narayanganj, Bangladesh"],
      tag: "Visit"
    },
    {
      icon: <FiClock />,
      title: "Concierge Hours",
      details: ["Mon-Fri: 8:00 AM - 10:00 PM"],
      tag: "Service"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] pb-32 transition-colors duration-500">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20 bg-slate-50 dark:bg-[#0f0f0f]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#0f0f0f]/50 to-white dark:to-[#0f0f0f] z-10" />
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"
        />
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7ecf55]/10 dark:bg-[#7ecf55]/5 rounded-full blur-[120px] animate-pulse" />
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
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 dark:text-[#e0e0e0]"
          >
            GET IN <span className="text-[#6db70e] dark:text-[#7ecf55]">TOUCH</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 dark:text-[#888888] text-lg md:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            "Connecting you with the elite culinary masters of the Bazaar. Our concierge team is standing by to curate your experience."
          </motion.p>
        </div>
      </section>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-[2.5rem] hover:border-[#7ecf55]/40 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#7ecf55]/10 flex items-center justify-center text-[#6db70e] dark:text-[#7ecf55] group-hover:bg-[#7ecf55] group-hover:text-[#0f0f0f] transition-all">
                    {info.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-[#888888] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] px-3 py-1 rounded-full">{info.tag}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-[#e0e0e0] mb-4">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-slate-500 dark:text-[#888888] text-sm font-medium mb-1 truncate">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Contact Form Main */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-[3.5rem] p-10 md:p-16 backdrop-blur-xl"
          >
            <div className="mb-12">
              <span className="text-[#6db70e] dark:text-[#7ecf55] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Secure Transmission</span>
              <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-[#e0e0e0] mb-4">SEND A <span className="text-[#6db70e] dark:text-[#7ecf55]">MESSAGE</span></h2>
              <p className="text-slate-500 dark:text-[#888888] font-serif italic">Your inquiry will be handled by our senior concierge staff.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Identity</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-8 py-5 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#242424] rounded-full text-slate-900 dark:text-white focus:border-[#6db70e] outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Digital Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-8 py-5 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#242424] rounded-full text-slate-900 dark:text-white focus:border-[#6db70e] outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Inquiry Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-8 py-5 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#242424] rounded-full text-slate-900 dark:text-white focus:border-[#6db70e] outline-none transition-all"
                  placeholder="How can we assist you?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-8 py-6 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#242424] rounded-[2.5rem] text-slate-900 dark:text-white focus:border-[#6db70e] outline-none transition-all resize-none"
                  placeholder="Details of your request..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-6 font-black uppercase tracking-[0.4em] text-xs rounded-full transition-all flex items-center justify-center gap-3 ${
                  isSubmitting 
                    ? 'bg-slate-200 dark:bg-[#161616] text-slate-400' 
                    : 'bg-[#6db70e] dark:bg-[#7ecf55] text-black dark:text-[#0f0f0f] shadow-[0_20px_40px_rgba(109,183,14,0.3)] hover:bg-slate-900 hover:text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-400 border-t-transparent" />
                ) : (
                  <>
                    <FiSend />
                    Initiate Transmission
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Google Map Section */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-[500px] rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-[#242424] shadow-2xl relative"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116946.33519808388!2d90.44357738221877!3d23.619643534571997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b1103ba03409%3A0xaf09995392e22f20!2sNarayanganj!5e0!3m2!1sen!2sbd!4v1715714342132!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute top-8 left-8 bg-white dark:bg-[#0f0f0f] p-6 rounded-[2rem] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] backdrop-blur-md shadow-xl hidden md:block">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#6db70e] dark:text-[#7ecf55] mb-2">Bazaar Location</h4>
              <p className="text-lg font-black tracking-tight text-slate-900 dark:text-[#e0e0e0]">Narayanganj, Bangladesh</p>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section Redesign */}
        <section className="mt-40 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-black tracking-tighter text-slate-900 dark:text-[#e0e0e0] mb-8"
          >
            IMMEDIATE <span className="text-[#6db70e] dark:text-[#7ecf55]">ASSISTANCE?</span>
          </motion.h2>
          <p className="text-slate-500 dark:text-[#888888] text-sm mb-12">Browse our curated repository of common inquiries for instant resolution.</p>
          <Link to="/faq">
            <button className="px-12 py-5 border border-slate-200 dark:border-[#242424] text-slate-900 dark:text-[#e0e0e0] font-black rounded-full text-xs uppercase tracking-[0.3em] hover:bg-[#6db70e] dark:hover:bg-[#7ecf55] hover:text-black dark:hover:text-[#0f0f0f] hover:border-[#6db70e] dark:hover:border-[#7ecf55] transition-all">
              Consult FAQ Archive
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Contact;