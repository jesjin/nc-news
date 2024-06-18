import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
       <h2><Link to={`/articles/${article.article_id}`}>{article.title}</Link></h2>
      <div className="article-meta">
        <span>Author: {article.author}</span>
        <span>Votes: {article.votes}</span>
        <span>Comments: {article.comment_count}</span>
      </div>
    </div>
  );
};

export default ArticleCard;