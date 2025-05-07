import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaInfoCircle } from "react-icons/fa";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item" end>
        <FaHome />
        <span>Home</span>
      </NavLink>
      <NavLink to="/products" className="nav-item">
        <FaBoxOpen />
        <span>Products</span>
      </NavLink>
      <NavLink to="/about" className="nav-item">
        <FaInfoCircle />
        <span>About</span>
      </NavLink>
      
    </nav>
  );
} 