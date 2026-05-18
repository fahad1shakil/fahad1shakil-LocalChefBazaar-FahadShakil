
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiShoppingBag, FiArrowLeft, FiRefreshCw } from 'react-icons/fi';

const PaymentCancel = () => {
  return (
    <div className="min-h-[80vh] py-12 px-4 flex items-center justify-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white dark:bg-[#111111] rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-[#242424] dark:border-[0.5px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-colors duration-500 overflow-hidden relative text-center"
      >
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-red-500/5 rounded-full blur-[80px] -mr-24 -mt-24 -z-10" />
        <div className="absolute bottom-0 left-0 w-[180px] h-[180px] bg-amber-500/5 rounded-full blur-[60px] -ml-20 -mb-20 -z-10" />

        {/* Cancel Icon */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-20 h-20 bg-red-500/10 dark:bg-red-500/10 rounded-full animate-pulse opacity-75"></div>
            <div className="w-16 h-16 bg-red-500/20 dark:bg-red-500/10 border border-red-500/30 dark:border-red-500/20 rounded-full flex items-center justify-center z-10 shadow-lg shadow-red-500/10">
              <FiAlertCircle className="text-red-500" size={36} />
            </div>
          </motion.div>
        </div>

        {/* Title & Description */}
        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2 block">
          Transaction Terminated
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
          Payment <span className="text-red-500">Cancelled</span>
        </h1>
        <p className="text-slate-500 dark:text-[#888888] font-medium text-sm leading-relaxed mb-8">
          Your culinary purchase protocol was cancelled by the user or terminated by the checkout system. No charges were processed.
        </p>

        {/* Quick info block */}
        <div className="bg-slate-50 dark:bg-[#0f0f0f] rounded-2xl p-4 border border-slate-200 dark:border-[#242424] dark:border-[0.5px] mb-8 text-xs font-semibold text-slate-500 dark:text-[#888888] flex items-center gap-3 justify-center">
          <FiRefreshCw size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>You can safely retry this payment in your orders</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/myorder"
            className="w-full bg-slate-950 dark:bg-[#0f0f0f] hover:bg-[#161616] dark:hover:bg-[#161616] text-white dark:text-[#e0e0e0] border border-slate-800 dark:border-[#242424] dark:border-[0.5px] py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiShoppingBag size={14} />
            <span>Go to My Orders</span>
          </Link>
          <Link
            to="/allmeals"
            className="w-full bg-slate-100 dark:bg-[#161616] hover:bg-slate-200 dark:hover:bg-[#202020] text-slate-700 dark:text-[#e0e0e0] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiArrowLeft size={14} />
            <span>Browse Bazaar Menu</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
