# 🍽️ LocalChefBazaar
### A MERN-Stack Marketplace for Local Home-Cooked Meals

<<<<<<< HEAD
🌐 **Live Website**  
[Live Link : https://localchefbazzar-fahad-shakil.netlify.app/]  
Admin Email: [fahad10pic@gmail.com]  
Admin Password: [fahad10pic]  
=======
> **LocalChefBazaar** connects home cooks with food lovers in their community. Customers explore daily menus, place orders, and track deliveries in real time — while home chefs earn income from their kitchen without needing a physical restaurant.
>>>>>>> ad1baada75343a51c4d9d3d4f72cdcf7d7570315
---

## 🌐 Live Demo

| Resource | Link |
|----------|------|
| 🔗 Live Site | [  https://localchefbazzar-fahad-shakil.netlify.app/ ] |
| 📁 Client Repo | [ https://github.com/fahad1shakil/fahad1shakil-LocalChefBazaar-FahadShakil ] |
| 📁 Server Repo | [GitHub - Server](  https://github.com/fahad1shakil/.............    ) |

---

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | fahad10pic@gmail.com | fahad10pic |
| Chef |  ->login with Google and send a request to the admin<-  | .... |
| User |  ->login with Google and send a request to the admin<-  | .... |

---

## ✨ Key Features

### 👥 Role-Based Access Control
- **Three roles:** Admin, Chef, and Customer — each with a dedicated dashboard and permissions
- Role upgrade requests (Become a Chef / Become an Admin) flow through an admin approval system
- Fraud detection: Admin can flag users as "fraud," blocking their ability to order or create meals

### 🔐 Secure Authentication
- Firebase Authentication with email/password
- JWT tokens issued on login, stored in **httpOnly cookies**
- All private routes and API endpoints validate the JWT on every request

### 🏠 Home Page
- Animated hero/banner section built with **Framer Motion**
- Dynamic Daily Meals section (6 cards fetched from server)
- Customer Reviews section (fetched from server)

### 🥘 Meals Page
- Card layout with chef name, price, rating, delivery area, and food image
- Sort by price (ascending / descending)
- Pagination — 10 meals per page
- Protected "See Details" — redirects unauthenticated users to Login

### 📋 Meal Details Page (Private)
- Full meal info: ingredients, delivery time, chef experience
- **Review system** — view, submit, and see instant UI updates
- **Favorites** — add meals to a personal favorites list (no duplicates)
- **Order Now** — leads to the order confirmation page

### 🛒 Order & Payment System
- Auto-filled order form (meal name, price, chef ID, user email)
- SweetAlert confirmation with total price calculation (price × quantity)
- **Stripe payment integration** — Pay button appears only when order is accepted and unpaid
- Payment history saved in MongoDB; order `paymentStatus` updated to `"paid"` after success

### 📊 Admin Dashboard
- **Manage Users** — view all users, assign fraud status
- **Manage Requests** — approve/reject Chef and Admin role requests; auto-generates unique Chef IDs on approval
- **Platform Statistics** — visual charts (Recharts) for total payments, user count, pending/delivered orders

### 👨‍🍳 Chef Dashboard
- **Create Meal** — upload food images (not links), fill in full meal details
- **My Meals** — view, update, or delete meals
- **Order Requests** — accept, cancel, or mark orders as delivered with live status updates

### 🧑 User Dashboard
- **My Orders** — view all past orders with status, payment info, and a Pay button when applicable
- **My Reviews** — edit or delete submitted reviews via modal
- **Favorite Meals** — view and remove saved meals in a table layout
- **Profile Page** — displays name, email, role, status, and Chef ID (if applicable)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |
| React Hook Form | Form handling & validation |
| Axios | HTTP client with interceptors |
| Recharts | Admin statistics charts |
| Stripe.js / React Stripe | Payment UI |
| SweetAlert2 | Confirmation & success dialogs |
| React Hot Toast / Sonner | Toast notifications |
| Firebase | Authentication |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database |
| JSON Web Token (JWT) | Secure authentication |
| dotenv | Environment variable management |
| CORS | Cross-origin resource sharing |
| Stripe | Payment processing |
| ImgBB / Cloudinary | Image hosting for food uploads |

---

## 📦 NPM Packages Used

### Client-side
```
react-router-dom
firebase
axios
react-hook-form
framer-motion
recharts
sweetalert2
react-hot-toast
@stripe/react-stripe-js
@stripe/stripe-js
react-icons
react-helmet-async
```

<<<<<<< HEAD
> ⚠️ Demo credentials for testing purposes only

Admin Email: [fahad10pic@gmail.com]  
Admin Password: [fahad10pic]  

You can also create a new user account and request for the **Chef role** from the user dashboard.
=======
### Server-side
```
express
mongoose
cors
dotenv
jsonwebtoken
cookie-parser
stripe
```
>>>>>>> ad1baada75343a51c4d9d3d4f72cdcf7d7570315

---

## 🗂️ Project Structure

```
📦 localchefbazaar-client
 ┣ 📂 src
 ┃ ┣ 📂 components        # Reusable UI components
 ┃ ┣ 📂 pages             # Route-level pages
 ┃ ┃ ┣ 📂 Home
 ┃ ┃ ┣ 📂 Meals
 ┃ ┃ ┣ 📂 MealDetails
 ┃ ┃ ┣ 📂 Order
 ┃ ┃ ┣ 📂 Dashboard
 ┃ ┃ ┃ ┣ 📂 Admin
 ┃ ┃ ┃ ┣ 📂 Chef
 ┃ ┃ ┃ ┗ 📂 User
 ┃ ┃ ┗ 📂 Auth
 ┃ ┣ 📂 hooks             # Custom React hooks
 ┃ ┣ 📂 context           # Auth context / providers
 ┃ ┣ 📂 routes            # Route definitions & guards
 ┃ ┗ 📂 utils             # Helper functions, axios instance

📦 localchefbazaar-server
 ┣ 📂 routes              # Express route files
 ┣ 📂 middleware          # JWT verification, fraud check
 ┣ 📂 models              # Mongoose schemas (optional)
 ┗ index.js               # Entry point
```
---

## 📸 Screenshots

> *(Add screenshots of your Home page, Dashboard, Meal Details, etc. here)*

| Home Page | Meal Details | Admin Dashboard |
|-----------|--------------|-----------------|
| ![home](./screenshots-videos/Home.png) | ![MealData](./screenshots-videos/Meal.png) | ![admin](./screenshots-videos/Dashboard.png) |


---

## 🔒 Environment Variables

### Client (`/.env`)
```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_API_URL=
```

### Server (`/.env`)
```env
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
PORT=5000
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project
- Stripe account

### 1. Clone the repositories
```bash
git clone https://github.com/yourusername/localchefbazaar-client.git
git clone https://github.com/yourusername/localchefbazaar-server.git
```

### 2. Install dependencies
```bash
# Client
cd localchefbazaar-client && npm install

# Server
cd localchefbazaar-server && npm install
```

### 3. Add environment variables
Create `.env` files in both directories using the templates above.

### 4. Run the app
```bash
# Server (port 5000)
npm run dev

# Client (port 5173)
npm run dev
```
---
## 👤 Author

**Your Name**
- 📧 Email: fahad1shakil@gmail.com
- 💼 LinkedIn: [ https://www.linkedin.com/in/fahad1shakil/ ]
- 🐙 GitHub: [  https://github.com/fahad1shakil   ] 

---

## 📄 License
Copyright © 2026 [ Fahad Shakil ]. All rights reserved.
