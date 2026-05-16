import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiClock, 
  FiCheckCircle, 
  FiDollarSign, 
  FiUser, 
  FiMapPin,
  FiZap,
  FiActivity,
  FiCreditCard
} from 'react-icons/fi';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/orders/${user.email}`);

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
          toast.error(res.data.message || 'No orders found');
        }
      } catch (err) {
        console.error(err);
        toast.error('Bazaar communication failure');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handlePay = async (order) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/create-checkout-session`,
        {
          orderId: order._id,
          amount: order.totalPrice,
          email: user.email,
          name: order.mealName || 'Customer',
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Payment initiation protocol failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment error! Re-synchronize protocol.');
    }
  };

  if (loading) return <Loading />;

  const sortedOrders = [...orders].sort((a, b) => {
    if (a.paymentStatus === 'pending' && b.paymentStatus === 'paid') return -1;
    if (a.paymentStatus === 'paid' && b.paymentStatus === 'pending') return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || Acquisition History</title>
      <Toaster position="top-center" />
      
      {/* Cinematic Header */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6db70e]/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-[#6db70e]/10 px-5 py-2 rounded-full border border-[#6db70e]/20">
              <FiZap className="text-[#6db70e] animate-pulse" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6db70e]">Purchase Protocol Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              My <span className="text-[#6db70e]">Orders</span>
            </h1>
            <p className="text-slate-500 font-serif italic text-sm md:text-base max-w-xl">
              Tracking your active and completed culinary acquisitions within the Bazaar. Total synchronized orders: <span className="text-[#6db70e] font-black">{orders.length} Units</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {sortedOrders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] rounded-[3.5rem] p-20 text-center"
          >
            <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
               <FiShoppingBag size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">No Orders Found</h3>
            <p className="text-slate-400 font-serif italic mt-4">Your culinary acquisition history is currently empty.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {sortedOrders.map((order, idx) => {
                const isPaid = order.paymentStatus?.toLowerCase() === 'paid';

                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group bg-white dark:bg-[#151515] border border-slate-100 dark:border-[#242424] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden ${
                      isPaid ? 'opacity-80' : ''
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                       <FiShoppingBag size={100} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-8">
                         <div className="min-w-0">
                            <span className="text-[10px] font-black text-[#6db70e] uppercase tracking-[0.3em] mb-2 block">Acquisition ID</span>
                            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none truncate group-hover:text-[#6db70e] transition-colors">{order.mealName}</h3>
                         </div>
                         <div className={`shrink-0 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                           isPaid 
                             ? 'bg-[#6db70e]/10 text-[#6db70e] border-[#6db70e]/20' 
                             : 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'
                         }`}>
                           {order.paymentStatus}
                         </div>
                      </div>

                      <div className="space-y-4 mb-10">
                         <div className="flex items-center justify-between text-xs font-bold">
                            <div className="flex items-center gap-3 text-slate-400">
                               <FiUser size={14} className="text-[#6db70e]" /> <span>Chef</span>
                            </div>
                            <span className="text-slate-900 dark:text-white font-black uppercase tracking-tighter">{order.chefName}</span>
                         </div>

                         <div className="flex items-center justify-between text-xs font-bold">
                            <div className="flex items-center gap-3 text-slate-400">
                               <FiClock size={14} className="text-blue-500" /> <span>Delivery</span>
                            </div>
                            <span className="text-slate-900 dark:text-white font-black uppercase tracking-tighter">{order.deliveryTime}</span>
                         </div>

                         <div className="flex items-center justify-between text-xs font-bold pt-4 border-t border-slate-50 dark:border-white/5">
                            <div className="flex items-center gap-3 text-slate-400">
                               <FiDollarSign size={14} className="text-[#6db70e]" /> <span>Total Value</span>
                            </div>
                            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">${order.totalPrice}</span>
                         </div>

                         <div className="flex items-center justify-between text-xs font-bold">
                            <div className="flex items-center gap-3 text-slate-400">
                               <FiActivity size={14} className="text-purple-500" /> <span>Status</span>
                            </div>
                            <span className={`uppercase tracking-widest text-[10px] font-black ${
                              order.orderStatus === 'delivered' ? 'text-[#6db70e]' : 'text-blue-500'
                            }`}>{order.orderStatus}</span>
                         </div>
                      </div>

                      {order.userAddress && (
                        <div className="mb-8 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10">
                           <div className="flex items-center gap-2 mb-2">
                              <FiMapPin className="text-red-500" size={12} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Base of Operations</span>
                           </div>
                           <p className="text-xs font-medium text-slate-600 dark:text-[#888888] line-clamp-2">{order.userAddress}</p>
                        </div>
                      )}

                      {order.orderStatus === 'accepted' &&
                        order.paymentStatus?.toLowerCase() === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePay(order)}
                            className="w-full bg-[#6db70e] text-white py-4 rounded-xl shadow-xl hover:shadow-[#6db70e]/30 transition-all cursor-pointer font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                          >
                            <FiCreditCard size={16} /> Execute Payment Protocol
                          </motion.button>
                        )}
                      
                      {isPaid && (
                        <div className="w-full py-4 text-center border border-dashed border-[#6db70e]/30 rounded-xl">
                           <span className="text-[9px] font-black text-[#6db70e] uppercase tracking-[0.4em]">Transaction Synchronized</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
