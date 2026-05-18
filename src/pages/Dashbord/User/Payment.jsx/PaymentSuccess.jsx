import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiShoppingBag, 
  FiArrowRight, 
  FiUser, 
  FiMapPin, 
  FiHash, 
  FiDollarSign, 
  FiClock, 
  FiTerminal,
  FiCopy,
  FiCheck
} from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setError('Invalid payment protocol session reference');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/verify-payment/${sessionId}`
        );

        if (res.data && res.data.success) {
          setOrder(res.data.data);
        } else {
          setError(res.data?.message || 'Payment verification failed');
        }
      } catch (err) {
        console.error(err);
        setError('Database synchronization error. Please contact Bazaar support.');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  const handleCopySession = () => {
    if (!sessionId) return;
    navigator.clipboard.writeText(sessionId);
    setCopied(true);
    toast.success('Session ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative flex items-center justify-center mb-6">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-[#242424] border-t-[#6db70e] dark:border-t-[#7ecf55] rounded-full animate-spin"></div>
          <div className="absolute w-8 h-8 bg-white dark:bg-[#0f0f0f] rounded-full"></div>
        </div>
        <h2 className="text-lg font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 animate-pulse">
          Synchronizing Transaction...
        </h2>
        <p className="text-xs text-slate-400 font-serif italic mt-2">
          Securing your culinary acquisition data
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
        <div className="text-5xl mb-6">⚠️</div>
        <h2 className="text-2xl font-black uppercase tracking-tighter text-red-500 mb-3">
          Verification Failed
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-8 leading-relaxed">
          {error || 'We could not synchronize this payment session in our records.'}
        </p>
        <div className="flex gap-4 w-full">
          <Link
            to="/dashboard/myorder"
            className="flex-1 bg-slate-900 dark:bg-[#111111] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] text-slate-100 hover:text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all"
          >
            My Orders
          </Link>
          <Link
            to="/allmeals"
            className="flex-1 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all shadow-md"
          >
            Bazaar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] py-12 px-4 flex items-center justify-center font-sans">
      <Toaster position="top-center" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white dark:bg-[#111111] rounded-[2.5rem] p-6 md:p-12 border border-slate-200 dark:border-[#242424] dark:border-[0.5px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-colors duration-500 overflow-hidden relative"
      >
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#6db70e]/5 dark:bg-[#7ecf55]/5 rounded-full blur-[100px] -mr-32 -mt-32 -z-10" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#6db70e]/5 dark:bg-[#7ecf55]/5 rounded-full blur-[80px] -ml-24 -mb-24 -z-10" />

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-20 h-20 bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 rounded-full animate-ping opacity-75"></div>
            <div className="w-16 h-16 bg-[#6db70e]/20 dark:bg-[#7ecf55]/10 border border-[#6db70e]/30 dark:border-[#7ecf55]/20 rounded-full flex items-center justify-center z-10 shadow-lg shadow-[#6db70e]/10">
              <FiCheckCircle className="text-[#6db70e] dark:text-[#7ecf55]" size={36} />
            </div>
          </motion.div>
        </div>

        {/* Header Title */}
        <div className="text-center mb-10">
          <span className="text-[10px] font-black text-[#6db70e] dark:text-[#7ecf55] uppercase tracking-[0.4em] mb-2 block">
            Payment Completed
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-4">
            Transaction <span className="text-[#6db70e] dark:text-[#7ecf55]">Synchronized</span>
          </h1>
          <p className="text-slate-500 dark:text-[#888888] font-bold text-xs uppercase tracking-[0.15em] max-w-md mx-auto leading-relaxed">
            Your gourmet order has been logged and is awaiting preparation
          </p>
        </div>

        {/* Receipt / Invoice Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-50 dark:bg-[#0f0f0f] rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-[#242424] dark:border-[0.5px] mb-8 font-sans"
        >
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-dashed border-slate-200 dark:border-[#242424]">
            <div className="flex items-center gap-2">
              <FiTerminal className="text-[#6db70e] dark:text-[#7ecf55]" size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Invoice Summary</span>
            </div>
            <span className="text-[9px] font-black bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 text-[#6db70e] dark:text-[#7ecf55] px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#6db70e]/20 dark:border-[#7ecf55]/20 shadow-sm">
              Status: PAID
            </span>
          </div>

          <div className="space-y-4">
            {/* Meal info */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[9px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-wider block">Acquisition Meal</span>
                <span className="text-sm font-black text-slate-800 dark:text-[#e0e0e0] uppercase tracking-tight">{order.mealName}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-wider block">Quantity</span>
                <span className="text-sm font-black text-slate-800 dark:text-[#e0e0e0]">{order.quantity} Units</span>
              </div>
            </div>

            {/* Chef info */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 dark:border-[#242424]/40">
              <div>
                <span className="text-[9px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-wider block">Master Chef</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-slate-700 dark:text-[#b0b0b0]">
                  <FiUser className="text-[#6db70e] dark:text-[#7ecf55]" size={12} />
                  <span>{order.chefName}</span>
                </div>
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-wider block">Estimated Delivery</span>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs font-bold text-slate-700 dark:text-[#b0b0b0]">
                  <FiClock className="text-slate-900 dark:text-[#7ecf55]" size={12} />
                  <span>{order.deliveryTime || '30'} mins</span>
                </div>
              </div>
            </div>

            {/* Address */}
            {order.userAddress && (
              <div className="pt-3 border-t border-slate-100 dark:border-[#242424]/40">
                <span className="text-[9px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-wider block">Delivery Destination</span>
                <div className="flex items-start gap-2 mt-0.5 text-xs font-semibold text-slate-600 dark:text-[#999999] leading-relaxed">
                  <FiMapPin className="text-red-500 mt-0.5 shrink-0" size={12} />
                  <span className="line-clamp-2">{order.userAddress}</span>
                </div>
              </div>
            )}

            {/* Invoice cost and session */}
            <div className="pt-4 border-t border-slate-200 dark:border-[#242424] flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-800 dark:text-[#e0e0e0] uppercase tracking-wider">Total Charge</span>
                <div className="flex items-center gap-0.5 text-[#6db70e] dark:text-[#7ecf55]">
                  <FiDollarSign size={16} />
                  <span className="text-xl font-black tracking-tight">{order.totalPrice}</span>
                </div>
              </div>

              {/* Reference session ID */}
              <div className="bg-white dark:bg-[#111111] p-3 rounded-2xl border border-slate-200 dark:border-[#242424] dark:border-[0.5px] flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="text-[8px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-widest block">Session Reference ID</span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-[#888888] truncate block select-all">{sessionId}</span>
                </div>
                <button 
                  onClick={handleCopySession}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-[#161616] text-slate-400 hover:text-slate-600 dark:hover:text-[#7ecf55] rounded-lg transition-colors cursor-pointer border border-transparent dark:border-transparent"
                  title="Copy session reference ID"
                >
                  {copied ? <FiCheck className="text-green-500" size={14} /> : <FiCopy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            to="/dashboard/myorder"
            className="flex-1 bg-slate-950 dark:bg-[#0f0f0f] hover:bg-[#161616] dark:hover:bg-[#161616] text-white dark:text-[#e0e0e0] border border-slate-800 dark:border-[#242424] dark:border-[0.5px] py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            <FiShoppingBag size={14} />
            <span>Track Order</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
          </Link>
          <Link
            to="/allmeals"
            className="flex-1 bg-[#6db70e] dark:bg-[#7ecf55] hover:bg-[#5a9c0c] dark:hover:bg-[#6db70e] text-white dark:text-[#0f0f0f] py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-300 shadow-lg shadow-[#6db70e]/10 hover:shadow-[#6db70e]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Back to Bazaar</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

