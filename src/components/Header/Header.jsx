import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>NC News</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/topics">Topics</a>
        <a href="/create-article">Create Article</a>
        <a href="/profile">Profile</a>
      </nav>
    </header>
  );
};

export default Header;