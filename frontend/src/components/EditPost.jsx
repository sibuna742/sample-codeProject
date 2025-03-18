// src/components/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from '../axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();
  const { id } = useParams();  // Get the post ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the post details when the component mounts
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError('Error fetching post details');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      const response = await axios.put(
        `/posts/${id}`, // The endpoint to update the post
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      navigate(`/posts/${response.data._id}`); // Navigate to the updated post's detail page
    } catch (err) {
      setError('Error updating post');
    }
  };

  return (
    <div className="container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
