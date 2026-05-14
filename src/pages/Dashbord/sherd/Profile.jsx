import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [chefId, setChefId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/users/${user.email}`);
        if (res.data && res.data.data) {
          setUserInfo(res.data.data);
        } else {
          // Fallback if user is not in database yet
          setUserInfo({
            name: user.displayName,
            email: user.email,
            profileImg: user.photoURL,
            role: 'user',
            status: 'active'
          });
        }
      } catch (err) {
        console.error(err);
        // Robust fallback to prevent infinite loading
        setUserInfo({
          name: user.displayName || 'Unknown User',
          email: user.email,
          profileImg: user.photoURL,
          role: 'user',
          status: 'active'
        });
      }
    };

    fetchUser();
  }, [user?.email]);

  useEffect(() => {
    if (userInfo?.role !== 'chef' || !user?.email) return;

    const fetchChefId = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-id/${user.email}`);
        setChefId(res.data.chefId);
      } catch (err) {
        console.error('Failed to fetch chefId:', err);
      }
    };

    fetchChefId();
  }, [userInfo?.role, user?.email]);

  const handleRoleRequest = (role) => {
    toast(
      (t) => (
        <div className="p-4 bg-white rounded shadow-lg text-center w-full max-w-sm mx-auto">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to request the role:{' '}
            <span className="capitalize">{role}</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-[#6db70e] hover:bg-[#5a9c0c] text-white px-6 py-2 rounded-lg font-bold cursor-pointer transition-colors"
              onClick={async () => {
                try {
                  const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/role-request`, {
                    email: user.email,
                    name: userInfo.name || user.displayName,
                    requestedRole: role,
                  });

                  setUserInfo((prev) => ({ ...prev, roleRequest: role }));
                  toast.success(res.data.message, { position: 'top-center' });
                } catch (err) {
                  console.error(err);
                  toast.error('Failed to send role request', { position: 'top-center' });
                }
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-4 cursor-pointer py-2 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );
  };

  if (loading) return <Loading />;
  if (!user) return <p className="text-center mt-10">No user logged in</p>;
  if (!userInfo) return <Loading />;

  const { role, roleRequest } = userInfo;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 font-sans py-12">
      <Toaster />
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 sm:p-10 border border-slate-100 relative mt-16">
        <div className="flex flex-col items-center -mt-24 mb-8">
          <div className="w-32 h-32 rounded-full p-2 bg-white shadow-lg relative">
            <img
              src={userInfo.profileImg || user?.photoURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover bg-slate-100"
            />
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#6db70e] border-2 border-white rounded-full"></div>
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900 tracking-tight">
            {userInfo.name}
          </h2>
          <p className="text-sm font-bold tracking-wider text-slate-400 mt-1 uppercase">
            {userInfo.email}
          </p>
        </div>

        <div className="bg-slate-50/50 rounded-3xl p-6 space-y-4 mb-8 border border-slate-100">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Location</span>
            <span className="font-bold text-slate-900">{userInfo.address || 'Not Provided'}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Role</span>
            <span className="px-3 py-1 rounded-full bg-[#6db70e]/10 text-[#6db70e] font-black uppercase text-[11px] tracking-widest">
              {role}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Status</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-black uppercase text-[11px] tracking-widest">
              {userInfo.status || 'Active'}
            </span>
          </div>
          {role === 'chef' && chefId && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Chef ID</span>
              <span className="font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg text-sm">
                {chefId}
              </span>
            </div>
          )}
        </div>

        {roleRequest && (
          <div className="text-center font-bold text-amber-600 bg-amber-50 py-4 rounded-2xl mb-6 border border-amber-100">
            <span className="text-[11px] uppercase tracking-widest block text-amber-500 mb-1">Status</span>
            Pending {roleRequest} Request
          </div>
        )}

        {!roleRequest && role !== 'admin' && (
          <div className="flex flex-col gap-3">
            {role === 'user' && (
              <button
                onClick={() => handleRoleRequest('chef')}
                className="w-full bg-white border-2 border-slate-200 hover:border-[#6db70e] text-slate-700 hover:text-[#6db70e] py-4 rounded-2xl font-black transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Apply as Local Chef
              </button>
            )}
            {(role === 'user' || role === 'chef') && (
              <button
                onClick={() => handleRoleRequest('admin')}
                className="w-full bg-[#6db70e] hover:bg-[#5a9c0c] text-white py-4 rounded-2xl font-black transition-all cursor-pointer shadow-[0_8px_20px_rgba(109,183,14,0.3)] hover:shadow-[0_12px_25px_rgba(109,183,14,0.4)]"
              >
                Request Admin Access
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
