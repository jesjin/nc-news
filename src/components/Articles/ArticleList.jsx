import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import './ArticleList.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('https://jesjin-nc-news.onrender.com/api/articles')
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  return (
    <div className="article-list">
      {articles.map(article => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;