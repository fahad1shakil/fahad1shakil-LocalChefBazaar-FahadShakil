import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiUser,
  FiChevronDown,
  FiHome,
  FiCoffee,
  FiUsers,
  FiSettings,
  FiGrid,
  FiPhone,
  FiSearch
} from 'react-icons/fi';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
    } catch (e) {
      return false;
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Meals', path: '/allmeals', icon: <FiCoffee /> },
    { name: 'Chefs', path: '/chefs', icon: <FiUsers /> },
    { name: 'Recipes', path: '/blog', icon: <FiSettings /> },
    { name: 'Contact', path: '/contact', icon: <FiPhone /> },
  ];

  if (user) {
    navLinks.push({ name: 'Dashboard', path: '/dashboard', icon: <FiGrid /> });
  }

  const handleLogout = () => {
    if (!signoutUser) return;
    setIsOpen(false);

    Swal.fire({
      title: 'Sign Out?',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6db70e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      background: darkMode ? '#0f172a' : '#fff',
      color: darkMode ? '#f8fafc' : '#0f172a',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            toast.success('Successfully logged out!');
            navigate('/');
          })
          .catch((error) => {
            toast.error(`Logout error: ${error.message}`);
          });
      }
    });
  };

  return (
    <header className="w-full sticky top-0 z-50 h-[100px] flex items-center transition-all duration-300 bg-white dark:bg-[#121212] border-b border-slate-100 dark:border-[#242424] dark:border-[0.5px] shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-24 w-full mx-auto">
        
        {/* Brand Identity - Left Section */}
        <NavLink 
          to="/" 
          className="flex items-center gap-3 md:gap-5 group shrink-0"
        >
          <div className="relative">
            {/* Premium Glow Effect */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6db70e] to-[#a2e635] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-all duration-700 group-hover:duration-300"></div>
            
            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-[#151515] border-2 border-slate-100 dark:border-[#242424] shadow-sm group-hover:shadow-xl group-hover:border-[#6db70e] dark:group-hover:border-[#7ecf55] transition-all duration-500 z-10">
              <img 
                src="/logo.png" 
                alt="Chef Logo" 
                className="w-[110%] h-[110%] max-w-none object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
              />
              {/* Subtle Overlay for Polish */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6db70e]/5 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none transition-all duration-300 group-hover:text-[#6db70e] dark:group-hover:text-[#7ecf55]">
              LocalChef
            </span>
            <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-[#6db70e] dark:text-[#7ecf55] uppercase mt-1 transition-all duration-300 group-hover:tracking-[0.4em]">
              Bazaar
            </span>
          </div>
        </NavLink>

        {/* Right Section - Navigation & Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-sm xl:text-base font-black uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-[#6db70e] dark:text-[#7ecf55]'
                      : 'text-slate-500 dark:text-[#888888] hover:text-[#6db70e]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 md:p-3 border border-slate-100 dark:border-[#242424] rounded-xl bg-slate-50 dark:bg-[#111111] shadow-sm hover:border-[#6db70e] transition-all cursor-pointer text-slate-900 dark:text-white"
            >
              {darkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {user ? (
               <div className="relative group/user flex items-center">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="p-[2px] rounded-full border-2 border-[#6db70e] shadow-sm">
                      <img
                        src={user?.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
                        alt="User"
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Dropdown Desktop */}
                  <div className="absolute top-[calc(100%+15px)] right-0 w-64 bg-white dark:bg-[#0f0f0f] shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 border border-slate-100 dark:border-[#242424] z-[100] hidden sm:block">
                    <div className="p-4 bg-slate-50 dark:bg-[#151515] rounded-xl mb-2">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                      <p className="text-slate-500 dark:text-[#888888] text-xs truncate">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                      <NavLink to="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#111111] text-slate-600 dark:text-white font-bold transition-all"><FiUser size={16} /> Profile</NavLink>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-all"><FiLogOut size={16} /> Sign Out</button>
                    </div>
                  </div>
               </div>
            ) : (
              <NavLink to="/signin">
                <button className="px-5 py-2.5 bg-[#6db70e] text-white font-black rounded-xl text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all active:scale-95">
                  Login
                </button>
              </NavLink>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-[#151515] border border-slate-200 dark:border-[#242424] text-slate-900 dark:text-white"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 right-0 w-full h-screen bg-white dark:bg-[#0f0f0f] z-[100] p-6 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-[#242424] pb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#6db70e] dark:bg-[#6bcf7f] flex items-center justify-center text-white dark:text-[#0f0f0f] font-black text-2xl shadow-lg">L</div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-slate-900 dark:text-[#e8e8e8] leading-none tracking-tighter">LocalChef</span>
                  <span className="text-[10px] font-black text-[#6db70e] dark:text-[#6bcf7f] uppercase tracking-[0.3em] mt-0.5">Bazaar</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-100 dark:bg-[#151515] rounded-2xl text-slate-900 dark:text-[#e8e8e8] active:scale-90 transition-all"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* User Profile Section in Mobile Menu */}
            {user && (
              <div className="mb-6 p-4 bg-slate-50 dark:bg-[#111111] rounded-[2rem] border border-slate-100 dark:border-[#242424] flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#6db70e] shadow-lg">
                  <img 
                    src={user?.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'} 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-slate-900 dark:text-[#e8e8e8] truncate text-lg tracking-tight">
                    {user?.displayName || 'Active User'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#888888] truncate mb-2">{user?.email}</p>
                  <NavLink 
                    to="/dashboard/profile" 
                    onClick={() => setIsOpen(false)}
                    className="inline-block px-3 py-1 bg-[#6db70e] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm"
                  >
                    View Profile
                  </NavLink>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-3 overflow-y-auto flex-1 px-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-[#6db70e] dark:bg-[#7ecf55] text-white dark:text-[#0f0f0f] shadow-xl' 
                          : 'text-slate-600 dark:text-[#e8e8e8] hover:bg-slate-100 dark:hover:bg-[#111111]'
                      }`
                    }
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-black uppercase tracking-widest text-xs">{link.name}</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-[#242424] flex flex-col gap-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-[#111111] rounded-2xl">
                <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-[#888888]">Appearance</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0f0f0f] rounded-xl shadow-sm border border-slate-100 dark:border-[#242424] dark:border-[0.5px] font-bold text-xs text-slate-900 dark:text-slate-50"
                >
                  {darkMode ? <><FiSun className="text-yellow-400" /> Light</> : <><FiMoon className="text-slate-400" /> Dark</>}
                </button>
              </div>
              
              {user && (
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
                >
                  <FiLogOut size={18} />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
