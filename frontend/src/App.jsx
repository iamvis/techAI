import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/products" element={<Products />} />
            <Route path="/api/products/:id" element={<ProductDetail />} />
            <Route path="/api/cart" element={<Cart />} />
            <Route path="/api/checkout" element={<Checkout />} />
            <Route path="/api/login" element={<Login />} />
            <Route path="/api/register" element={<Register />} />
            <Route
              path="/api/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
