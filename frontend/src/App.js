import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
function App() {
    return (
        // <Router>
        <div className="App">
            <div>
                <Navbar />
            <div className="container mt-4">
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user/:id" element={<UserProfile />} />
            </Routes>
            </div>
            </div>
        </div>
    );
}

export default App;
