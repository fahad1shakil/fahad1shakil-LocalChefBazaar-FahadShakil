import { createBrowserRouter } from 'react-router-dom';

import Root from '../Layout/Root';
import SignUp from '../pages/SingUp';
import SignIn from '../pages/Singin';
import Services from '../pages/Services';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Chefs from '../pages/Chefs';
import Faq from '../pages/Faq';

import DashboardLayout from '../Layout/DashbordLayout/DashboardLayout';

import Orders from '../Componentes/MealsPaGE/Orders';
import MYReviews from '../pages/Dashbord/User/MYReviews';
import FavoriteMeal from '../pages/Dashbord/User/FavoriteMeal';
// import Profile from '../pages/Dashbord/sherd/Profile';
import DashboardOverview from '../pages/Dashbord/User/WElcomd';
import Profile from '../pages/Dashbord/sherd/Profile';
import Addmeals from '../pages/Dashbord/Seller/Addmeals';
import MealsPage from '../Componentes/MealsPaGE/MealsPage';
import MealDetails from '../Componentes/MealsPaGE/MealDetails';
import Home from '../pages/Home';
import MyMeals from '../pages/Dashbord/Seller/MyMeals';
import Order from '../Componentes/MealsPaGE/Orders';
import OrderRequest from '../pages/Dashbord/Seller/OrderRequest';
import MyOrders from '../pages/Dashbord/User/MyOrders';
import ManageUsers from '../pages/Dashbord/Admin/ManageUsers';
import ManageRequests from '../pages/Dashbord/Admin/ManageRequests';
import PaymentSuccess from '../pages/Dashbord/User/Payment.jsx/PaymentSuccess';
import PaymentCancel from '../pages/Dashbord/User/Payment.jsx/PaymentCancel';
import Error from '../Componentes/Error';
import Analytics from '../pages/Dashbord/Seller/Analytics';
import Settings from '../pages/Dashbord/Admin/Settings';
import Reports from '../pages/Dashbord/Manager/Reports';
import Statistics from '../pages/Dashbord/Admin/Statistics';
import PrivateRoute from './PriveteRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'allmeals',
        element: <MealsPage />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/:id',
        element: <BlogPost />,
      },
      {
        path: 'chefs',
        element: <Chefs />,
      },
      {
        path: 'mealsd/:id',
        element: <MealDetails />,
      },
      {
        path: 'faq',
        element: <Faq />,
      },
      {
        path: 'order/:id',
        element: <Order />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BACKEND_API}/meals/${params.id}`),
      },
    ],
  },

  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: 'overview',
        element: <DashboardOverview />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: 'payment-cancel',
        element: <PaymentCancel />,
      },

      // User Specific Routes
      {
        path: 'orders',
        element: <PrivateRoute allowedRoles={['user', 'chef', 'admin', 'manager']}><Orders /></PrivateRoute>,
      },
      {
        path: 'reviews',
        element: <PrivateRoute allowedRoles={['user', 'chef', 'admin', 'manager']}><MYReviews /></PrivateRoute>,
      },
      {
        path: 'favoritemeal',
        element: <PrivateRoute allowedRoles={['user', 'chef', 'admin', 'manager']}><FavoriteMeal /></PrivateRoute>,
      },
      {
        path: 'myorder',
        element: <PrivateRoute allowedRoles={['user', 'chef', 'admin', 'manager']}><MyOrders /></PrivateRoute>,
      },

      // Chef Specific Routes
      {
        path: 'addmeals',
        element: <PrivateRoute allowedRoles={['chef', 'admin']}><Addmeals /></PrivateRoute>,
      },
      {
        path: 'mymeals',
        element: <PrivateRoute allowedRoles={['chef', 'admin']}><MyMeals /></PrivateRoute>,
      },
      {
        path: 'orderreq',
        element: <PrivateRoute allowedRoles={['chef', 'admin']}><OrderRequest /></PrivateRoute>,
      },
      {
        path: 'analytics',
        element: <PrivateRoute allowedRoles={['chef', 'admin']}><Analytics /></PrivateRoute>,
      },

      // Admin Specific Routes
      {
        path: 'manageuser',
        element: <PrivateRoute allowedRoles={['admin']}><ManageUsers /></PrivateRoute>,
      },
      {
        path: 'managerequest',
        element: <PrivateRoute allowedRoles={['admin']}><ManageRequests /></PrivateRoute>,
      },
      {
        path: 'StatisticsPage',
        element: <PrivateRoute allowedRoles={['admin']}><Statistics /></PrivateRoute>,
      },
      {
        path: 'settings',
        element: <PrivateRoute allowedRoles={['admin']}><Settings /></PrivateRoute>,
      },

      // Manager Specific Routes
      {
        path: 'reports',
        element: <PrivateRoute allowedRoles={['manager', 'admin']}><Reports /></PrivateRoute>,
      },
    ],
  },
]);

