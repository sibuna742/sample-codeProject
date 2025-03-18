import axios from 'axios';

// Create an Axios instance with the base URL for your backend
const instance = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL
  timeout: 5000, // Optional: Set a timeout for requests
});

export default instance;
