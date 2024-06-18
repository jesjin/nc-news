import React from 'react';
import ArticleList from '../components/Articles/ArticleList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <ArticleList />
    </div>
  );
};

export default HomePage;