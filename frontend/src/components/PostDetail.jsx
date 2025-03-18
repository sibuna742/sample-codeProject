// src/components/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get the post ID from the URL

  useEffect(() => {
    // Fetch the post details by ID when the component mounts
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Error fetching post details');
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
