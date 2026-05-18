import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import axios from 'axios';

// Configure Axios request interceptor to automatically inject JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, displayName, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: displayName,
      photoURL: photoURL,
    });

    return userCredential;
  };

  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save user data to MongoDB
    const userData = {
      email: user.email,
      name: user.displayName,
      profileImg: user.photoURL,
      address: '', // Default empty address for Google users
      role: 'user',
      provider: 'google',
      uid: user.uid,
      createdAt: new Date().toISOString(),
    };

    // Check if user already exists in MongoDB, if not create new user
    await axios.get(`${import.meta.env.VITE_BACKEND_API}/users/check/${user.email}`)
      .catch(async (error) => {
        if (error.response?.status === 404) {
          // User doesn't exist, create new user in MongoDB
          await axios.post(`${import.meta.env.VITE_BACKEND_API}/users`, userData);
        }
      });

    return result;
  };

  const signoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/check-role/${currentUser.email}`
          );
          
          if (response.data.status === 'banned' || response.data.role === 'banned') {
            await signOut(auth);
            setUser(null);
            setRole('');
            localStorage.removeItem('access-token');
            alert('Your account has been permanently banned from LocalChefBazaar.');
          } else {
            const activeRole = response.data.role || 'user';
            setRole(activeRole);
            
            // Generate/Refresh JWT token matching current role
            const jwtRes = await axios.post(`${import.meta.env.VITE_BACKEND_API}/jwt`, { email: currentUser.email });
            if (jwtRes.data.token) {
              localStorage.setItem('access-token', jwtRes.data.token);
            }
          }
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole('user');
        }
      } else {
        setRole('');
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshRole = async () => {
    if (user?.email) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/check-role/${user.email}`
        );
        if (response.data.role) {
          setRole(response.data.role);
          
          // Generate/Refresh JWT token with the new role
          const jwtRes = await axios.post(`${import.meta.env.VITE_BACKEND_API}/jwt`, { email: user.email });
          if (jwtRes.data.token) {
            localStorage.setItem('access-token', jwtRes.data.token);
          }
          return response.data.role;
        }
      } catch (error) {
        console.error('Error refreshing role:', error);
      }
    }
    return role;
  };

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signinUser,
    signInWithGoogle,
    signoutUser,
    refreshRole,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
