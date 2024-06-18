import React from 'react';
import './CommentCard.css';

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <div className="comment-meta">
        <span className="comment-author">By {comment.author}</span>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p>{comment.body}</p>
    </div>
  );
};

export default CommentCard;