import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/Comments/CommentList";
import "./ArticlePage.css";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jesjin-nc-news.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching article");
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <div className="article-meta">
        <span>Author: {article.author}</span>
        <span>
          Published: {new Date(article.created_at).toLocaleDateString()}
        </span>
        <span>Votes: {article.votes}</span>
        <span>Comments: {article.comment_count}</span>
      </div>
      <p>{article.body}</p>
      <h2>Comments</h2>
      <CommentList articleId={article_id} />
    </div>
  );
};

export default ArticlePage;
