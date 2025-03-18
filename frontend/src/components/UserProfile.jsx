import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams(); // Get user ID from the URL
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}/posts`);
        setPosts(response.data);
      } catch (err) {
        setError('Error fetching posts');
      }
    };
    fetchUserPosts();
  }, [id]);

  return (
    <div className="container">
      <h2>User's Posts</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content.substring(0, 100)}...</p>
                  <Link to={`/posts/${post._id}`} className="btn btn-primary">Read More</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
