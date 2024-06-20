import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TopicsPage.css';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jesjin-nc-news.onrender.com/api/topics')
      .then(response => {
        setTopics(response.data.topics);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching topics');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="topics-page">
      <h1 className='heading'>Topics</h1>
      <ul className="topics-list">
        {topics.map(topic => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicsPage;