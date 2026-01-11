import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider, UserContext } from "../context/userContext";
import { NavigationProvider } from "../context/navigationContext";
import { useContext, lazy, Suspense } from "react";
import axios from "axios";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import "./api"; // add this line

const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Profile = lazy(() => import("./pages/Profile"));
const ProtectedRoute = lazy(() => import("./pages/components/ProtectedRoute"));
import { AnimatePresence } from "framer-motion";

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
          borderRadius: "8px",
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

function SuspenseFallback() {
  const { lightMode } = useContext(UserContext);
  return (
    <div
      className={`h-screen w-full flex items-center justify-center ${
        lightMode ? "bg-white" : "bg-neutral-950"
      }`}
    >
      <UseAnimations animation={loading} size={50} />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
      </main>
    </>
  );
}

function App() {
  return (
    <UserContextProvider>
      <NavigationProvider>
        <Suspense fallback={<SuspenseFallback />}>
          <AnimatedRoutes />
        </Suspense>
        <ToasterWrapper />
      </NavigationProvider>
    </UserContextProvider>
  );
}

export default App;
