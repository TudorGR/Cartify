import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import { UserContextProvider, UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import ProtectedRoute from "./pages/components/ProtectedRoute";

axios.defaults.withCredentials = true;

function ToasterWrapper() {
  const { lightMode } = useContext(UserContext);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: lightMode ? "#fff" : "#374151",
          color: lightMode ? "#333" : "#f9fafb",
          border: lightMode ? "1px solid #e5e5e5" : "1px solid #4b5563",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "400",
          boxShadow: lightMode
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
          width: "300px",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: lightMode ? "#fff" : "#374151",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: lightMode ? "#fff" : "#374151",
          },
        },
      }}
    />
  );
}

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToasterWrapper />
    </UserContextProvider>
  );
}

export default App;
