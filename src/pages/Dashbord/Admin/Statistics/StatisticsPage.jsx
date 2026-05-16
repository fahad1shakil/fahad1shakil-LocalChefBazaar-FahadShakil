import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import Loading from '../../../../Componentes/Loading';
import { 
  FiTrendingUp, 
  FiActivity, 
  FiPieChart, 
  FiUsers, 
  FiDollarSign, 
  FiShoppingBag,
  FiBox,
  FiClock,
  FiTarget,
  FiZap
} from 'react-icons/fi';

const StatisticsPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMeals: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'LocalChefBazar || Boutique Intelligence';

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/admin-stats`);
        setStats(res.data || {});
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Mock Trend Data for dynamic feel (until backend provides history)
  const trendData = [
    { name: 'Mon', revenue: stats.totalRevenue * 0.1, users: stats.totalUsers * 0.2 },
    { name: 'Tue', revenue: stats.totalRevenue * 0.15, users: stats.totalUsers * 0.3 },
    { name: 'Wed', revenue: stats.totalRevenue * 0.12, users: stats.totalUsers * 0.25 },
    { name: 'Thu', revenue: stats.totalRevenue * 0.2, users: stats.totalUsers * 0.4 },
    { name: 'Fri', revenue: stats.totalRevenue * 0.25, users: stats.totalUsers * 0.5 },
    { name: 'Sat', revenue: stats.totalRevenue * 0.3, users: stats.totalUsers * 0.8 },
    { name: 'Sun', revenue: stats.totalRevenue * 0.4, users: stats.totalUsers * 1 },
  ];

  const distributionData = [
    { name: 'Delivered', value: stats.deliveredOrders || 0 },
    { name: 'Pending', value: stats.pendingOrders || 0 },
  ];

  const DISTRIBUTION_COLORS = ['#6db70e', '#a2e635'];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] text-slate-900 dark:text-white pb-32 transition-colors duration-500 font-sans overflow-x-hidden">
      
      {/* Dynamic Command Header */}
      <div className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6db70e]/5 rounded-full blur-[150px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-[#6db70e]/10 px-5 py-2 rounded-full border border-[#6db70e]/20">
                <FiZap className="text-[#6db70e] animate-pulse" size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6db70e]">Intelligence Matrix 4.0</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
                Analytics <span className="text-[#6db70e]">&</span> Reports
              </h1>
              <p className="text-slate-400 font-serif italic text-sm md:text-base max-w-xl">
                Real-time operational overview of the LocalChefBazaar ecosystem. Monitoring capital flow and personnel efficiency.
              </p>
            </div>
            
            <div className="hidden lg:flex items-center gap-10 border-l border-slate-100 dark:border-white/10 pl-10">
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">System Health</p>
                  <p className="text-2xl font-black text-[#6db70e] uppercase tracking-tighter">Optimum</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Data Latency</p>
                  <p className="text-2xl font-black text-blue-500 uppercase tracking-tighter">0.4ms</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Executive Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Platform Users', value: stats.totalUsers, icon: <FiUsers />, trend: '+12%', color: 'text-[#6db70e]' },
            { label: 'Culinary Assets', value: stats.totalMeals, icon: <FiBox />, trend: '+5%', color: 'text-[#6db70e]' },
            { label: 'Total Volume', value: stats.totalOrders, icon: <FiShoppingBag />, trend: '+24%', color: 'text-[#6db70e]' },
            { label: 'Gross Capital', value: `$${parseFloat(stats.totalRevenue || 0).toLocaleString()}`, icon: <FiDollarSign />, trend: '+18%', color: 'text-[#6db70e]' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                {stat.icon}
              </div>
              <div className={`${stat.color} mb-6`}>{stat.icon}</div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">{stat.value}</h3>
                  <span className="text-[10px] font-black text-[#6db70e] pb-1">{stat.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Data Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Revenue Trajectory (Large Area Chart) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-10 rounded-[3.5rem] shadow-sm"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none mb-2">Capital Trajectory</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weekly Performance Cycle</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#6db70e]">
                  <div className="w-2 h-2 rounded-full bg-[#6db70e]" /> Revenue
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#6db70e] opacity-60 ml-4">
                  <div className="w-2 h-2 rounded-full bg-[#6db70e]" /> Users
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6db70e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6db70e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6db70e" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6db70e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                    dy={15}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '1rem', backgroundColor: '#fff' }}
                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6db70e" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="users" stroke="#6db70e" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Operational Distribution (Pie Chart) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 bg-slate-900 dark:bg-white p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6db70e]/20 rounded-full blur-[60px] -mr-16 -mt-16" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black tracking-tighter text-white dark:text-slate-900 uppercase leading-none mb-2">Order Allocation</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6db70e] mb-10">Fulfillment Pipeline</p>
              
              <div className="h-[250px] w-full mb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={10}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={DISTRIBUTION_COLORS[index % DISTRIBUTION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {distributionData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 dark:bg-slate-50 p-4 rounded-2xl border border-white/10 dark:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DISTRIBUTION_COLORS[i] }} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white dark:text-slate-900">{d.name}</span>
                    </div>
                    <span className="font-black text-white dark:text-slate-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tactical Intelligence Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: 'System Uptime', value: '99.99%', icon: <FiZap />, color: 'text-green-500' },
             { label: 'Target Achievement', value: '86%', icon: <FiTarget />, color: 'text-purple-500' },
             { label: 'Avg Process Time', value: '14.2 min', icon: <FiClock />, color: 'text-blue-500' }
           ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + (idx * 0.1) }}
               className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 rounded-[2.5rem] flex items-center gap-6"
             >
                <div className={`${item.color} bg-white dark:bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm`}>
                  {item.icon}
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                   <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{item.value}</p>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default StatisticsPage;