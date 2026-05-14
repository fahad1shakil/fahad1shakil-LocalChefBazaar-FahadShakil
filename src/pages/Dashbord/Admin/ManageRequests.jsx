import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext';

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
        // Fetch role requests
        const res = await axios.get(`${apiBase}/role-requests`);
        let fetchedRequests = res.data?.data || [];

        // Attempt to fetch all users to cross-reference real names
        try {
          const usersRes = await axios.get(`${apiBase}/users`);
          const usersData = usersRes.data?.data || [];
          const userMap = {};
          usersData.forEach((u) => {
            if (u.email) userMap[u.email] = u.name;
          });

          // Enrich requests with actual database nicknames
          fetchedRequests = fetchedRequests.map((r) => ({
            ...r,
            name: r.name || userMap[r.email] || null,
          }));
        } catch (userErr) {
          console.error('Failed to cross-reference user names:', userErr);
        }

        setRequests(fetchedRequests);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch requests', { position: 'top-center' });
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

  const handleApprove = async (id, t) => {
    startProcessing(id);
    try {
      const res = await axios.patch(`${apiBase}/role-requests/${id}/approve`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data?.message || 'Request approved', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to approve request', { position: 'top-center' });
    } finally {
      stopProcessing(id);
      if (t?.id) toast.dismiss(t.id);
    }
  };

  const handleDecline = async (id, t) => {
    startProcessing(id);
    try {
      const res = await axios.patch(`${apiBase}/role-requests/${id}/decline`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data?.message || 'Request declined', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to decline request', { position: 'top-center' });
    } finally {
      stopProcessing(id);
      if (t?.id) toast.dismiss(t.id);
    }
  };

  const confirmAction = (id, actionType) => {
    toast(
      (t) => (
        <div
          className="max-w-sm w-full p-4 rounded-lg shadow-lg text-center bg-white text-gray-900"
          role="dialog"
          aria-modal="true"
        >
          <p className="text-lg font-semibold mb-3">
            Are you sure you want to {actionType} this request?
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            This action cannot be undone.
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() =>
                actionType === 'approve' ? handleApprove(id, t) : handleDecline(id, t)
              }
              className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                          ${
                            actionType === 'approve'
                              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                              : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                          }`}
              aria-label={`${actionType} request`}
            >
              Yes, {actionType}
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none cursor-pointer"
              aria-label="Cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div
          className="w-14 h-14 rounded-full border-4 border-t-transparent border-green-500 animate-spin"
          aria-hidden="true"
        />
        <span className="sr-only">Loading requests</span>
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">No pending requests</p>
          <p className="text-gray-500">All role requests have been processed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12 font-sans">
      <title>LocalChefBazaar || Manage Requests</title>
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Manage Role Requests
        </h1>
        <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">
          Review and approve pending role change requests
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Toaster position="top-center" />
        
        <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-8">
          <h2 className="text-xl font-black mb-8 text-slate-900 flex items-center">
            Pending Requests <span className="ml-3 bg-[#6db70e]/10 text-[#6db70e] px-3 py-1 rounded-full text-sm">{requests.length}</span>
          </h2>

          <div className="space-y-4">
            {requests.map((r) => {
              const isProcessing = processingIds.has(r._id);
              // Smart fallback for missing names in the database
              // If the request is from the currently logged in user (Admin testing), use their Firebase name directly!
              const displayName = (r.email === user?.email && user?.displayName) 
                  ? user.displayName 
                  : (r.name || r.displayName || (r.email ? r.email.split('@')[0] : 'Unknown User'));

              return (
                <div
                  key={r._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-[1.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-[0_10px_30px_rgba(109,183,14,0.08)] hover:border-[#6db70e]/20 transition-all duration-300 group"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="flex-1 min-w-0 flex items-center gap-5 mb-4 sm:mb-0">
                    <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-black text-2xl uppercase group-hover:bg-[#6db70e]/10 group-hover:text-[#6db70e] transition-colors">
                        {displayName.charAt(0)}
                    </div>
                    <div>
                        <p className="font-black text-xl text-slate-900 truncate flex items-center gap-3">
                          {displayName}
                          <span className="text-xs font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full lowercase tracking-wider">
                              {r.email || 'no email'}
                          </span>
                        </p>
                        <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                          Requested Role: <span className="text-[#6db70e] bg-[#6db70e]/10 px-2 py-1 rounded-lg ml-1">{r.roleRequest || '—'}</span>
                        </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => confirmAction(r._id, 'approve')}
                      disabled={isProcessing}
                      className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-black transition-all duration-300 shadow-sm cursor-pointer
                                  ${isProcessing ? 'opacity-60 cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-[#6db70e] hover:bg-[#5a9c0c] text-white hover:shadow-[0_8px_20px_rgba(109,183,14,0.3)] hover:-translate-y-0.5'}`}
                      aria-label={`Approve ${displayName}`}
                    >
                      {isProcessing ? 'Processing...' : 'Approve'}
                    </button>

                    <button
                      onClick={() => confirmAction(r._id, 'decline')}
                      disabled={isProcessing}
                      className={`flex-1 sm:flex-none px-6 py-3 rounded-2xl font-black transition-all duration-300 cursor-pointer
                                  ${isProcessing ? 'opacity-60 cursor-not-allowed bg-slate-200 text-slate-500' : 'bg-white border-2 border-slate-200 hover:border-red-500 text-slate-600 hover:text-red-500 hover:shadow-sm'}`}
                      aria-label={`Decline ${displayName}`}
                    >
                      {isProcessing ? 'Processing...' : 'Decline'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;