// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import App from './App'; // Import the App component where routing happens
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
// Create the root element to render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Wrap the application in BrowserRouter for handling routing
root.render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  <React.StrictMode>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
