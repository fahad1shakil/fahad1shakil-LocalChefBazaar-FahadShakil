# 🥗 LocalChef  
### A Full Stack MERN Marketplace for Local Home-Cooked Meals

🌐 **Live Website**  
[Live Link Coming Soon]  
Admin Email: [Provided on Request]  
Admin Password: [Provided on Request]  
---

## 📌 Project Description

**Local Chef Bazaar** is a full-stack MERN web application that connects local home chefs with customers who want fresh, homemade food.  
The platform includes **role-based authentication**, **multiple dashboards**, **admin approval systems**, and **secure Stripe payment integration**.

This project reflects a real-world marketplace system built using modern full-stack technologies.

---
<img width="1920" height="1336" alt="LocalChefBazaar Interface" src="https://github.com/user-attachments/assets/e8b99706-b76f-4912-a632-483ea4048338" />

## 🚀 Core Features

### 👤 User
- User registration & login
- Browse available dishes
- Add dishes to cart
- Place orders
- Online payment via **Stripe**
- User dashboard to track orders & payments

---

### 👨‍🍳 Chef
- Login as a normal user
- Request for **Chef role**
- Become a chef after **Admin approval**
- Add, update, and manage dishes
- View dish orders
- Dedicated Chef Dashboard

---

### 🛡️ Admin
- Full control over the system
- Approve or reject chef requests
- Manage users, chefs, and dishes
- Approve orders
- Monitor payments
- Update delivery status
- Dedicated Admin Dashboard

---

## 🧩 Role-Based Dashboards

| Role  | Dashboard Access |
|------|------------------|
| User | User Dashboard |
| Chef | Chef Dashboard |
| Admin | Admin Dashboard (Full Control) |

Each role has **separate protected routes and permissions**.

---

## 💳 Payment System
- Stripe Payment Gateway Integration
- Payment enabled after admin approval
- Admin can track payment & delivery status
- Secure transaction handling

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6+)
- React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Security
- JWT (JSON Web Token)
- Role-Based Authorization

### Payment Gateway
- Stripe

---

## 🔐 Demo Admin Login (For HR / Recruiters)


> ⚠️ Demo credentials for testing purposes only

**Admin Email: [Provided on Request]
**Admin Password: [Provided on Request]


You can also create a new user account and request for the **Chef role** from the user dashboard.

---

## 📂 Project Structure

local-chef-bazaar/
├── client/ # React Frontend
├── server/ # Node & Express Backend
├── routes/ # API Routes
├── controllers/ # Business Logic
├── models/ # Database Models
├── middleware/ # Auth & Role Middleware
└── README.md


---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/local-chef-bazaar.git
cd client
npm install

cd ../server
npm install
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
npm run dev

# LocalChefBazzar-Website
# LocalChefBazzar-Website
