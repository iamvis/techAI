# SHOP.CO

SHOP.CO is a full-stack MERN e-commerce application with authentication, product browsing, search, filtering, pagination, cart management, newsletter signup, and a responsive frontend for desktop and mobile users.

## Tech Stack

### Frontend
- React
- React Router DOM
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or newer recommended
- npm
- MongoDB set up in one of these ways:
  - Local MongoDB server, for example `mongodb://127.0.0.1:27017/shopco`
  - MongoDB Atlas cluster connection string

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd TecAI_task
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## Environment Variables

### Backend `.env`

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

Examples:

- Local MongoDB:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/shopco
```

- MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shopco
```

### Frontend `.env`

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

For production, replace it with your deployed backend URL:

```env
VITE_API_URL=https://your-backend-domain
```

## How To Run

### Run backend

```bash
cd backend
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Run frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Production Build

### Frontend build

```bash
cd frontend
npm run build
```

### Backend start

```bash
cd backend
npm start
```

## Database Seeding

To seed sample products and categories:

```bash
cd backend
npm run seed
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get logged-in user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by id

Supported query parameters for `GET /api/products`:
- `search`
- `category`
- `minPrice`
- `maxPrice`
- `rating`
- `sort`
- `page`
- `limit`

### Categories
- `GET /api/categories` - Get all categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter

## Screenshots

Add your actual screenshots to a `screenshots/` folder before final submission, then keep or replace the paths below.

### Desktop View

![Desktop Home](screenshots/desktop-home.png)
![Desktop Products](screenshots/desktop-products.png)
![Desktop Cart](screenshots/desktop-cart.png)

### Mobile View

![Mobile Home](screenshots/mobile-home.png)
![Mobile Products](screenshots/mobile-products.png)
![Mobile Menu](screenshots/mobile-menu.png)

## Optional / Bonus Features Implemented

- Product search
- Product filtering by category, price, and rating
- Product sorting
- Pagination on product listing
- Responsive product grid
- Mobile filter drawer
- JWT-based authentication
- Cart summary with subtotal, discount, delivery fee, and total
- Newsletter subscription API
- Reusable rating stars UI
- Seeded demo product data with varied ratings

## Project Structure

```text
TecAI_task/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- data/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- services/
|   |-- utils/
|   |-- package.json
|   |-- seeder.js
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- package.json
|   |-- vite.config.js
|   `-- index.html
`-- README.md
```

## Deployment Notes

- You can deploy frontend and backend from the same GitHub repository.
- Set the backend root directory to `backend`.
- Set the frontend root directory to `frontend`.
- Keep real secrets out of Git and only add them in your deployment platform environment settings.
