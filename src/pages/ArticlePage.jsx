import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/Comments/CommentList";
import CommentForm from "../components/Comments/CommentForm";
import API_URL from "../api";
import "./ArticlePage.css";


const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [comments, setComments] = useState([]);
  

  useEffect(() => {
    axios
      .get(`https://jesjin-nc-news.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setVotes(response.data.article.votes);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching article");
        setLoading(false);
      });
  }, [article_id]);

  const handleVote = (change) => {
    setVotes(votes + change);
    setVoteError(null);
    axios.patch(`https://jesjin-nc-news.onrender.com/api/articles/${article_id}`, { inc_votes: change })
      .catch(err => {
        setVotes(votes - change);
        setVoteError('Error updating votes');
      });
  };

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  }

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
        <span>Votes: {votes}</span>
        <span>Comments: {article.comment_count}</span>
      </div>
      <div className="vote-buttons">
        <button onClick={() => handleVote(1)}>Upvote</button>
        <button onClick={() => handleVote(-1)}>Downvote</button>
      </div>
      {voteError && <p className="error">{voteError}</p>}
      <p>{article.body}</p>
      <h2>Comments</h2>
      <CommentForm articleId={article_id} onCommentAdded={{handleCommentAdded}} />
      <CommentList articleId={article_id} />
    </div>
  );
};

export default ArticlePage;
