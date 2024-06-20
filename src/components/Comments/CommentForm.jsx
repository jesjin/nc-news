import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css";

const CommentForm = ({ articleId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!commentText) {
      setError("Comment text is required");
      return;
    }

    setSubmitting(true);
    setError(null);

    axios
      .post(
        `https://jesjin-nc-news.onrender.com/api/articles/${articleId}/comments`,
        {
          username: "jessjelly",
          body: commentText,
        }
      )
      .then((response) => {
        setCommentText("");
        setSubmitting(false);
        onCommentAdded(response.data.comment);
      })
      .catch((error) => {
        setError("Error posting comment");
        setSubmitting(false);
      });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Post"}
      </button>
    </form>
  );
};

export default CommentForm;
