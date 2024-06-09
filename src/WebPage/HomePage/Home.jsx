import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <div className="home-card-content">
          <h1>Welcome to Finance Tracker</h1>
          <p>
            Our platform helps you track your income, expenses, and investments seamlessly.
            Manage your finances efficiently and achieve your financial goals with ease.
          </p>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Finance Tracker. All rights reserved.</p>
        <p>
          Follow us on:
          <a href="https://facebook.com"> Facebook </a>|
          <a href="https://twitter.com"> Twitter </a>|
          <a href="https://linkedin.com"> LinkedIn </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
