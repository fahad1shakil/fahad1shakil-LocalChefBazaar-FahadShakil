import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { 
  FaShoppingBag, 
  FaStar, 
  FaHeart, 
  FaUsers, 
  FaChartLine, 
  FaUtensils,
  FaDollarSign,
  FaClock,
  FaEye,
  FaCheckCircle
} from 'react-icons/fa';
import { MdRestaurantMenu, MdPendingActions, MdAnalytics } from 'react-icons/md';
import { Line, Doughnut, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  DoughnutController,
  PolarAreaController
} from 'chart.js';
import axios from 'axios';
import Loading from '../../../Componentes/Loading';
import { motion } from 'framer-motion';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineController,
  DoughnutController,
  PolarAreaController
);

const DashboardOverview = () => {
  const { user, role } = useContext(AuthContext);
  const [stats, setStats] = useState({
    count1: 0,
    count2: 0,
    count3: 0,
    count4: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const fetchDashboardData = async () => {
    if (!user?.email) return;
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      if (!apiUrl) {
        throw new Error("VITE_BACKEND_API environment variable is missing.");
      }

      if (role === 'admin' || role === 'manager') {
        const res = await axios.get(`${apiUrl}/admin-stats`);
        if (res.data) {
          setStats({
            count1: res.data.totalUsers || 0,
            count2: res.data.totalMeals || 0,
            count3: res.data.totalOrders || 0,
            count4: res.data.totalRevenue || 0,
          });
        } else {
          throw new Error("Invalid stats response from server.");
        }
      } else if (role === 'chef') {
        const [mealsRes, ordersRes, reviewsRes] = await Promise.all([
          axios.get(`${apiUrl}/meals`),
          axios.get(`${apiUrl}/chef-orders/${user.email}`),
          axios.get(`${apiUrl}/chef-reviews/${user.email}`)
        ]);
        
        const chefMeals = Array.isArray(mealsRes.data?.data) ? mealsRes.data.data.filter(m => m.chefEmail === user.email || m.userEmail === user.email) : [];
        const chefOrders = Array.isArray(ordersRes.data?.data) ? ordersRes.data.data : [];
        const chefReviews = Array.isArray(reviewsRes.data?.data) ? reviewsRes.data.data : [];
        const revenue = chefOrders.reduce((sum, order) => sum + parseFloat(order.price || 0), 0);
        
        setStats({
          count1: chefMeals.length,
          count2: chefOrders.length,
          count3: chefReviews.length,
          count4: revenue.toFixed(2),
        });
      } else {
        // Regular User
        const [ordersRes, reviewsRes, favsRes] = await Promise.all([
          axios.get(`${apiUrl}/orders/${user.email}`),
          axios.get(`${apiUrl}/user-reviews/${user.email}`),
          axios.get(`${apiUrl}/favorites/${user.email}`)
        ]);
        
        const userOrders = Array.isArray(ordersRes.data?.data) ? ordersRes.data.data : [];
        const userReviews = Array.isArray(reviewsRes.data?.data) ? reviewsRes.data.data : [];
        const userFavs = Array.isArray(favsRes.data?.data) ? favsRes.data.data : [];

        setStats({
          count1: userOrders.length,
          count2: userReviews.length,
          count3: userFavs.length,
          count4: 'Elite', // User status
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      const msg = err.response?.data?.message || err.message || "Failed to load dashboard statistics from backend server.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.email, role]);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Activity',
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: 'rgba(109, 183, 14, 0.1)',
        borderColor: '#6db70e',
        tension: 0.4,
      },
    ],
  };

  if (loading) return <Loading />;

  const getStatConfig = () => {
    if (role === 'admin' || role === 'manager') {
      return [
        { label: 'Total Users', value: stats.count1, icon: <FaUsers />, color: 'text-[#6db70e]' },
        { label: 'Total Meals', value: stats.count2, icon: <FaUtensils />, color: 'text-[#6db70e]' },
        { label: 'Total Orders', value: stats.count3, icon: <FaShoppingBag />, color: 'text-[#6db70e]' },
        { label: 'Total Revenue', value: `$${stats.count4}`, icon: <FaDollarSign />, color: 'text-[#6db70e]' },
      ];
    } else if (role === 'chef') {
      return [
        { label: 'My Meals', value: stats.count1, icon: <FaUtensils />, color: 'text-[#6db70e]' },
        { label: 'Orders received', value: stats.count2, icon: <FaShoppingBag />, color: 'text-[#6db70e]' },
        { label: 'My Reviews', value: stats.count3, icon: <FaStar />, color: 'text-[#6db70e]' },
        { label: 'Total Earnings', value: `$${stats.count4}`, icon: <FaDollarSign />, color: 'text-[#6db70e]' },
      ];
    } else {
      return [
        { label: 'My Orders', value: stats.count1, icon: <FaShoppingBag />, color: 'text-[#6db70e]' },
        { label: 'My Reviews', value: stats.count2, icon: <FaStar />, color: 'text-[#6db70e]' },
        { label: 'My Favorites', value: stats.count3, icon: <FaHeart />, color: 'text-[#6db70e]' },
        { label: 'Membership', value: stats.count4, icon: <FaCheckCircle />, color: 'text-[#6db70e]' },
      ];
    }
  };

  const statConfig = getStatConfig();

  const isEmptyState = stats.count1 === 0 && stats.count2 === 0 && stats.count3 === 0;

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 dark:bg-[#111111] rounded-[2.5rem] p-10 text-white relative overflow-hidden border dark:border-[#242424] dark:border-[0.5px] shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6db70e]/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Welcome back, <span className="text-[#6db70e]">{user?.displayName?.split(' ')[0] || 'Chef'}</span>!
          </h1>
          <p className="text-slate-400 font-serif italic text-lg max-w-xl">
            "Your culinary journey continues. Here's what's happening in your kitchen today."
          </p>
        </div>
      </motion.div>

      {error ? (
        // Database & API Connection Error State
        <div className="bg-red-500/10 dark:bg-red-950/10 rounded-[2.5rem] p-10 text-center border border-red-200/50 dark:border-red-900/30 shadow-[0_12px_40px_rgba(239,68,68,0.08)] backdrop-blur-md">
          <div className="text-6xl mb-6 filter drop-shadow-[0_4px_10px_rgba(239,68,68,0.2)]">🔌</div>
          <h2 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-400 mb-3 tracking-tight">
            Dashboard Data Connection Interrupted
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-bold max-w-xl mx-auto text-sm mb-8 leading-relaxed">
            The system failed to retrieve your dashboard analytics and credentials from our MongoDB Atlas clusters. 
            <span className="block mt-3 font-mono text-xs text-red-500/90 dark:text-red-400/90 bg-red-100/50 dark:bg-red-950/40 p-4 rounded-2xl border border-red-200/30 dark:border-red-900/20 max-w-lg mx-auto truncate">
              {error}
            </span>
          </p>
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <button
              onClick={fetchDashboardData}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-[0_6px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_6px_25px_rgba(220,38,38,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer border-none"
            >
              Retry Connection
            </button>
            <button
              onClick={() => handleNavigate('/allmeals')}
              className="px-8 py-4 bg-slate-900 dark:bg-[#111111] text-slate-200 hover:text-white font-black rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-800 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
            >
              Browse Marketplace
            </button>
          </div>
        </div>
      ) : isEmptyState ? (
        // Beautiful Premium empty state UI when MongoDB has no records for the user
        <div className="space-y-10">
          <div className="bg-white dark:bg-[#111111] rounded-[2.5rem] p-10 text-center border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
            <div className="text-6xl mb-6">🍳</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-[#e0e0e0] mb-3 tracking-tight">
              Begin Your Culinary Adventure!
            </h2>
            <p className="text-slate-500 dark:text-[#888888] font-bold max-w-xl mx-auto text-sm mb-8 leading-relaxed">
              Your kitchen is currently sparkling clean and quiet. Start by adding your first home-cooked masterpiece or exploring delectable creations from fellow local chefs!
            </p>
            <div className="flex gap-4 justify-center items-center flex-wrap">
              {role === 'chef' ? (
                <button
                  onClick={() => handleNavigate('/dashboard/addmeals')}
                  className="px-8 py-4 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] font-black rounded-2xl shadow-[0_6px_20px_rgba(109,183,14,0.3)] hover:shadow-[0_6px_25px_rgba(109,183,14,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer border-none"
                >
                  Post Your First Meal
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate('/allmeals')}
                  className="px-8 py-4 bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] font-black rounded-2xl shadow-[0_6px_20px_rgba(109,183,14,0.3)] hover:shadow-[0_6px_25px_rgba(109,183,14,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer border-none"
                >
                  Explore Delicious Menu
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions (always accessible in empty state) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {role === 'user' && (
              <>
                <button 
                  onClick={() => handleNavigate('/allmeals')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaShoppingBag className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Browse Meals</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/myorder')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <MdPendingActions className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>View Orders</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/favoritemeal')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaHeart className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>My Favorites</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/reviews')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaStar className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Write Review</span>
                </button>
              </>
            )}
            
            {role === 'chef' && (
              <>
                <button 
                  onClick={() => handleNavigate('/dashboard/addmeals')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaUtensils className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Add New Meal</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/orderreq')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaShoppingBag className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Manage Orders</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/analytics')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <MdAnalytics className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>View Analytics</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/profile')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaUsers className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Update Profile</span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        // Standard full active stats rendering
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statConfig.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#111111] p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center justify-center group hover:border-[#6db70e]/30 transition-all duration-500"
              >
                <div className={`${stat.color} text-4xl mb-4 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-[#e0e0e0] tracking-tighter">{stat.value}</h3>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-8 uppercase tracking-tight">Performance Overview</h3>
              <div className="h-[300px]">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm flex flex-col items-center justify-center">
              <h3 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-8 uppercase tracking-tight">Engagement</h3>
              <div className="h-[250px] w-full">
                <Doughnut 
                  data={{
                    labels: ['Orders', 'Reviews', 'Favorites'],
                    datasets: [{
                      data: [stats.count1, stats.count2, stats.count3],
                      backgroundColor: ['#6db70e', '#a2e635', '#3d6e25'],
                    }]
                  }} 
                  options={{ responsive: true, maintainAspectRatio: false }} 
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {role === 'user' && (
              <>
                <button 
                  onClick={() => handleNavigate('/allmeals')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaShoppingBag className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Browse Meals</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/myorder')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <MdPendingActions className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>View Orders</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/favoritemeal')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaHeart className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>My Favorites</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/reviews')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaStar className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Write Review</span>
                </button>
              </>
            )}
            
            {role === 'chef' && (
              <>
                <button 
                  onClick={() => handleNavigate('/dashboard/addmeals')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaUtensils className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Add New Meal</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/orderreq')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaShoppingBag className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Manage Orders</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/analytics')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <MdAnalytics className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>View Analytics</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/profile')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaUsers className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Update Profile</span>
                </button>
              </>
            )}
            
            {(role === 'admin' || role === 'manager') && (
              <>
                <button 
                  onClick={() => handleNavigate('/dashboard/manageuser')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaUsers className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Manage Users</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/reports')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <MdAnalytics className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>View Reports</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/settings')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaChartLine className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>System Settings</span>
                </button>
                <button 
                  onClick={() => handleNavigate('/dashboard/StatisticsPage')}
                  className="bg-white dark:bg-[#111111] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
                >
                  <FaStar className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
                  <span>Analytics</span>
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
