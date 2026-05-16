import { auth } from '../Firebase/Firebase.confige';
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { FiArrowRight, FiUserPlus } from 'react-icons/fi';

const SignIn = () => {
  const { user, signinUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // Auto-redirect ONLY when profile is fully ready
  React.useEffect(() => {
    if (user && user.photoURL) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    signinUser(email, passcode)
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Welcome back! JOSS!');
        navigate('/dashboard/profile');
      })
      .catch((err) => {
        console.error('Sign-in error:', err);
        let errorMessage = 'Login failed. Please try again.';
        switch (err.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password. Please check your credentials.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          default:
            errorMessage = err.message || 'Login failed.';
        }
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Google login successful! JOSS!');
      navigate('/dashboard/profile');
    } catch (error) {
      console.error('Google sign-in error:', error);
      let errorMessage = 'Google sign-in failed.';
      if (error.code === 'auth/popup-closed-by-user') errorMessage = 'Sign-in cancelled.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email first!');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
      })
      .catch((err) => {
        toast.error('Failed to send reset email.');
      });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      <Helmet>
        <title>Login | LocalChefBazaar</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f0f0f] fixed" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7ecf55]/5 rounded-full blur-[120px] z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7ecf55]/5 rounded-full blur-[120px] z-0 animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4 py-8"
      >
        <div className="bg-white/85 dark:bg-[#111111]/90 backdrop-blur-2xl border border-white/40 dark:border-[#242424] dark:border-[0.5px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden transition-colors duration-500">
          
          {/* Header Section */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-[#0f0f0f] dark:via-[#111111] dark:to-[#0f0f0f] p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6db70e] dark:from-[#7ecf55] via-transparent to-transparent" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-4"
            >
               <div className="w-14 h-14 bg-gradient-to-tr from-[#6db70e] dark:from-[#7ecf55] to-[#4a8208] dark:to-[#5a9c0c] rounded-xl flex items-center justify-center shadow-lg transform rotate-12">
                  <FiArrowRight className="text-white dark:text-[#0f0f0f] text-2xl" />
               </div>
            </motion.div>
            
            <h2 className="text-3xl font-black text-white dark:text-[#e0e0e0] mb-2 tracking-tight uppercase">
              Welcome <span className="text-[#6db70e] dark:text-[#7ecf55]">Back</span>
            </h2>
            <p className="text-slate-400 dark:text-[#888888] font-medium tracking-widest text-[9px] uppercase">
              Access Your Boutique Portfolio
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {/* Google Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 mb-6 bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-xl hover:border-[#6db70e] dark:hover:border-[#7ecf55] hover:bg-[#6db70e]/5 dark:hover:bg-[#7ecf55]/5 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <FcGoogle size={24} />
              <span className="font-bold text-slate-800 dark:text-[#e0e0e0] text-sm tracking-tight">
                {loading ? 'Wait...' : 'Continue with Google Account'}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-[#242424]"></div>
              <span className="text-slate-400 dark:text-[#888888] text-[8px] font-black tracking-[0.2em] uppercase">Auth Gateway</span>
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-[#242424]"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="group">
                <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">
                  Private Email
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                    <AiOutlineMail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-6 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <div className="flex justify-between items-end mb-1.5">
                  <label className="text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest ml-1">
                    Passcode
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[9px] font-black text-[#6db70e] dark:text-[#7ecf55] hover:text-[#4a8208] dark:hover:text-[#5a9c0c] uppercase tracking-widest transition-colors"
                  >
                    Reset?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                    <AiOutlineLock size={18} />
                  </div>
                  <input
                    type={show ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleToggle}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] hover:text-[#6db70e] dark:hover:text-[#7ecf55] transition-colors"
                  >
                    {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-red-50 border border-red-100 text-red-600 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-600 rounded-full animate-ping" />
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 bg-slate-900 dark:bg-[#111111] text-white dark:text-[#e0e0e0] rounded-xl font-black text-base shadow-lg hover:shadow-[0_15px_30px_rgba(109,183,14,0.3)] transition-all overflow-hidden flex items-center justify-center gap-2 cursor-pointer border dark:border-[#242424] dark:border-[0.5px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6db70e] dark:from-[#7ecf55] to-[#4a8208] dark:to-[#5a9c0c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">{loading ? 'Working...' : 'Enter Bazaar'}</span>
                <FiArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 dark:text-[#888888] text-[11px] font-medium flex items-center justify-center gap-2">
                New to the Bazaar?
                <NavLink
                  to="/signup"
                  className="relative text-[#6db70e] dark:text-[#7ecf55] font-medium hover:text-[#5a9c0c] dark:hover:text-[#a3e635] transition-all duration-300 inline-flex items-center gap-1.5 group py-1 px-3 hover:bg-[#6db70e]/5 dark:hover:bg-[#7ecf55]/5 rounded-full"
                >
                  <span className="relative">
                    Register
                    <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#6db70e]/60 dark:bg-[#7ecf55]/60 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <FiUserPlus className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 opacity-70 group-hover:opacity-100" />
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
