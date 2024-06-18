import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <div className="article-meta">
        <span>Author: {article.author}</span>
        <span>Votes: {article.votes}</span>
        <span>Comments: {article.comment_count}</span>
      </div>
    </div>
  );
};

export default ArticleCard;