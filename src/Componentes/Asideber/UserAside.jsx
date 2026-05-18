import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaShoppingBag,
  FaStar,
  FaHeart,
  FaSignOutAlt,
  FaArrowLeft,
  FaChartLine,
  FaHome,
} from 'react-icons/fa';
import {
  MdRestaurantMenu,
  MdRestaurant,
  MdPendingActions,
  MdDashboard,
  MdAnalytics,
} from 'react-icons/md';
import { FiUsers, FiSettings, FiBarChart } from 'react-icons/fi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import Logo from '../../assets/Logo.png';
import axios from 'axios';

const UserAside = () => {
  const { user, signoutUser, role: contextRole } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Use contextRole directly or fetch from API
  const [fetchedRole, setFetchedRole] = useState('user');
  const role = contextRole || fetchedRole;

  // Fetch role only if not available in context
  useEffect(() => {
    if (!user?.email || contextRole) return;

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/check-role/${user.email}`
        );

        if (res.data?.success) {
          setFetchedRole(res.data.role);
        }
      } catch (err) {
        console.error('Role fetch failed:', err);
        setFetchedRole('user'); 
      }
    };

    fetchRole();
  }, [user?.email, contextRole]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            toast.success('Logged out successfully');
            navigate('/');
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const linkStyle =
    'flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-slate-500 dark:text-[#888888] hover:bg-[#6db70e]/10 dark:hover:bg-[#7ecf55]/10 hover:text-[#6db70e] dark:hover:text-[#7ecf55] transition-all duration-300 cursor-pointer group';
  const activeStyle = 'bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 text-[#6db70e] dark:text-[#7ecf55] border-l-4 border-[#6db70e] dark:border-[#7ecf55] shadow-sm';

  // Role-based menu items
    const getMenuItems = () => {
      const commonItems = [
        { to: '/dashboard/overview', icon: <MdDashboard />, label: 'Dashboard Overview' },
        { to: '/dashboard/profile', icon: <FaUser />, label: 'My Profile' },
      ];

    switch (role) {
      case 'admin':
        return [
          ...commonItems,
          { to: '/dashboard/manageuser', icon: <FiUsers />, label: 'Manage Users' },
          { to: '/dashboard/managerequest', icon: <MdPendingActions />, label: 'Manage Requests' },
          { to: '/dashboard/StatisticsPage', icon: <MdAnalytics />, label: 'Market Analytics' },
          { to: '/dashboard/settings', icon: <FiSettings />, label: 'System Settings' },
        ];
      
      case 'chef':
        return [
          ...commonItems,
          { to: '/dashboard/addmeals', icon: <MdRestaurantMenu />, label: 'Create Meal' },
          { to: '/dashboard/mymeals', icon: <MdRestaurant />, label: 'My Meals' },
          { to: '/dashboard/orderreq', icon: <MdPendingActions />, label: 'Order Requests' },
          { to: '/dashboard/analytics', icon: <MdAnalytics />, label: 'Chef Analytics' },
        ];
      
      case 'manager':
        return [
          ...commonItems,
          { to: '/dashboard/manageuser', icon: <FiUsers />, label: 'Manage Users' },
          { to: '/dashboard/managerequest', icon: <MdPendingActions />, label: 'Manage Requests' },
          { to: '/dashboard/reports', icon: <FaChartLine />, label: 'Reports' },
        ];
      
      default: // user
        return [
          ...commonItems,
          { to: '/dashboard/myorder', icon: <FaShoppingBag />, label: 'My Orders' },
          { to: '/dashboard/reviews', icon: <FaStar />, label: 'My Reviews' },
          { to: '/dashboard/favoritemeal', icon: <FaHeart />, label: 'Favorite Meals' },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="p-6 flex flex-col h-full bg-white dark:bg-[#111111] shadow-[10px_0_40px_rgba(0,0,0,0.03)] border-r border-slate-100 dark:border-[#242424] dark:border-[0.5px] relative z-20 w-full lg:w-[280px] transition-colors duration-500">
      {/* Logo and Brand */}
      <Link to="/" className="flex flex-col items-center gap-3 mb-10 pb-6 border-b border-slate-100 dark:border-[#242424] dark:border-[0.5px] group">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-[#111111] border-2 border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-md group-hover:border-[#6db70e] transition-all duration-300">
            <img 
              src="/logo.png" 
              alt="Chef Logo" 
              className="w-[110%] h-[110%] max-w-none object-contain transition-transform duration-300 group-hover:scale-110"
              style={{ filter: 'hue-rotate(-30deg) saturate(1.4) brightness(0.9)' }}
            />
        </div>
        <div className="flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 dark:text-[#e0e0e0] leading-none group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55] transition-colors">
              LocalChef
            </span>
            <span className="text-[10px] font-black tracking-[0.5em] text-[#6db70e] dark:text-[#7ecf55] uppercase mt-1">
              Bazaar
            </span>
        </div>
      </Link>

      {/* User Info */}
      <div className="mb-8 flex items-center gap-3 p-4 bg-slate-50 dark:bg-[#0f0f0f] rounded-2xl border border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm group hover:border-[#6db70e]/30 dark:hover:border-[#7ecf55]/30 transition-colors">
          <div className="relative">
            <img
              src={user?.photoURL || 'https://i.ibb.co/7CMqG7N/default-avatar.jpg'}
              className="w-12 h-12 rounded-2xl border-2 border-white dark:border-[#242424] dark:border-[0.5px] object-cover shadow-xl"
              alt="Profile"
            />
          </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 dark:text-[#e0e0e0] truncate">
            {user?.displayName || 'User'}
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-[#888888] truncate mb-1">{user?.email}</p>
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold bg-[#6db70e]/10 dark:bg-[#7ecf55]/10 text-[#6db70e] dark:text-[#7ecf55] rounded-full uppercase tracking-wider">
            {role}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-2">
          Menu
        </h3>
        
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.to === ''}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ''}`
            }
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-[#555555] uppercase tracking-widest mb-3 pl-2">
            Quick Actions
          </h3>
          
          <Link to="/" className={linkStyle}>
            <span className="text-xl group-hover:scale-110 transition-transform"><FaHome /></span>
            <span>Back to Home</span>
          </Link>
          
          <button onClick={() => navigate(-1)} className={linkStyle + " w-full text-left"}>
            <span className="text-xl group-hover:scale-110 transition-transform"><FaArrowLeft /></span>
            <span>Go Back</span>
          </button>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-[#242424] dark:border-[0.5px]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500 rounded-xl hover:bg-red-600 dark:hover:bg-red-600 hover:text-white dark:hover:text-white transition-all duration-300 font-bold shadow-sm group border border-red-200/50 dark:border-[0.5px] dark:border-red-900/30 cursor-pointer"
        >
          <FaSignOutAlt className="text-lg group-hover:-translate-x-1 transition-transform" />
          <span>Logout securely</span>
        </button>
      </div>
    </div>
  );
};

export default UserAside;
