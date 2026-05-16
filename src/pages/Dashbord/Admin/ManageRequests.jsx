import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Context/AuthContext';
import { FiCheck, FiX, FiMail, FiUser, FiArrowRight, FiShield, FiMapPin } from 'react-icons/fi';

const apiBase = import.meta.env.VITE_BACKEND_API;

const ManageRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiBase}/role-requests`);
        const rawRequests = res.data?.data || [];

        let userMap = {};
        try {
          const usersRes = await axios.get(`${apiBase}/users`);
          const usersData = usersRes.data?.data || [];
          usersData.forEach((u) => {
            if (u.email) {
              userMap[u.email.toLowerCase()] = {
                name: u.name,
                image: u.profileImg || u.image,
                address: u.address
              };
            }
          });
        } catch (userErr) {
          console.error('Failed to fetch user database for cross-reference:', userErr);
        }

        const processedRequests = rawRequests.map((r) => {
          const emailKey = (r.email || r.userEmail || "").toLowerCase();
          const userData = userMap[emailKey] || {};
          return {
            ...r,
            email: r.email || r.userEmail || "No Email",
            name: r.name || r.userName || userData.name || r.displayName || "Unknown Member",
            profileImg: r.profileImg || userData.image || r.userImage || null,
            address: r.address || userData.address || "Location Not Provided",
            requestedRole: r.requestedRole || r.requestType || r.roleRequest || "Pending Role"
          };
        });

        setRequests(processedRequests);
      } catch (err) {
        console.error('Error in request intelligence protocol:', err);
        toast.error('Failed to sync role requests', { position: 'top-center' });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const startProcessing = (id) => {
    setProcessingIds((prev) => new Set(prev).add(id));
  };

  const stopProcessing = (id) => {
    setProcessingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleApprove = async (id) => {
    startProcessing(id);
    try {
      const res = await axios.patch(`${apiBase}/role-requests/${id}/approve`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data?.message || 'Authority status upgraded', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Authority upgrade failed', { position: 'top-center' });
    } finally {
      stopProcessing(id);
    }
  };

  const handleDecline = async (id) => {
    startProcessing(id);
    try {
      const res = await axios.patch(`${apiBase}/role-requests/${id}/decline`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data?.message || 'Authority request terminated', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Termination protocol failed', { position: 'top-center' });
    } finally {
      stopProcessing(id);
    }
  };

  const confirmAction = (id, actionType) => {
    const isApprove = actionType === 'approve';
    
    Swal.fire({
      title: `<span class="text-slate-900 font-black uppercase tracking-tight">${isApprove ? 'Approve' : 'Decline'} Protocol?</span>`,
      html: `<p class="text-slate-500 font-medium text-sm">Are you sure you want to ${actionType} this authority evolution request?</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: isApprove ? '#6db70e' : '#ef4444',
      cancelButtonColor: '#0f172a',
      confirmButtonText: `Yes, ${actionType}`,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-[2rem] border border-slate-100 shadow-2xl',
        confirmButton: 'px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs ml-2',
        cancelButton: 'px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (isApprove) {
          handleApprove(id);
        } else {
          handleDecline(id);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#6db70e] border-t-transparent animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Syncing Intelligence</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || Role Intelligence</title>
      <Toaster position="top-center" />

      {/* Boutique Header */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#6db70e]/10 flex items-center justify-center text-[#6db70e]">
            <FiShield size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            Role <span className="text-[#6db70e]">Intelligence</span>
          </h1>
        </div>
        <p className="text-slate-500 font-medium tracking-wide uppercase text-xs md:text-sm pl-1 border-l-2 border-[#6db70e]/30">
          Review and execute administrative status changes
        </p>
      </div>

      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 px-6 py-3 rounded-full border border-slate-100 dark:border-white/10 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Queue Capacity</span>
            <span className="text-lg font-black text-[#6db70e]">{requests.length}</span>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {requests.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 bg-slate-50 dark:bg-white/5 rounded-[3.5rem] border border-dashed border-slate-200 dark:border-white/10"
            >
              <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl text-slate-300">
                <FiCheck size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Queue Empty</h3>
              <p className="text-sm text-slate-500 font-serif italic mt-2">All administrative protocols have been processed.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {requests.map((r, idx) => {
                const isProcessing = processingIds.has(r._id);

                return (
                  <motion.div
                    key={r._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-6 md:p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-[#6db70e]/30 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      
                      {/* Identity Segment */}
                      <div className="flex items-start md:items-center gap-5 w-full md:w-auto">
                        <div className="relative group/avatar">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 font-black text-3xl uppercase group-hover:bg-[#6db70e]/10 group-hover:text-[#6db70e] transition-all duration-500 shrink-0 shadow-inner overflow-hidden border border-slate-100 dark:border-white/5">
                              {r.profileImg ? (
                                <img src={r.profileImg} alt={r.name} className="w-full h-full object-cover" />
                              ) : (
                                (r.name || "U").charAt(0)
                              )}
                          </div>
                          <div className="absolute -top-2 -left-2 bg-slate-900 dark:bg-[#6db70e] text-white w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-4 border-white dark:border-[#121212] shadow-lg">
                             #{String(idx + 1).padStart(2, '0')}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none truncate mb-2 group-hover:text-[#6db70e] transition-colors">
                              {r.name}
                            </h3>
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <FiMail size={12} className="text-[#6db70e] shrink-0" />
                                <span className="truncate">{r.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 italic">
                                <FiMapPin size={11} className="text-[#6db70e] shrink-0" />
                                <span className="truncate">{r.address}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Request</span>
                                <FiArrowRight size={12} className="text-[#6db70e]" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-[#6db70e] bg-[#6db70e]/10 px-3 py-1 rounded-full border border-[#6db70e]/20">
                                  {r.requestedRole}
                                </span>
                              </div>
                            </div>
                        </div>
                      </div>

                      {/* Action Segment */}
                      <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 pt-6 md:pt-0 border-slate-100 dark:border-white/5">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => confirmAction(r._id, 'approve')}
                          disabled={isProcessing}
                          className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-xl flex items-center justify-center gap-2
                                      ${isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 dark:bg-[#6db70e] text-white hover:shadow-[#6db70e]/40'}`}
                        >
                          {isProcessing ? 'Syncing...' : <><FiCheck size={16} /> Approve</>}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => confirmAction(r._id, 'decline')}
                          disabled={isProcessing}
                          className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-2
                                      ${isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-red-500 hover:border-red-500'}`}
                        >
                          <FiX size={16} /> <span className="hidden sm:inline">Decline</span>
                        </motion.button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageRequests;