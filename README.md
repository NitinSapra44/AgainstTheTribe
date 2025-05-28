# 🛍️ Full-Stack E-Commerce Web Application

A robust full-stack e-commerce platform with admin and user-facing dashboards, built with the MERN stack. This app features dynamic product listings, cart management using React Context API, secure authentication, order management, and Razorpay payment integration.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Contact](#contact)

---

## ✨ Features

- 🔐 JWT Authentication
- 👤 User Dashboard
- 🛒 Add to Cart (React Context API)
- 💳 Razorpay Payment Integration
- 📦 Order Placement & History
- 🛠 Admin Dashboard:
  - Add/Update/Delete Products
  - Manage Orders
  - View Users
- 🔍 Product Filters
- 🌐 Responsive UI


---

## 🛠 Tech Stack

**Frontend:**
- React.js
- React Router DOM
- React Context API
- TailwindCSS / CSS Modules
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Razorpay SDK
- Cloudinary (for image uploads)

---

## 🧪 Installation

```bash
# Clone the repository
git clone https://github.com/NitinSapra44/AgainstTheTribe.git
cd AgainstTheTribe

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies for store
cd frontend
npm install

# Install frontend dependencies for admin
cd frontend-admin
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file inside `/backend` with the following:

```env
PORT=5000
mongo_url=your_mongodb_connection_string
jwtSecret=your_jwt_secret_key
CLOUDINARY_API_SECRET=your_cloudinary_API_secret
CLOUDINARY_API_KEY=your_clousinary_API_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 📁 Folder Structure

AgainstTheTribe/
│   ├── Frontend-admin/                  # Admin frontend
│   │   ├── public/
│   │   ├── src/
│   │   └── axiosInstance.js
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   └── layout.jsx
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   └── protectedRoute.jsx
│   │   ├── tailwind.config.js
│   │   └── userContext.jsx
│   │   ├── vite.config.js
│   │
│   ├── Frontend/                   # User frontend
│   │   ├── Context/
│   │   ├── public/
│   │   └── src/
│   │   ├── axiosInstance.js
│   │   ├──eslint.config.js
│   │   └── index.html
│   │   ├── layout.jsx
│   │   ├── package.json
│   │   └── postcss.config.js
│   │   ├── tailwind.config.js
│   │   ├──userContext.jsx
│   │   └── vite.config.js
│
├── Backend/                                      
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── node_modules/
│   ├── cloudinary.js
│   ├── index.js
│   └── multerconfig.js
│   ├── package.json
│   └── token.js
│
├── .gitignore
├── package.json                # Optional monorepo-level script runner
└── README.md

---



## 🚀 Deployment

- **Frontend:** Render
- - **Frontend-Admin:** Render
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Payments:** Razorpay (Test mode / Live)

Live URL: https://againstthetribe-shop.onrender.com

---



## 📬 Contact

**Nitin Sapra**  
📧 Nitinsapra.2000@gmail.com  
🐙 GitHub: [@NitinSapra44](https://github.com/NitinSapra44)  
