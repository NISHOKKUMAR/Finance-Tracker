import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Tracker</h1>
      </div>
      <div className={`navbar-center ${isOpen ? 'open' : ''}`}>
        <Link to="/income" className="navbar-link">Income & Expenses</Link>
        <Link to="/investments" className="navbar-link">Investments</Link>
        <Link to="/signup" className="navbar-button">Sign Up</Link>
        <Link to="/login" className="navbar-button">Login</Link>
      </div>
      <div className="navbar-right">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
