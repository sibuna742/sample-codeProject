import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Blog Posts</h1>
            <div className="row">
                {posts.map((post) => (
                    <div key={post._id} className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content.slice(0, 100)}...</p>
                                <Link to={`/post/${post._id}`} className="btn btn-primary">Read More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
