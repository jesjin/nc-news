import React from 'react';
import Header from '../components/Header/Header';
import ArticleList from '../components/Articles/ArticleList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <ArticleList />
    </div>
  );
};

export default HomePage;