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
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        if (role === 'admin' || role === 'manager') {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/admin-stats`).catch(() => ({ data: {} }));
          setStats({
            count1: res.data.totalUsers || 0,
            count2: res.data.totalMeals || 0,
            count3: res.data.totalOrders || 0,
            count4: res.data.totalRevenue || 0,
          });
        } else if (role === 'chef') {
          const [mealsRes, ordersRes, reviewsRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_API}/meals`).catch(() => ({ data: { data: [] } })),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-orders/${user.email}`).catch(() => ({ data: { data: [] } })),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-reviews/${user.email}`).catch(() => ({ data: { data: [] } }))
          ]);
          
          const chefMeals = Array.isArray(mealsRes.data?.data) ? mealsRes.data.data.filter(m => m.chefEmail === user.email) : [];
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
            axios.get(`${import.meta.env.VITE_BACKEND_API}/orders/${user.email}`).catch(() => ({ data: { data: [] } })),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/user-reviews/${user.email}`).catch(() => ({ data: { data: [] } })),
            axios.get(`${import.meta.env.VITE_BACKEND_API}/favorites/${user.email}`).catch(() => ({ data: { data: [] } }))
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
      } finally {
        setLoading(false);
      }
    };

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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statConfig.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#151515] p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-[#242424] dark:border-[0.5px] flex flex-col items-center justify-center group hover:border-[#6db70e]/30 transition-all duration-500"
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
        <div className="lg:col-span-2 bg-white dark:bg-[#151515] p-8 rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-[#e0e0e0] mb-8 uppercase tracking-tight">Performance Overview</h3>
          <div className="h-[300px]">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white dark:bg-[#151515] p-8 rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm flex flex-col items-center justify-center">
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
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaShoppingBag className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>Browse Meals</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/myorder')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <MdPendingActions className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>View Orders</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/favoritemeal')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaHeart className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>My Favorites</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/reviews')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
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
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaUtensils className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>Add New Meal</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/orderreq')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaShoppingBag className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>Manage Orders</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/analytics')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <MdAnalytics className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>View Analytics</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/profile')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
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
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaUsers className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>Manage Users</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/reports')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <MdAnalytics className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>View Reports</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/settings')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaChartLine className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>System Settings</span>
            </button>
            <button 
              onClick={() => handleNavigate('/dashboard/StatisticsPage')}
              className="bg-white dark:bg-[#151515] hover:border-[#6db70e] dark:hover:border-[#7ecf55] border border-slate-200 dark:border-[#242424] hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 dark:text-[#f0f0f0] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group active:scale-95"
            >
              <FaStar className="text-3xl text-slate-300 dark:text-[#555555] group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] group-hover:-translate-y-1 transition-all" /> 
              <span>Analytics</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
