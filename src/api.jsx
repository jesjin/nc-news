import axios from 'axios';

const API_URL = 'https://jesjin-nc-news.onrender.com/api';

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export default API_URL;