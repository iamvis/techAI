# SHOP.CO

A full-stack MERN e-commerce project with product browsing, search, filtering, authentication, cart features, and a responsive React frontend.

## Tech Stack

### Frontend
- React
- React Router
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
TecAI_task/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── package.json
│   ├── seeder.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

## Features

- User registration and login
- Product listing with search, category, price, rating, sorting, and pagination
- Product detail page
- Shopping cart
- Newsletter subscription
- Responsive UI

## Local Setup

### 1. Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Create environment files

Backend `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Run Locally

### Start backend

```bash
cd backend
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Seed Database

```bash
cd backend
npm run seed
```

## Production Build

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
npm start
```

## API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### Products
- `GET /api/products`
- `GET /api/products/:id`

Supported query params for `/api/products`:
- `search`
- `category`
- `minPrice`
- `maxPrice`
- `rating`
- `sort`
- `page`
- `limit`

### Categories
- `GET /api/categories`

### Cart
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:id`
- `DELETE /api/cart/:id`

### Newsletter
- `POST /api/newsletter`

## Deployment Notes

- You can deploy `backend` and `frontend` from the same GitHub repo.
- Set the backend service root to `backend`.
- Set the frontend service root to `frontend`.
- For production frontend deployment, set:

```env
VITE_API_URL=https://your-backend-domain
```

- Do not commit real `.env` secrets.

## Important

Before public deployment, review authentication and cart data behavior carefully. The current app works locally, but production hardening should be completed before going live.
