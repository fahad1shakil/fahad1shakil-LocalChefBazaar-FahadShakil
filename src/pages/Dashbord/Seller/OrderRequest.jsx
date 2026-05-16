import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiTruck, 
  FiDollarSign, 
  FiMail,
  FiMapPin,
  FiZap,
  FiActivity
} from 'react-icons/fi';

const OrderRequest = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user-chef-orders/${user.email}`);
        if (res.data.success) {
          const sortedOrders = res.data.data.sort((a, b) => {
            if (a.orderStatus === 'pending' && b.orderStatus !== 'pending') return -1;
            if (a.orderStatus !== 'pending' && b.orderStatus === 'pending') return 1;
            return 0;
          });
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error(error);
        toast.error('Bazaar communication failure');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setProcessingId(orderId);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}/update-order-status/${orderId}`,
        { orderStatus: newStatus }
      );

      if (res.data.success) {
        toast.success(`Protocol: Order marked as ${newStatus}`);
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Authorization protocol failed');
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || Fulfillment Intelligence</title>
      <Toaster position="top-center" />

      {/* Cinematic Header */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6db70e]/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-[#6db70e]/10 px-5 py-2 rounded-full border border-[#6db70e]/20">
              <FiActivity className="text-[#6db70e] animate-pulse" size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6db70e]">Live Fulfillment Stream</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Order <span className="text-[#6db70e]">Requests</span>
            </h1>
            <p className="text-slate-500 font-serif italic text-sm md:text-base max-w-xl">
              Processing active culinary transactions within your sector. Currently monitoring <span className="text-[#6db70e] font-black">{orders.length} Active Protocols</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] rounded-[3.5rem] p-20 text-center"
          >
            <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
               <FiPackage size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Fulfillment Queue Empty</h3>
            <p className="text-slate-400 font-serif italic mt-4">All culinary assets have been synchronized and delivered.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white dark:bg-[#151515] border border-slate-100 dark:border-[#242424] rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <FiPackage size={100} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <span className="text-[10px] font-black text-[#6db70e] uppercase tracking-[0.3em] mb-2 block">Asset Sequence</span>
                          <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{order.mealName}</h3>
                       </div>
                       <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                         order.orderStatus === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse' :
                         order.orderStatus === 'accepted' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                         order.orderStatus === 'delivered' ? 'bg-[#6db70e]/10 text-[#6db70e] border-[#6db70e]/20' :
                         'bg-red-500/10 text-red-500 border-red-500/20'
                       }`}>
                         {order.orderStatus}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-10">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                             <FiDollarSign className="text-[#6db70e]" /> 
                             <span className="text-slate-900 dark:text-white font-black text-sm">${order.totalPrice}</span>
                             <span className="text-[10px] uppercase opacity-60">({order.quantity} Units)</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                             <FiMail className="text-[#6db70e]" /> 
                             <span className="truncate max-w-[150px]">{order.userEmail}</span>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                             <FiClock className="text-blue-500" /> 
                             <span>{new Date(order.orderTime).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                             <FiMapPin className="text-red-500" /> 
                             <span className="truncate max-w-[150px]">{order.userAddress || 'Base Not Set'}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-50 dark:border-white/5">
                       {order.orderStatus === 'pending' && (
                         <>
                           <button
                             onClick={() => handleStatusUpdate(order._id, 'accepted')}
                             disabled={processingId === order._id}
                             className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#6db70e] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-[#6db70e]/40 transition-all active:scale-95"
                           >
                             <FiCheckCircle size={16} /> Accept
                           </button>
                           <button
                             onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                             disabled={processingId === order._id}
                             className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-red-50 dark:bg-red-950/20 text-red-500 border border-red-100 dark:border-red-900/30 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                           >
                             <FiXCircle size={16} /> Terminate
                           </button>
                         </>
                       )}

                       {order.orderStatus === 'accepted' && (
                         <button
                           onClick={() => handleStatusUpdate(order._id, 'delivered')}
                           disabled={processingId === order._id}
                           className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-blue-600/40 transition-all active:scale-95"
                         >
                           <FiTruck size={16} /> Deploy & Deliver
                         </button>
                       )}

                       {order.orderStatus === 'delivered' && (
                         <div className="w-full text-center py-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#6db70e]">
                            Transaction Completed
                         </div>
                       )}

                       {order.orderStatus === 'cancelled' && (
                         <div className="w-full text-center py-4 bg-red-50 dark:bg-red-950/10 rounded-xl border border-dashed border-red-100 dark:border-red-900/20 text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
                            Protocol Terminated
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderRequest;
