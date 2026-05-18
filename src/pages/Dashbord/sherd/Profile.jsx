import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiAward, 
  FiActivity, 
  FiCheckCircle, 
  FiShield, 
  FiEdit3,
  FiSave,
  FiX,
  FiUser,
  FiCamera
} from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const { user, role, refreshRole } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chefId, setChefId] = useState(null);
  const [activeRequest, setActiveRequest] = useState(null);
  
  // Full Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    address: '',
    profileImg: ''
  });
  const [updating, setUpdating] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
          // Dynamic role check refresh to sync current authority immediately
          const freshRole = await refreshRole();
          
          const [userRes, chefRes, requestRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_API}/users/${user.email}`),
            freshRole === 'chef' ? axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-id/${user.email}`) : Promise.resolve({ data: { chefId: null } }),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/role-requests`)
          ]);
          
          const data = userRes.data.data;
          setUserInfo(data);
          setEditData({
            name: data.name || user.displayName || '',
            address: data.address || '',
            profileImg: data.profileImg || user.photoURL || ''
          });
          if (chefRes.data.chefId) setChefId(chefRes.data.chefId);

          // Find active request for this user
          const myRequest = requestRes.data.data?.find(r => r.userEmail === user.email && (r.requestStatus === 'pending' || r.status === 'pending'));
          if (myRequest) setActiveRequest(myRequest);

        } catch (err) {
          console.error('Error fetching profile data:', err);
          setUserInfo({
             name: user.displayName,
             email: user.email,
             profileImg: user.photoURL,
             address: '',
             status: 'active'
          });
          setEditData({
            name: user.displayName || '',
            address: '',
            profileImg: user.photoURL || ''
          });
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user?.email]);

  const handleUpdateProfile = async () => {
    if (!editData.name.trim()) return toast.error('Name protocol required');
    setUpdating(true);
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/users/update-profile/${user.email}`, editData);
      if (res.data.success) {
        setUserInfo(prev => ({ ...prev, ...editData }));
        setIsEditing(false);
        toast.success('Identity protocols synchronized!');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Sync protocol failed');
    } finally {
      setUpdating(false);
    }
  };

  const handleRoleRequest = async (requestedRole) => {
    if (role === requestedRole) return toast.error(`Already synchronized as ${requestedRole}`);
    
    setRequestLoading(true);
    try {
      const requestData = {
        name: user?.displayName || userInfo?.name || 'Unknown User',
        email: user?.email,
        requestedRole: requestedRole,
        status: 'pending',
        profileImg: user?.photoURL || userInfo?.profileImg || '',
        address: userInfo?.address || '',
        createdAt: new Date().toISOString()
      };

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/role-request`, requestData);
      if (res.data.success) {
        toast.success(`${requestedRole.toUpperCase()} protocol initiated! Awaiting verification.`);
        setActiveRequest(requestData);
      }
    } catch (err) {
      console.error(err);
      toast.error('Authority request protocol failed');
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#6db70e] border-t-transparent animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Decrypting Identity</p>
      </div>
    );
  }

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans">
      <title>LocalChefBazaar || Executive Identity</title>
      <Toaster position="top-center" />

      {/* Cinematic Banner Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden mb-[-10vh] md:mb-[-15vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#121212] z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover grayscale-[20%] brightness-[0.7]"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-slate-900/20 z-0" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Identity Matrix */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-white dark:bg-[#111111] border border-slate-100 dark:border-white/10 p-8 md:p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <FiShield size={80} className="text-[#6db70e]" />
            </div>

            <div className="relative z-10">
              <div className="relative mb-8">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full p-2 bg-white dark:bg-slate-800 shadow-2xl relative z-10 mx-auto group">
                  <img
                    src={user?.photoURL || userInfo.profileImg || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover shadow-inner transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <FiCamera size={32} className="text-[#6db70e]" />
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#6db70e] text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg z-20 border-4 border-white dark:border-slate-900">
                  {role}
                </div>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                  {userInfo.name?.split(' ')[0] || 'Unknown'} <span className="text-[#6db70e]">{userInfo.name?.split(' ').slice(1).join(' ') || ''}</span>
                </h2>
                <div className="flex items-center justify-center gap-2 text-slate-400 font-serif italic text-sm">
                  <FiMail size={14} className="text-[#6db70e]" />
                  {userInfo.email}
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-slate-100 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <span>Current Link</span>
                  <span className="text-[#6db70e]">Active Terminal</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-xl bg-[#6db70e]/10 text-[#6db70e] font-black text-[9px] uppercase tracking-widest border border-[#6db70e]/20">
                    {role} Authority
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 font-black text-[9px] uppercase tracking-widest border border-blue-500/20">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Operational Matrix */}
          <div className="lg:col-span-8 space-y-8">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'Status', value: userInfo.status || 'active', icon: <FiActivity />, color: 'text-[#6db70e]' },
                { label: 'Network', value: 'Live', icon: <FiCheckCircle />, color: 'text-blue-500' },
                { 
                  label: 'Joined', 
                  value: userInfo.createdAt ? new Date(userInfo.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2025', 
                  icon: <FiClock />, 
                  color: 'text-purple-500' 
                },
                { label: 'Reputation', value: '98%', icon: <FiAward />, color: 'text-amber-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#111111] border border-slate-100 dark:border-white/10 p-6 rounded-[2rem] shadow-sm">
                  <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</h4>
                  <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Profile Configuration Canvas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 dark:bg-[#111111] rounded-[3.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] p-10 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <FiEdit3 size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
                    Identity <span className="text-[#6db70e]">Sync</span>
                  </h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-slate-900 dark:bg-[#6db70e] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:shadow-xl transition-all shadow-[#6db70e]/20"
                    >
                      <FiEdit3 /> Edit Profile
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-red-500/10 text-red-500 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <FiX /> Cancel Sync
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Name Protocol */}
                  <div className="group flex flex-col p-6 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
                    <div className="flex items-center gap-4 mb-4">
                      <FiUser className="text-[#6db70e]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</span>
                    </div>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none ring-1 ring-slate-100 focus:ring-[#6db70e]"
                      />
                    ) : (
                      <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-xl px-2">{userInfo.name || 'Set Identity'}</span>
                    )}
                  </div>

                  {/* Location Protocol */}
                  <div className="group flex flex-col p-6 bg-white dark:bg-[#111111] rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
                    <div className="flex items-center gap-4 mb-4">
                      <FiMapPin className="text-[#6db70e]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Address</span>
                    </div>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={editData.address}
                        onChange={(e) => setEditData({...editData, address: e.target.value})}
                        placeholder="Base of operations..."
                        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none ring-1 ring-slate-100 focus:ring-[#6db70e]"
                      />
                    ) : (
                      <span className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-xl px-2">{userInfo.address || 'Address Not Found'}</span>
                    )}
                  </div>

                  <AnimatePresence>
                    {isEditing && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4"
                      >
                        <button 
                          onClick={handleUpdateProfile}
                          disabled={updating}
                          className="w-full py-5 bg-slate-900 dark:bg-[#6db70e] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-[#6db70e]/40 flex items-center justify-center gap-3"
                        >
                          {updating ? 'Synchronizing...' : <><FiSave /> Commit Identity Protocol</>}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Artisan Meta */}
            {role === 'chef' && chefId && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group flex flex-col md:flex-row md:items-center justify-between p-10 bg-[#6db70e]/5 rounded-[3rem] border border-[#6db70e]/20">
                <div className="flex items-center gap-5 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#6db70e] shadow-sm">
                    <FiAward size={24} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-[#6db70e] uppercase tracking-[0.3em]">Artisan Credential</h4>
                    <p className="text-xs text-slate-400 font-serif italic">Verified Local Chef Bazaar Status</p>
                  </div>
                </div>
                <span className="font-mono font-black text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-8 py-3 rounded-2xl border border-[#6db70e]/20 shadow-sm">{chefId}</span>
              </motion.div>
            )}

            {/* Role Evolution Protocol */}
            {role !== 'admin' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-[#111111] rounded-[3.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] p-10 md:p-12 shadow-xl"
              >
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                  Authority <span className="text-[#6db70e]">Evolution</span>
                </h3>
                
                <p className="text-xs text-slate-400 font-medium mb-10 max-w-lg leading-relaxed">
                  Initiate a protocol to upgrade your clearance level within the Bazaar. Requests for Chef and Admin status are monitored by the primary network administrators.
                </p>

                {activeRequest && (
                  <div className="mb-8 p-6 bg-[#6db70e]/10 rounded-[2rem] border border-[#6db70e]/30 flex items-center justify-between animate-pulse text-[#6db70e]">
                    <div className="flex items-center gap-4">
                        <FiActivity />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest">Protocol Active</p>
                          <p className="text-xs font-black uppercase">Awaiting verification for {activeRequest.requestType} authority</p>
                        </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Syncing...</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {role !== 'chef' && (
                    <button
                      onClick={() => handleRoleRequest('chef')}
                      disabled={requestLoading}
                      className="flex-1 min-w-[200px] py-4 bg-[#6db70e] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-[#6db70e]/40 transition-all active:scale-95 flex items-center justify-center gap-3 group"
                    >
                      <FiAward className="group-hover:rotate-12 transition-transform" />
                      Be a Chef
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleRoleRequest('admin')}
                    disabled={requestLoading}
                    className="flex-1 min-w-[200px] py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-white/10 transition-all active:scale-95 flex items-center justify-center gap-3 group"
                  >
                    <FiShield className="group-hover:scale-110 transition-transform" />
                    Be an Admin
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
