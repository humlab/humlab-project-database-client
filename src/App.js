import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Make sure Router is imported

// Define your individual project pages
function Project1Page() {
  return <h2>Project 1</h2>;
}

function Project2Page() {
  return <h2>Project 2</h2>;
}

function GallerPage() {
  return <div id="main-gallery-container">
          {/* Make sure to use className instead of class */}
          <div className="project-tile">
            <h2>Project 1</h2>
          </div>

          <div className="project-tile">
            <h2>Project 2</h2>
          </div>

          <div className="project-tile">
            <Link to="/queer-ai">
              <h2>Queer AI</h2>
              <div className="project-image">
                <img src="https://showcase.humlab.umu.se/assets/queer-ai/queer-ai.png" alt="Queer AI" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <h2>Project 4</h2>
          </div>

          {/* Add more project tiles here */}
        </div>;
}

function QueerAIPage() {
  return (
    <div>
      <h2>Queer AI Page</h2>
      <img src="https://showcase.humlab.umu.se/assets/queer-ai/queer-ai.png" alt="Queer AI" />
    </div>
  );
}

// Main App Component with Routing
function App() {
  return (
    <Router> {/* Wrap the app inside Router */}
      <div className="App">
        <div id="main-container">

          <div id="banner">
            <h1>Humlab Showcase</h1>
          </div>

          {/* Define Routes for navigation */}
          <Routes>
            <Route path="/" element={<GallerPage />} />
            <Route path="/queer-ai" element={<QueerAIPage />} />
          </Routes>

        </div>
      </div>
    </Router> // Close Router here
  );
}

export default App;
