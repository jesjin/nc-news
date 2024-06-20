import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import TopicsPage from './pages/TopicsPage';
import TopicPage from './pages/TopicPage';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topic_slug" element={<TopicPage />} />
      </Routes>
    </Router>
  );
}

export default App;