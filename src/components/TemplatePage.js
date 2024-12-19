import React from 'react';
import './TemplatePage.scss';

function TemplatePage() {

    return (
        <div className="project-page-container">
          {/* Project/Page Title */}
          <div className="page-title">
            <h1>Project/Page Title</h1>
          </div>
    
          {/* Image Carousel */}
          <div className="image-carousel">
            <p>Image Carousel (React Component)</p>
          </div>
    
          {/* Callouts / Pull Quotes */}
          <div className="pull-quote">
            <p><strong>“An exciting highlight from the project!”</strong></p>
          </div>
    
          {/* Explore Application Button */}
          <div className="explore-button">
            <button>Explore Application</button>
          </div>
    
          {/* Longer Text */}
          <div className="long-text">
            <p>
              This is the longer description of the project, providing details,
              insights, and background information.
            </p>
          </div>
    
          {/* Info Boxes: People, Cooperation, Financier */}
          <div className="info-box people">
            <h3>People @ Humlab</h3>
            <p>Details about the team involved.</p>
          </div>
          <div className="info-box cooperation">
            <h3>In Cooperation With</h3>
            <p>Collaborators or institutions.</p>
          </div>
          <div className="info-box financier">
            <h3>Financier</h3>
            <p>Funding sources for the project.</p>
          </div>
        </div>
      );
}


export default TemplatePage;