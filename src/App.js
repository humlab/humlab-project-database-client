import logo from './logo.svg';
import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Make sure Router is imported
import QueerAIPage from './components/QueerAIPage';

function GalleryPage() {
  
  return <div>
          <h1>Humlab Showcase</h1>
          <div id="main-gallery-container">

                <Link to="/sead" class="project-tile-link">
                  <div className="project-tile" title="SEAD logotype" style={{ backgroundImage: "url('./assets/sead/sead-screen-small.png')" }}>
                      <h2>SEAD</h2>
                  </div>
                </Link>

                <Link to="/visp" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/visp/screenshot2.png')" }}>
                    <h2>Visible Speech</h2>
                  </div>
                </Link>

                <Link to="/westac" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/westac/screenshot1.png')" }}>
                    <h2>Welfare state analytics</h2>
                  </div>
                </Link>

                <Link to="/inidun" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/inidun/inidun.png')" }}>
                    <h2>International Ideas at UNESCO</h2>
                  </div>
                </Link>

                <Link to="/swedeb" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/swedeb/SweDeb.png')" }}>
                    <h2>SweDeb</h2>
                  </div>
                </Link>

                <Link to="/infravis-sead" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/infravis-sead/seadbugs-screenshot.png')" }}>
                    <h2>SEAD Conservation Paleobiology</h2>
                  </div>
                </Link>

                <Link to="/digibon" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/digibon/digibon-screenshot.png')" }}>
                    <h2>DigiBön</h2>
                  </div>
                </Link>

                <Link to="/plagiat" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/kuber.png')" }}>
                    <h2>Nätutbildning om plagiat</h2>
                  </div>
                </Link>

                <Link to="/queer-ai" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/queer-ai/queer-ai.png')" }}>
                    <h2>Queer AI</h2>
                  </div>
                </Link>

                <Link to="/aps" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/aps/aps_love.jpg')" }}>
                    <h2>Andra Person Singular</h2>
                  </div>
                </Link>

                <Link to="/umanista" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/umanista/umanista.png')" }}>
                    <h2>Umanista</h2>
                  </div>
                </Link>

                <Link to="/linguistic-landscape" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/linguistic-landscape/LL-screenshot.png')" }}>
                    <h2>The Language of Place-making</h2>
                  </div>
                </Link>

                <Link to="/dialectical-imaginaries" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/dialectical-imaginaries/di.png')" }}>
                    <h2>Dialectical Imaginaries</h2>
                  </div>
                </Link>

                <Link to="/going-beyond-search" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/going-beyond-search/kuber2.png')" }}>
                    <h2>Going beyond search</h2>
                  </div>
                </Link>

                <Link to="/tcoir" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/tcoir/tcoir.png')" }}>
                    <h2>The Culture of International Society</h2>
                  </div>
                </Link>

                <Link to="/digital-periegesis" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/digital-periegesis/digital-periegesis.png')" }}>
                    <h2>Digital Periegesis</h2>
                  </div>
                </Link>

                <Link to="/melody" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/melody/melody.png')" }}>
                    <h2>Melody</h2>
                  </div>
                </Link>

                <Link to="/iaccept" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/iaccept/iaccept.jpg')" }}>
                    <h2>iAccept</h2>
                  </div>
                </Link>

                <Link to="/rave" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/rave+c-rave/rave.png')" }}>
                    <h2>RAVE & C-RAVE</h2>
                  </div>
                </Link>

                <Link to="/digitalamodeller" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/digitalamodeller/model3.png')" }}>
                    <h2>Digitala modeller</h2>
                  </div>
                </Link>

                <Link to="/enida" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/enida/enida-screenshot-1.png')" }}>
                    <h2>ENIDA</h2>
                  </div>
                </Link>

                <Link to="/yrkesrum" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/yrkesrum/yrkesrum1.png')" }}>
                    <h2>Yrkesrum</h2>
                  </div>
                </Link>

                <Link to="/utopia" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/utopia/1.png')" }}>
                    <h2>Utopia</h2>
                  </div>
                </Link>

                <Link to="/staden" className="project-tile-link">
                  <div className="project-tile" style={{ backgroundImage: "url('./assets/staden-screenshot-1.png')" }}>
                    <h2>Staden</h2>
                  </div>
                </Link>

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

  return (
    <Router> {/* Wrap the app inside Router */}
      <div className="App">
        <div id="main-container">

        { /* 
          <div id="banner">
            <h1>Humlab Showcase</h1>
          </div>
          */ }

          <div id="content-container">
            { /* <div id="bg1" class="parallax-bg"></div>
            <div id="bg2" class="parallax-bg"></div>
            <div id="bg3" class="parallax-bg"></div> */ }
            
            
            <Routes>
              <Route path="/" element={<GalleryPage />} />
              <Route path="/queer-ai" element={<QueerAIPage />} />
            </Routes>
          </div>
          

        </div>
      </div>
    </Router> // Close Router here
  );
}

export default App;
