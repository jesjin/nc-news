import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCard from './CommentCard';
import './CommentList.css';

const CommentList = ({articleId, initialComments=[]}) => {
    const [loading, setLoading] = useState(initialComments.length);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState(initialComments)


    useEffect(() => {
      if (!comments.length) {
        axios.get(`https://jesjin-nc-news.onrender.com/api/articles/${articleId}/comments`)
          .then(response => {
            setComments(response.data.comments);
            setLoading(false);
          })
          .catch(error => {
            setError('Error fetching comments');
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }, [articleId, comments]);
  
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