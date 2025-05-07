import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { NavbarWithLangToggle as Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Dealer from "./components/Dealer";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";

import AboutUs from "./components/AboutUs";
import BottomNav from "./components/BottomNav";

function MainSite() {
  return (
    <>
      <Navbar />
      <Hero />
      <Logos />
      <Products limit={3} />
      <WhyChooseUs />
      <Contact />
      <Dealer />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Router>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPanel />
              </RequireAuth>
            }
          />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<><Navbar /><Products /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><AboutUs /><Footer /></>} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
        <BottomNav />
      </Router>
    </>
  );
}

export default App;
