import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';
import { 
  FiUsers, 
  FiShield, 
  FiSlash, 
  FiUserCheck, 
  FiArrowDownCircle, 
  FiSearch,
  FiMoreVertical,
  FiMail,
  FiLock,
  FiClock,
  FiMapPin
} from 'react-icons/fi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/users`);
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_API}/users/update-role/${userId}`, { role: newRole });
      setUsers(prevUsers => prevUsers.map(u => u._id === userId ? { ...u, role: newRole } : u));
      
      Swal.fire({
        title: '<span class="text-slate-900 font-black uppercase tracking-tight">Authority Granted</span>',
        html: `<p class="text-slate-500 font-medium text-sm">Target assigned to <strong>${newRole.toUpperCase()}</strong> protocol.</p>`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[2rem] border border-slate-100 shadow-2xl' }
      });
    } catch (err) {
      console.error(err);
      Swal.fire('Protocol Error', err.response?.data?.message || 'Failed to update authority', 'error');
    }
  };

  const handleDemote = async (userId) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_API}/users/demote/${userId}`);
      setUsers(prevUsers => prevUsers.map(u => u._id === userId ? { ...u, role: 'user' } : u));
      
      Swal.fire({
        title: '<span class="text-amber-600 font-black uppercase tracking-tight">Protocol Downgrade</span>',
        html: `<p class="text-slate-500 font-medium text-sm">Member returned to standard access status.</p>`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: 'rounded-[2rem] border border-amber-100 shadow-2xl' }
      });
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Demotion protocol failed', 'error');
    }
  };

  const handleBanUser = async (userId, userEmail, currentStatus) => {
    if (userEmail === 'fahad1shakil@gmail.com') {
      Swal.fire('Forbidden', 'Cannot modify protected BOSS account', 'warning');
      return;
    }

    const isCurrentlyBanned = currentStatus === 'banned';
    const actionText = isCurrentlyBanned ? 'Unban' : 'Terminate';
    const newStatus = isCurrentlyBanned ? 'active' : 'banned';

    Swal.fire({
      title: `<span class="text-slate-900 font-black uppercase tracking-tight">${actionText} Account?</span>`,
      html: `<p class="text-slate-500 font-medium text-sm">Confirm ${actionText.toLowerCase()} protocol for <br/><span class="text-red-500 font-bold">${userEmail}</span></p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isCurrentlyBanned ? '#6db70e' : '#ef4444',
      cancelButtonColor: '#0f172a',
      confirmButtonText: `Yes, ${actionText}`,
      customClass: {
        popup: 'rounded-[2rem] border border-slate-100 shadow-2xl',
        confirmButton: 'px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs ml-2',
        cancelButton: 'px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`${import.meta.env.VITE_BACKEND_API}/users/ban/${userId}`);
          setUsers(prevUsers => prevUsers.map(u => u._id === userId ? { ...u, status: newStatus } : u));
          toast.success(`User ${newStatus} successfully`);
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'Security protocol failed', 'error');
        }
      }
    });
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || Personnel Command</title>
      <Toaster position="top-center" />
      
      {/* Boutique Header */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6db70e]/10 flex items-center justify-center text-[#6db70e]">
                <FiUsers size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                Personnel <span className="text-[#6db70e]">Command</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium tracking-wide uppercase text-[10px] md:text-xs pl-1 border-l-2 border-[#6db70e]/30">
              Database management and credential synchronization
            </p>
          </div>

          {/* Smart Search */}
          <div className="relative group max-w-md w-full">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#6db70e] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by Identity or Link..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold outline-none focus:border-[#6db70e]/50 focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Desktop Table View */}
        <div className="hidden xl:block bg-white dark:bg-white/5 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact & Base</th>
                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Authority</th>
                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sync Date</th>
                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
              <AnimatePresence>
                {filteredUsers.map((user) => {
                  const isBoss = user.email === 'fahad1shakil@gmail.com';
                  const isBanned = user.status === 'banned';

                  return (
                    <motion.tr 
                      key={user._id} 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 uppercase tracking-tighter">
                            {user.name?.charAt(0) || '?'}
                          </div>
                          <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-sm group-hover:text-[#6db70e] transition-colors">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <FiMail className="text-[#6db70e]/50" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                            <FiMapPin className="text-[#6db70e]/50" />
                            {user.address || 'Location Not Set'}
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                          isBoss ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                          user.role === 'admin' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                          user.role === 'chef' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          'bg-slate-500/10 text-slate-500 border-slate-500/10'
                        }`}>
                          {isBoss ? 'SUPREME BOSS' : user.role}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <FiClock className="text-[#6db70e]/50" />
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isBanned ? 'bg-red-500 animate-pulse' : 'bg-[#6db70e]'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isBanned ? 'text-slate-400' : 'text-[#6db70e]'}`}>
                            {isBanned ? 'Banned' : 'Active'}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex justify-center items-center gap-3">
                          {isBoss ? (
                            <div className="flex items-center gap-2 text-purple-400/50 text-[10px] font-black uppercase tracking-widest italic">
                              <FiLock /> Protected
                            </div>
                          ) : (
                            <>
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                disabled={isBanned}
                                className="bg-slate-50 dark:bg-slate-800 border-none text-slate-600 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-2.5 outline-none focus:ring-2 ring-[#6db70e]/20 cursor-pointer disabled:opacity-30 transition-all"
                              >
                                <option value="user">USER</option>
                                <option value="chef">CHEF</option>
                                <option value="admin">ADMIN</option>
                              </select>

                              <button
                                onClick={() => handleBanUser(user._id, user.email, user.status)}
                                className={`p-2.5 rounded-xl transition-all shadow-sm ${
                                  isBanned 
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-[#6db70e]' 
                                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white'
                                }`}
                                title={isBanned ? 'Unban User' : 'Ban User'}
                              >
                                {isBanned ? <FiUserCheck size={18} /> : <FiSlash size={18} />}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile & Tablet Card View */}
        <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredUsers.map((user, idx) => {
              const isBoss = user.email === 'fahad1shakil@gmail.com';
              const isBanned = user.status === 'banned';

              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-6 rounded-[2.5rem] shadow-sm relative overflow-hidden group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 uppercase tracking-tighter text-xl shrink-0">
                      {user.name?.charAt(0) || '?'}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-lg leading-none truncate group-hover:text-[#6db70e] transition-colors">{user.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                      isBoss ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                      user.role === 'admin' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      user.role === 'chef' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      'bg-slate-500/10 text-slate-500 border-slate-500/10'
                    }`}>
                      {isBoss ? 'BOSS' : user.role}
                    </span>
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                      isBanned ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-[#6db70e]/10 text-[#6db70e] border-[#6db70e]/20'
                    }`}>
                      {isBanned ? 'BANNED' : 'ACTIVE'}
                    </span>
                  </div>

                  <div className="pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between gap-4">
                    {isBoss ? (
                      <div className="w-full text-center text-purple-400/50 text-[10px] font-black uppercase tracking-[0.3em] py-3 italic">
                        Supreme Protocol Active
                      </div>
                    ) : (
                      <>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          disabled={isBanned}
                          className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-4 outline-none focus:ring-2 ring-[#6db70e]/20"
                        >
                          <option value="user">USER</option>
                          <option value="chef">CHEF</option>
                          <option value="admin">ADMIN</option>
                        </select>
                        <button
                          onClick={() => handleBanUser(user._id, user.email, user.status)}
                          className={`p-4 rounded-xl shadow-lg transition-all ${
                            isBanned 
                              ? 'bg-[#6db70e] text-white' 
                              : 'bg-red-600 text-white shadow-red-600/20'
                          }`}
                        >
                          {isBanned ? <FiUserCheck size={20} /> : <FiSlash size={20} />}
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ManageUsers;
