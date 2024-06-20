import React, { useEffect, useState } from "react";
import { fetchComments } from "../../api";
import CommentCard from "./CommentCard";
import "./CommentList.css";

const CommentList = ({ articleId, newComment }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    fetchComments(articleId)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching comments");
        setLoading(false);
      });
  }, [articleId]);

  useEffect(() => {
    if (newComment) {
      setComments(prevComments => [newComment, ...prevComments]);
    }
  }, [newComment]);

  const handleDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.comment_id !== commentId));
    setDeleteMessage('Comment successfully deleted.');
    setTimeout(() => setDeleteMessage(null), 2000);
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="comment-list">
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
