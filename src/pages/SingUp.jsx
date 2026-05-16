import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineHome } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { updateProfile } from 'firebase/auth';
import { db } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { FiArrowRight, FiCamera, FiCheck } from 'react-icons/fi';

const SignUp = () => {
  const navigate = useNavigate();
  const { user, createUser, signInWithGoogle } = useContext(AuthContext);

  // Auto-redirect ONLY when profile is fully ready (Photo & Name loaded)
  React.useEffect(() => {
    if (user && user.photoURL) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 500); // Tiny delay to ensure AuthContext finishes syncing
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !name || !address || !password || !confirmPassword) {
      setLoading(false);
      return toast.error('Please fill all fields.');
    }
    if (!profileFile) {
      setLoading(false);
      return toast.error('Please upload a profile image.');
    }
    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error('Passwords do not match.');
    }
    if (password.length < 6) {
      setLoading(false);
      return toast.error('Password must be at least 6 characters.');
    }

    try {
      console.log('Starting Sign Up process...');
      const formData = new FormData();
      formData.append('image', profileFile);

      console.log('Uploading image to ImgBB...');
      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4069702c25ccc162b662f2c5ce170f8d`,
        formData
      );
      const profileImg = uploadRes.data.data.display_url;
      console.log('Image uploaded:', profileImg);

      console.log('Creating user in Firebase...');
      const userCredential = await createUser(email, password);
      console.log('Firebase user created:', userCredential.user.uid);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profileImg,
      });

      const userData = { 
        email, 
        name, 
        address, 
        password, 
        profileImg,
        role: 'user',
        provider: 'email',
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      };
      
      console.log('Saving user to MongoDB...');
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/users`, userData);
      console.log('User saved to MongoDB');

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        profileImg,
        address,
        role: 'user',
        status: 'active',
        uid: userCredential.user.uid,
        createdAt: new Date(),
      });
      console.log('User saved to Firestore');

      toast.success('Login Successful! Welcome to LocalChefBazaar! JOSS!', { duration: 3000 });
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error('Sign-up error detail:', error);
      toast.error(error.response?.data?.message || error.message || 'Account creation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Login Successful! Welcome to LocalChefBazaar! JOSS!');
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('Google sign-up error:', error);
      toast.error('Google registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans py-20 px-4">
      <Helmet>
        <title>Sign Up | LocalChefBazaar</title>
      </Helmet>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0f0f0f] fixed" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7ecf55]/5 rounded-full blur-[120px] z-0 animate-pulse fixed" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#7ecf55]/5 rounded-full blur-[120px] z-0 animate-pulse fixed" />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl px-4 py-8"
      >
        <div className="bg-white/85 dark:bg-[#111111]/90 backdrop-blur-2xl border border-white/40 dark:border-[#242424] dark:border-[0.5px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden transition-colors duration-500">
          
          {/* Header Section */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-[#0f0f0f] dark:via-[#111111] dark:to-[#0f0f0f] p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6db70e] dark:from-[#7ecf55] via-transparent to-transparent" />
            </div>
            
            <h2 className="text-3xl font-black text-white dark:text-[#e0e0e0] mb-2 tracking-tight uppercase">
              Boutique <span className="text-[#6db70e] dark:text-[#7ecf55]">Register</span>
            </h2>
            <p className="text-slate-400 dark:text-[#888888] font-medium tracking-widest text-[9px] uppercase">
              Experience Handcrafted Excellence
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {/* Google Sign In Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3.5 mb-8 bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-xl hover:border-[#6db70e] dark:hover:border-[#7ecf55] hover:bg-[#6db70e]/5 dark:hover:bg-[#7ecf55]/5 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <FcGoogle size={24} />
              <span className="font-bold text-slate-800 dark:text-[#e0e0e0] text-sm tracking-tight">
                {loading ? 'Wait...' : 'Sign Up with Google Account'}
              </span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-[#242424]"></div>
              <span className="text-slate-400 dark:text-[#888888] text-[8px] font-black tracking-[0.2em] uppercase">Artisanal Registration</span>
              <div className="h-[1px] flex-1 bg-slate-100 dark:bg-[#242424]"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                      <AiOutlineUser size={18} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full pl-10 pr-6 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-xs"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                      <AiOutlineMail size={18} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      required
                      className="w-full pl-10 pr-6 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Image & Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Image */}
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">Avatar</label>
                  <div className="relative">
                    <label className="flex items-center gap-2 w-full pl-10 pr-6 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] focus-within:border-[#6db70e] dark:focus-within:border-[#7ecf55] focus-within:bg-white dark:focus-within:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold transition-all cursor-pointer overflow-hidden">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55]">
                        <FiCamera size={18} />
                      </div>
                      <span className={`text-xs truncate ${profileFile ? 'text-slate-900 dark:text-[#e0e0e0]' : 'text-slate-300 dark:text-slate-600'}`}>
                        {profileFile ? profileFile.name : 'Select Image'}
                      </span>
                      <input
                        type="file"
                        onChange={(e) => setProfileFile(e.target.files[0])}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* Address */}
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">Location</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                      <AiOutlineHome size={18} />
                    </div>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your address"
                      required
                      className="w-full pl-10 pr-6 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">Passcode</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                      <AiOutlineLock size={18} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleToggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] hover:text-[#6db70e] dark:hover:text-[#7ecf55] transition-colors"
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block text-[9px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-widest mb-1.5 ml-1">Confirm</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#888888] group-focus-within:text-[#6db70e] dark:group-focus-within:text-[#7ecf55] transition-colors">
                      <FiCheck size={18} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-6 py-3 bg-slate-50 dark:bg-[#151515] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] focus:bg-white dark:focus:bg-[#0f0f0f] text-slate-900 dark:text-[#e0e0e0] font-bold placeholder-slate-300 dark:placeholder-slate-600 transition-all outline-none text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01, translateY: -1 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="group relative w-full py-4 bg-slate-900 dark:bg-[#111111] text-white dark:text-[#e0e0e0] rounded-xl font-black text-base shadow-lg hover:shadow-[0_15px_30px_rgba(109,183,14,0.3)] transition-all overflow-hidden flex items-center justify-center gap-2 cursor-pointer mt-2 border dark:border-[#242424] dark:border-[0.5px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6db70e] dark:from-[#7ecf55] to-[#4a8208] dark:to-[#5a9c0c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">{loading ? 'Working...' : 'Initialize Membership'}</span>
                <FiArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 dark:text-[#888888] text-[11px] font-medium flex items-center justify-center gap-2">
                Already part of the Bazaar?
                <NavLink
                  to="/signin"
                  className="relative text-[#6db70e] dark:text-[#7ecf55] font-medium hover:text-[#5a9c0c] dark:hover:text-[#a3e635] transition-all duration-300 inline-flex items-center gap-1.5 group py-1 px-3 hover:bg-[#6db70e]/5 dark:hover:bg-[#7ecf55]/5 rounded-full"
                >
                  <span className="relative">
                    Sign In
                    <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-[#6db70e]/60 dark:bg-[#7ecf55]/60 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <FiArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform duration-300 opacity-70 group-hover:opacity-100" />
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
