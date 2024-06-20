import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArticleCard from "../components/Articles/ArticleCard";
import './TopicPage.css';

const TopicPage = () => {
    const { topic_slug } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get(`https://jesjin-nc-news.onrender.com/api/articles?topic=${topic_slug}`)
        .then(response => {
          setArticles(response.data.articles);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching articles');
          setLoading(false);
        });
    }, [topic_slug]);
  
    if (loading) {
      return <p>Loading articles...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <div className="topic-page">
        <h1>Articles on {topic_slug}</h1>
        <div className="articles-list">
          {articles.map(article => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      </div>
    );
  };
  
  export default TopicPage;