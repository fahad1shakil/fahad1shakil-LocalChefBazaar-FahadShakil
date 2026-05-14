import React, { useContext, useEffect, useState } from 'react';
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
  FaEye
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
} from 'chart.js';
import axios from 'axios';
import Loading from '../../../Componentes/Loading';

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
  ArcElement
);

const DashboardOverview = () => {
  const { user, role } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;
      
      try {
        setLoading(true);
        
        // Fetch different data based on role
        const endpoints = {
          user: [
            `${import.meta.env.VITE_BACKEND_API}/orders/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/favorites/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/reviews/${user.email}`
          ],
          chef: [
            `${import.meta.env.VITE_BACKEND_API}/chef-meals/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/chef-orders/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/chef-analytics/${user.email}`
          ],
          admin: [
            `${import.meta.env.VITE_BACKEND_API}/admin-stats`,
            `${import.meta.env.VITE_BACKEND_API}/all-users`,
            `${import.meta.env.VITE_BACKEND_API}/all-orders`
          ],
          manager: [
            `${import.meta.env.VITE_BACKEND_API}/manager-stats`,
            `${import.meta.env.VITE_BACKEND_API}/all-users`,
            `${import.meta.env.VITE_BACKEND_API}/pending-requests`
          ]
        };

        const roleEndpoints = endpoints[role] || endpoints.user;
        
        // Fetch all data concurrently with error handling
        const responses = await Promise.allSettled(
          roleEndpoints.map(url => axios.get(url).catch(() => ({ data: { data: [] } })))
        );
        
        const data = responses.map(response => 
          response.status === 'fulfilled' ? response.value.data : { data: [] }
        );

        setDashboardData({
          primary: data[0]?.data || [],
          secondary: data[1]?.data || [],
          tertiary: data[2]?.data || []
        });
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setDashboardData({ primary: [], secondary: [], tertiary: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email, role]);

  // Generate overview cards based on role
  const getOverviewCards = () => {
    if (!dashboardData) return [];

    const { primary, secondary, tertiary } = dashboardData;

    switch (role) {
      case 'admin':
        return [
          { title: 'Total Users', value: secondary?.length || 0, icon: <FaUsers />, color: 'bg-blue-500', change: '+12%' },
          { title: 'Total Orders', value: tertiary?.length || 0, icon: <FaShoppingBag />, color: 'bg-green-500', change: '+8%' },
          { title: 'Revenue', value: `$${(tertiary?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0).toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-purple-500', change: '+15%' },
          { title: 'Pending Requests', value: primary?.pendingRequests || 0, icon: <MdPendingActions />, color: 'bg-orange-500', change: '-5%' }
        ];
      
      case 'chef':
        return [
          { title: 'My Meals', value: primary?.length || 0, icon: <MdRestaurantMenu />, color: 'bg-green-500', change: '+3%' },
          { title: 'Orders Received', value: secondary?.length || 0, icon: <FaShoppingBag />, color: 'bg-blue-500', change: '+18%' },
          { title: 'Total Earnings', value: `$${(secondary?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0).toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-purple-500', change: '+22%' },
          { title: 'Average Rating', value: (tertiary?.averageRating || 4.5).toFixed(1), icon: <FaStar />, color: 'bg-yellow-500', change: '+0.2%' }
        ];
      
      case 'manager':
        return [
          { title: 'Total Users', value: secondary?.length || 0, icon: <FaUsers />, color: 'bg-blue-500', change: '+12%' },
          { title: 'Pending Requests', value: tertiary?.length || 0, icon: <MdPendingActions />, color: 'bg-orange-500', change: '-8%' },
          { title: 'Active Chefs', value: secondary?.filter(u => u.role === 'chef')?.length || 0, icon: <FaUtensils />, color: 'bg-green-500', change: '+5%' },
          { title: 'Monthly Reports', value: primary?.reports || 24, icon: <MdAnalytics />, color: 'bg-purple-500', change: '+10%' }
        ];
      
      default: // user
        return [
          { title: 'My Orders', value: primary?.length || 0, icon: <FaShoppingBag />, color: 'bg-blue-500', change: '+2' },
          { title: 'Favorite Meals', value: secondary?.length || 0, icon: <FaHeart />, color: 'bg-red-500', change: '+5' },
          { title: 'My Reviews', value: tertiary?.length || 0, icon: <FaStar />, color: 'bg-yellow-500', change: '+1' },
          { title: 'Total Spent', value: `$${(primary?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0).toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-green-500', change: '+$45' }
        ];
    }
  };

  // Generate chart data
  const getChartData = () => {
    if (!dashboardData) return null;
    
    // Line Chart -> Smooth Area Chart
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const dailyOrders = last7Days.map(() => Math.floor(Math.random() * 10) + 1);

    const lineChartData = {
      labels: last7Days,
      datasets: [
        {
          label: role === 'user' ? 'My Orders' : role === 'chef' ? 'Orders Received' : 'Total Orders',
          data: dailyOrders,
          borderColor: '#6db70e',
          backgroundColor: 'rgba(109, 183, 14, 0.2)',
          borderWidth: 3,
          tension: 0.5,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
        },
      ],
    };

    // Polar Area Chart (Replaces Bar)
    const barLabels = role === 'user' 
      ? ['Pending', 'Accepted', 'Delivered', 'Cancelled']
      : role === 'chef'
      ? ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
      : ['Users', 'Chefs', 'Admins', 'Managers'];

    const barData = barLabels.map(() => Math.floor(Math.random() * 50) + 10);

    const polarChartData = {
      labels: barLabels,
      datasets: [
        {
          label: role === 'user' ? 'Order Status' : role === 'chef' ? 'Meal Categories' : 'User Roles',
          data: barData,
          backgroundColor: [
            'rgba(109, 183, 14, 0.8)',
            'rgba(30, 41, 59, 0.8)',
            'rgba(203, 213, 225, 0.8)',
            'rgba(148, 163, 184, 0.8)',
          ],
          borderWidth: 0,
        },
      ],
    };

    // Doughnut Gauge Chart (Replaces Pie)
    const pieLabels = role === 'user'
      ? ['Fast Food', 'Healthy', 'Desserts', 'Beverages']
      : role === 'chef'
      ? ['Completed', 'Pending', 'Cancelled']
      : ['Revenue', 'Expenses', 'Profit'];

    const pieData = pieLabels.map(() => Math.floor(Math.random() * 100) + 20);

    const doughnutChartData = {
      labels: pieLabels,
      datasets: [
        {
          data: pieData,
          backgroundColor: [
            '#6db70e',
            '#1e293b',
            '#cbd5e1',
            '#94a3b8',
          ],
          borderWidth: 0,
          hoverOffset: 15,
        },
      ],
    };

    return { lineChartData, polarChartData, doughnutChartData };
  };

  if (loading) return <Loading />;

  const overviewCards = getOverviewCards();
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12 font-sans">
      <title>LocalChefBazaar || Dashboard</title>
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
          Welcome back, <span className="text-[#6db70e]">{user?.displayName || 'User'}</span>!
        </h1>
        <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">
          {role} Dashboard Overview
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 border border-slate-100 hover:shadow-[0_20px_40px_rgba(109,183,14,0.12)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
                <p className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{card.value}</p>
                <p className="text-sm font-bold text-[#6db70e] mt-2 flex items-center gap-1">
                  <span className="bg-[#6db70e]/10 px-2 py-0.5 rounded-full">{card.change}</span>
                  <span className="text-slate-400 font-medium ml-1">vs last month</span>
                </p>
              </div>
              <div className="bg-[#6db70e]/10 p-5 rounded-2xl text-[#6db70e] text-3xl group-hover:scale-110 group-hover:bg-[#6db70e] group-hover:text-white transition-all duration-300 shadow-sm">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {/* Smooth Area Chart */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-6">Activity Timeline</h3>
            <Line 
              data={chartData.lineChartData} 
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { color: '#f8fafc' }, border: { display: false } },
                  x: { grid: { display: false }, border: { display: false } }
                },
                interaction: { mode: 'index', intersect: false },
              }}
            />
          </div>

          {/* Polar Area Chart */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 border border-slate-100 flex flex-col">
            <h3 className="text-xl font-black text-slate-900 mb-6">Distribution Map</h3>
            <div className="flex-1 flex items-center justify-center">
                <PolarArea 
                data={chartData.polarChartData}
                options={{
                    responsive: true,
                    plugins: { 
                    legend: { display: false }
                    },
                    scales: {
                    r: { ticks: { display: false }, grid: { color: '#f1f5f9' }, border: { display: false } }
                    }
                }}
                />
            </div>
          </div>

          {/* Doughnut Gauge Chart */}
          <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 border border-slate-100 flex flex-col">
            <h3 className="text-xl font-black text-slate-900 mb-6">Category Breakdown</h3>
            <div className="flex-1 flex items-center justify-center relative">
                <Doughnut 
                data={chartData.doughnutChartData}
                options={{
                    responsive: true,
                    cutout: '75%',
                    plugins: { 
                    legend: { 
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20, font: { weight: 'bold' } }
                    }
                    },
                }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                    <span className="text-3xl font-black text-slate-900">100%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total</span>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Table */}
      <div className="bg-white rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden mb-12">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900">Recent Activity</h3>
          <button className="text-sm font-bold text-[#6db70e] hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  {role === 'user' ? 'Order' : role === 'chef' ? 'Meal' : 'Item'}
                </th>
                <th className="px-8 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Date
                </th>
                <th className="px-8 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-8 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Array.from({ length: 5 }, (_, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-slate-900">
                    {role === 'user' ? `Order #${1000 + i}` : role === 'chef' ? `Meal ${i + 1}` : `Item ${i + 1}`}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`px-3 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider ${
                      i % 3 === 0 ? 'bg-[#6db70e]/10 text-[#6db70e]' : 
                      i % 3 === 1 ? 'bg-amber-100 text-amber-600' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Cancelled'}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-500">
                    {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-black text-slate-900">
                    ${(Math.random() * 50 + 10).toFixed(2)}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-bold">
                    <button className="text-[#6db70e] hover:text-[#4a8208] cursor-pointer flex items-center gap-2 bg-[#6db70e]/5 px-3 py-1.5 rounded-lg hover:bg-[#6db70e]/10 transition-colors">
                      <FaEye />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {role === 'user' && (
          <>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaShoppingBag className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Browse Meals
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <MdPendingActions className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> View Orders
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaHeart className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> My Favorites
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaStar className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Write Review
            </button>
          </>
        )}
        
        {role === 'chef' && (
          <>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaUtensils className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Add New Meal
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaShoppingBag className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Manage Orders
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <MdAnalytics className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> View Analytics
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaUsers className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Update Profile
            </button>
          </>
        )}
        
        {(role === 'admin' || role === 'manager') && (
          <>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaUsers className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Manage Users
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <MdAnalytics className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> View Reports
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaChartLine className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> System Settings
            </button>
            <button className="bg-white hover:border-[#6db70e] border border-slate-200 hover:shadow-[0_10px_30px_rgba(109,183,14,0.1)] text-slate-700 hover:text-[#6db70e] p-6 rounded-[2rem] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group">
              <FaStar className="text-3xl text-slate-300 group-hover:text-[#6db70e] group-hover:-translate-y-1 transition-all" /> Analytics
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
