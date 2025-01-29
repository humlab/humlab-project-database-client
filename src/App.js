import './App.scss';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'; // Make sure Router is imported
import ProjectPage from './components/ProjectPage';
import "font-awesome/css/font-awesome.min.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function GalleryPage() {
  setTimeout(() => {
    gsap.to(".project-tile-link h2", { duration: 0.5, translateY: "-3em" });
  }, 500);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from backend API
    fetch("http://localhost:3100/projects") // Adjust endpoint to your backend
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error("Error fetching projects:", error));

    // Animate project titles after a delay
    setTimeout(() => {
      gsap.to(".project-tile-link h2", { duration: 0.5, translateY: "-3em" });
    }, 500);
  }, []);
  

  return <div>
          <h1>Humlab Showcase</h1>
          <h4 className='showcase-text'>A showcase of current and completed projects at Humlab, Umeå University</h4>
          <div id="main-gallery-container">
            {projects.filter(project => project.visible !== false).map((project) => (
              <Link to={`/${project.id}`} className="project-tile-link" key={project.id}>
                <h2>{project.title}</h2>
                <div className="scene">
                  <div className="cube">
                    <div className="face face--front">
                      <div
                        className="project-tile"
                        title={`${project.title} logotype`}
                        style={{
                          backgroundImage: `url(${project.cover_image?.url || "./assets/default-placeholder.png"})`
                        }}
                      ></div>
                    </div>
                    <div className="face face--right project-tile">
                      {project.description ? <h3>{project.description}</h3> : <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>;
}


// Main App Component with Routing
function App() {

  /*
  useEffect(() => {
    const handleMouseMove = (event) => {
      const scaling = 10;
      const { clientX, clientY } = event;
    
      // Calculate the movement ratios based on the window size
      const xOffset = (clientX / window.innerWidth) * 100 - 50;
      const yOffset = (clientY / window.innerHeight) * 100 - 50;
    
      // Move background layers at different speeds, scaled by the `scaling` factor
      const bg1 = document.getElementById('bg1');
      const bg2 = document.getElementById('bg2');
      const bg3 = document.getElementById('bg3');
    
      // Adjust the translate values for each background, applying the scaling factor
      bg1.style.transform = `translate(${xOffset * 0.05 * scaling}px, ${yOffset * 0.005 * scaling}px)`;
      bg2.style.transform = `translate(${xOffset * 0.1 * scaling}px, ${yOffset * 0.01 * scaling}px)`;
      bg3.style.transform = `translate(${xOffset * 0.15 * scaling}px, ${yOffset * 0.015 * scaling}px)`;
    };

    // Attach the mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
    
  }, []);
  */

  const DynamicProjectPage = () => {
    const { projectName } = useParams();
    const endpoint = `http://localhost:3100/project/${projectName}`;
    return <ProjectPage endpoint={endpoint} />;
  };

  return (
    <Router> {/* Wrap the app inside Router */}
      <div className="App">
        <div id="main-container">

          <div id="content-container">
            { /* <div id="bg1" class="parallax-bg"></div>
            <div id="bg2" class="parallax-bg"></div>
            <div id="bg3" class="parallax-bg"></div> */ }


            <div></div>
            
            <Routes>
              <Route path="/" element={<GalleryPage />} />
              <Route path="/sead" element={<ProjectPage endpoint={"http://localhost:3100/project/sead"} />} />
              <Route path="/:projectName" element={<DynamicProjectPage />} />
            </Routes>

            <div id="footer">
              <a href="https://www.umu.se/en/humlab/" target="_blank" rel="noreferrer">
                <img id="humlab-umu-logo" src="./assets/humlab_logo_neg_en_small.png" alt="Humlab logotype" />
              </a>
            </div>
          </div>

          
          

        </div>
      </div>
    </Router> // Close Router here
  );
}

export default App;
