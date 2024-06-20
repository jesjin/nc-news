import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jesjin-nc-news.onrender.com/api',
});

export const fetchArticle = (articleId) => {
  return api.get(`/articles/${articleId}`);
};

export const fetchComments = (articleId) => {
  return api.get(`/articles/${articleId}/comments`);
};

export const addComment = (articleId, comment) => {
  return api.post(`/articles/${articleId}/comments`, comment);
};

export const voteArticle = (articleId, change) => {
  return api.patch(`/articles/${articleId}`, { inc_votes: change });
};

export default api;