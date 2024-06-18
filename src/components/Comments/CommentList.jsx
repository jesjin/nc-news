import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';
import './CommentList.css';

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://jesjin-nc-news.onrender.com/api/articles/${articleId}/comments`)
      .then(response => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching comments');
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;