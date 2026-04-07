# SHOP.CO - Modern E-commerce Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce application featuring a responsive design, user authentication, shopping cart functionality, and a modern UI built with Tailwind CSS.

## 🚀 Features

- **User Authentication**: JWT-based login and registration
- **Product Catalog**: Browse products with filtering and search
- **Shopping Cart**: Add, update, and remove items from cart
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, attractive interface with Tailwind CSS
- **Newsletter Subscription**: Email subscription functionality
- **Product Categories**: Organized product browsing by categories
- **User Dashboard**: Personalized dashboard for logged-in users

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Development server auto-restart
- **Vite** - Frontend build and development

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation, or
  - MongoDB Atlas cloud database (recommended for development)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TecAI_task
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `backend` directory with the following variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/shopco
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopco

   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

   **Note**: Replace the MongoDB URI with your actual connection string.

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend in production**
   ```bash
   cd backend
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires authentication)

### Product Routes (`/api/products`)
- `GET /api/products` - Get all products (with optional query parameters)
  - Query parameters: `search`, `category`, `minPrice`, `maxPrice`, `rating`, `sort`, `page`, `limit`
- `GET /api/products/:id` - Get single product by ID

### Category Routes (`/api/categories`)
- `GET /api/categories` - Get all product categories

### Cart Routes (`/api/cart`)
- `POST /api/cart` - Add item to cart (requires authentication)
- `GET /api/cart` - Get user's cart items (requires authentication)
- `PUT /api/cart/:id` - Update cart item quantity (requires authentication)
- `DELETE /api/cart/:id` - Remove item from cart (requires authentication)

### Newsletter Routes (`/api/newsletter`)
- `POST /api/newsletter` - Subscribe to newsletter

## 🎨 Screenshots

### Desktop View
![Desktop Homepage](screenshots/desktop-homepage.png)
![Desktop Products](screenshots/desktop-products.png)
![Desktop Dashboard](screenshots/desktop-dashboard.png)

### Mobile View
![Mobile Homepage](screenshots/mobile-homepage.png)
![Mobile Products](screenshots/mobile-products.png)
![Mobile Navigation](screenshots/mobile-navigation.png)

*Note: Screenshots should be added to a `screenshots/` directory in the project root*

## 🎁 Bonus Features Implemented

- **Responsive Filter Sidebar**: Converts to a slide-over drawer on mobile devices
- **Lazy Loading**: Images load progressively for better performance
- **Touch-Friendly UI**: All interactive elements meet minimum 44px touch target requirements
- **Consistent Card Heights**: Product cards maintain equal heights in grid layouts
- **Advanced Filtering**: Multi-criteria product filtering (price, rating, category)
- **Real-time Cart Updates**: Cart summary updates instantly across the application
- **Newsletter Integration**: Email subscription with backend processing
- **Modern Design System**: Consistent spacing, typography, and color scheme
- **Accessibility**: Proper form labels, semantic HTML, and keyboard navigation
- **Performance Optimized**: Lazy loading, optimized Tailwind classes, and efficient React patterns

## 📁 Project Structure

```
TecAI_task/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── cartController.js     # Cart management
│   │   ├── categoryController.js # Category handling
│   │   ├── newsletterController.js # Newsletter subscriptions
│   │   └── productController.js  # Product operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication
│   │   └── errorMiddleware.js    # Error handling
│   ├── models/
│   │   ├── Cart.js              # Cart schema
│   │   ├── Category.js          # Category schema
│   │   ├── Product.js           # Product schema
│   │   ├── Subscription.js      # Newsletter schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── cartRoutes.js        # Cart endpoints
│   │   ├── categoryRoutes.js    # Category endpoints
│   │   ├── newsletterRoutes.js  # Newsletter endpoints
│   │   └── productRoutes.js     # Product endpoints
│   ├── data/
│   │   └── products.js          # Sample product data
│   ├── services/
│   │   └── productService.js    # Product business logic
│   ├── .env                     # Environment variables
│   ├── package.json
│   ├── seeder.js                # Database seeding script
│   └── server.js                # Main server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── authApi.js       # Authentication API calls
│   │   ├── components/
│   │   │   ├── CartItem.jsx     # Cart item component
│   │   │   ├── CategoryCard.jsx # Category display card
│   │   │   ├── FilterSidebar.jsx # Product filters
│   │   │   ├── Footer.jsx       # Site footer
│   │   │   ├── Hero.jsx         # Homepage hero section
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── ProductCard.jsx  # Product display card
│   │   │   ├── ReviewCard.jsx   # Customer review card
│   │   │   └── SortDropdown.jsx # Product sorting
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   ├── CartContext.jsx  # Shopping cart state
│   │   │   └── ToastContext.jsx # Notification system
│   │   ├── hooks/
│   │   │   └── useProducts.js   # Product fetching hook
│   │   ├── pages/
│   │   │   ├── Cart.jsx         # Shopping cart page
│   │   │   ├── Checkout.jsx     # Checkout page
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   ├── Home.jsx         # Homepage
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Products.jsx     # Product listing
│   │   │   ├── ProductDetail.jsx # Product details
│   │   │   └── Register.jsx     # Registration page
│   │   ├── routes/
│   │   │   └── ProtectedRoutes.jsx # Route protection
│   │   ├── services/
│   │   │   └── productService.js # Product API calls
│   │   │   └── axios.js         # Axios configuration
│   │   ├── App.jsx              # Main app component
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # App entry point
│   ├── .env                     # Frontend environment variables
│   ├── package.json
│   ├── vite.config.js           # Vite configuration
│   └── README.md                # Frontend-specific README
└── README.md                    # Project README (this file)
```

## 🔒 Environment Variables

### Backend (.env)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 5000)

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## 🧪 Testing the API

The project includes test scripts for API endpoints. You can run them using:

```bash
# Run all API tests
./test_api.bat

# Or run individual test files
node product_test.js
node cart_test.js
```

## 📝 Database Seeding

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create sample products, categories, and users in your MongoDB database.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

[Vishal Prajaapti ❤️](https://github.com/yourusername)

---

**Happy Shopping! 🛍️**#   t e c h A I  
 