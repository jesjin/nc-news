import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchArticles } from "../api";
import ArticleCard from "../components/Articles/ArticleCard";
import "./TopicPage.css";

const TopicPage = () => {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("Fetching articles with params", {
      topic: topic_slug,
      sort_by: searchParams.get("sort_by") || "created_at",
      order: searchParams.get("order") || "desc",
    });

    const sort_by = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";

    fetchArticles({ topic: topic_slug, sort_by, order })
      .then(response => {
        console.log("Fetched articles:", response.data.articles);
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error fetching articles:", error);
        setError("Error fetching articles");
        setLoading(false);
      });
  }, [topic_slug, searchParams]);

  const handleSortChange = (e) => {
    setSearchParams({
      sort_by: e.target.value,
      order: searchParams.get("order") || "desc",
    });
  };

  const handleOrderChange = (e) => {
    setSearchParams({
      sort_by: searchParams.get("sort_by") || "created_at",
      order: e.target.value,
    });
  };

  if (loading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="topic-page">
      <h1>Articles on {topic_slug}</h1>
      <div className="sort-controls">
        <label>
          Sort by:
          <select
            value={searchParams.get("sort_by") || "created_at"}
            onChange={handleSortChange}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:
          <select
            value={searchParams.get("order") || "desc"}
            onChange={handleOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className="articles-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default TopicPage;
