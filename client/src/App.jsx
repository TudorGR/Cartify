import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Products from "./components/Products";
import Category from "./components/Category";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
