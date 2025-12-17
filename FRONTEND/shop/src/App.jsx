import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navigation";
import Home from "./component/home";
import Login from "./component/login";
import Register from "./component/register";
import CustomerDashboard from "./component/customerDashboard";
import CustomerProduct from "./component/customerProducts";
import ProductDetails from "./component/productDetail";
import Checkout from "./component/checkout";
import CustomerOrders from "./component/customerOrders";
import SellerNav from "./component/sellerNav";
import SellerDashboard from "./component/sellerDashboard";
import AddProduct from "./component/addProduct";
import SellerProducts from "./component/sellerProduct";
import SellerOrder from "./component/sellerOrder";
import SellerOrders from "./component/sellerOrders";
import SellerWelcome from "./component/sellerWelcome";
import SellerAnalytics from "./component/SellerAnalytics";
import OrderHistory from "./component/OrderHistory";

import "./App.css";

const BG_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80";

function App() {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => setDark(!dark);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BG_IMG})` }}
    >
      <div
        className={`absolute inset-0 ${dark ? "bg-black/40" : "bg-white/20"}`}
      ></div>

      <div className="relative z-10 min-h-screen">
        {!window.location.pathname.includes("customer") &&
          !window.location.pathname.includes("seller") && (
            <header className="w-full shadow">
              <Navbar dark={dark} toggleDarkMode={toggleDarkMode} />
            </header>
          )}

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/products" element={<CustomerProduct />} />
            <Route path="/customer/history" element={<OrderHistory />} />
            <Route path="/customer/product/:id" element={<ProductDetails />} />
            <Route
              path="/customer/product/checkout/:id"
              element={<Checkout />}
            />
            <Route path="/customer/orders" element={<CustomerOrders />} />
            <Route path="/seller/" element={<SellerNav />}>
              <Route index element={<SellerWelcome />} />
              <Route path="/seller/home" element={<SellerWelcome />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/seller/add-product" element={<AddProduct />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/analytics" element={<SellerAnalytics />} />
              <Route
                path="/seller/orders/:productId"
                element={<SellerOrder />}
              />
              <Route path="/seller/orders" element={<SellerOrders />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
