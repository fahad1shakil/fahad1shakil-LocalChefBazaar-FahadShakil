import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiUser,
  FiShoppingBag,
  FiChevronDown 
} from 'react-icons/fi';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navLinks = user
    ? [
        { name: 'Home', path: '/' },
        { name: 'Meals', path: '/allmeals' },
        { name: 'Chefs', path: '/chefs' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Dashboard', path: 'dashbord' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Meals', path: '/allmeals' },
        { name: 'Chefs', path: '/chefs' },
        { name: 'Services', path: '/services' },
      ];

  const handleLogout = () => {
    if (!signoutUser) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            Swal.fire({
              title: 'Logged out!',
              text: 'Successfully logged out.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            toast.success('Successfully logged out!');
            setTimeout(() => navigate('/'), 1500);
          })
          .catch((error) => {
            toast.error(`Logout error: ${error.message}`);
          });
      }
    });
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50 h-[100px] flex items-center bg-transparent">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center px-10 lg:px-24 w-full mx-auto">
        {/* Logo Section - Left (White Area) */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-24 h-24 overflow-hidden flex items-center justify-center">
            <img 
              src="/Adobe Express - file.png" 
              alt="Chef Logo" 
              className="w-[180%] max-w-none object-contain transition-transform group-hover:scale-105"
              style={{ 
                filter: 'hue-rotate(-30deg) saturate(1.4) brightness(0.9)' 
              }}
            />
          </div>
          <div className="flex flex-col justify-center -ml-3">
            <span className="text-4xl font-black tracking-tighter text-slate-900 leading-none transition-all duration-300 group-hover:text-[#6db70e] group-hover:translate-x-1">
              LocalChef
            </span>
            <span className="text-xs font-black tracking-[0.5em] text-[#6db70e] uppercase mt-1">
              Bazaar
            </span>
          </div>
        </NavLink>

        {/* Right Section - Navigation & Icons */}
        <div className="flex items-center gap-12">
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-bold tracking-tight transition-all duration-300 ${
                    isActive
                      ? 'text-[#6db70e] border-b-2 border-[#6db70e] pb-1'
                      : 'text-slate-900 hover:text-[#6db70e] hover:scale-105'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 border-2 border-slate-900/10 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm hover:border-[#6db70e]/50 hover:text-[#6db70e] hover:scale-110 transition-all cursor-pointer text-slate-900"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
            </button>


            
            {user ? (
              <div className="relative group/user hidden sm:block">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#6db70e] shadow-sm"
                  />
                  <FiChevronDown className="text-slate-900" size={16} />
                </div>
                
                {/* Dropdown */}
                <div className="absolute top-[calc(100%+15px)] right-0 w-64 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-2 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 transform translate-y-2 group-hover/user:translate-y-0 border border-slate-100 dark:border-slate-800 z-[100]">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl mb-2">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                    <p className="text-slate-500 text-xs truncate">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <NavLink to="/dashbord/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold transition-all"><FiUser size={16} /> Profile</NavLink>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-bold transition-all"><FiLogOut size={16} /> Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink to="/signin" className="hidden sm:block">
                <button className="px-6 py-2 bg-white text-[#6db70e] font-black rounded-full text-sm shadow-xl hover:bg-slate-50 transition-all">
                  Login
                </button>
              </NavLink>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-900"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`lg:hidden fixed top-0 right-0 w-full h-screen bg-white dark:bg-slate-900 z-50 transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col`}>
        <div className="flex justify-between items-center mb-12">
          <img src="/Adobe Express - file.png" alt="Logo" className="w-12 h-12 object-contain" />
          <button onClick={() => setIsOpen(false)}><FiX size={32} /></button>
        </div>

        <nav className="flex flex-col gap-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black text-slate-800 dark:text-white hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => { setDarkMode(!darkMode); setIsOpen(false); }}
            className="text-xl font-bold mt-4"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {user ? (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-xl font-bold text-red-600">Sign Out</button>
          ) : (
            <NavLink to="/signin" onClick={() => setIsOpen(false)} className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-full text-xl shadow-xl">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

