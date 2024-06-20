import React, { useState } from 'react';
import axios from 'axios';
import './CommentCard.css';

const CommentCard = ({ comment, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const isDeletable = comment.author === 'jessjelly';

  const handleDelete = () => {
    setDeleting(true);
    axios.delete(`https://jesjin-nc-news.onrender.com/api/comments/${comment.comment_id}`)
      .then(() => {
        onDelete(comment.comment_id);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
        setDeleting(false);
      });
  };

  return (
    <div className="comment-card">
      <div className="comment-meta">
        <span className="comment-author">By {comment.author}</span>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p>{comment.body}</p>
      {isDeletable && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="delete-button"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
    </div>
  );
};

export default CommentCard;