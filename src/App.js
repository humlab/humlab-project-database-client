import logo from './logo.svg';
import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Make sure Router is imported
import QueerAIPage from './components/QueerAIPage';

// Define your individual project pages
function Project1Page() {
  return <h2>Project 1</h2>;
}

function Project2Page() {
  return <h2>Project 2</h2>;
}

function GalleryPage() {
  return <div id="main-gallery-container">


          <div className="project-tile">
            <Link to="/sead">
              <h2>SEAD</h2>
              <div className="project-image">
                <img src="assets/sead/SEAD-logo-with-subtext.png" alt="SEAD logotype" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/visp">
              <h2>Visible Speech</h2>
              <div className="project-image">
                <img src="assets/visp/screenshot2.png" alt="Screenshot of tool, soundwaves" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/westac">
              <h2>Welfare state analytics</h2>
              <div className="project-image">
                <img src="assets/westac/screenshot1.png" alt="Westac generic headline screenshot" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/inidun">
              <h2>International Ideas at UNESCO</h2>
              <div className="project-image">
                <img src="assets/inidun/inidun.png" alt="Inidun website" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/swedeb">
              <h2>SweDeb</h2>
              <div className="project-image">
                <img src="assets/swedeb/SweDeb.png" alt="Example data within project" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/infravis-sead">
              <h2>SEAD Conservation Paleobiology</h2>
              <div className="project-image">
                <img src="assets/infravis-sead/seadbugs-screenshot.png" alt="Screenshot showing BugsCEP data" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/digibon">
              <h2>DigiBön</h2>
              <div className="project-image">
                <img src="assets/digibon/digibon-screenshot.png" alt="Screenshot of map application" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/plagiat">
              <h2>Nätutbildning om plagiat</h2>
              <div className="project-image">
                <img src="assets/kuber.png" alt="Humlabs light cubes" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/queer-ai">
              <h2>Queer AI</h2>
              <div className="project-image">
                <img src="assets/queer-ai/queer-ai.png" alt="Queer AI brain" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/aps">
              <h2>Andra Person Singular</h2>
              <div className="project-image">
                <img src="assets/aps/aps_love.jpg" alt="Från föreställningen APS" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/umanista">
              <h2>Umanista</h2>
              <div className="project-image">
                <img src="assets/umanista/umanista.png" alt="Screenshot of webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/linguistic-landscape">
              <h2>The Language of Place-making</h2>
              <div className="project-image">
                <img src="assets/linguistic-landscape/LL-screenshot.png" alt="Screenshot of GIS-application of data in Umeå" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/dialectical-imaginaries">
              <h2>Dialectical Imaginaries</h2>
              <div className="project-image">
                <img src="assets/dialectical-imaginaries/di.png" alt="Screenshot of webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/going-beyond-search">
              <h2>Going beyond search</h2>
              <div className="project-image">
                <img src="assets/going-beyond-search/kuber2.png" alt="Screenshot of webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/tcoir">
              <h2>The Culture of International Society</h2>
              <div className="project-image">
                <img src="assets/tcoir/tcoir.png" alt="Screenshot of webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/digital-periegesis">
              <h2>Digital Periegesis</h2>
              <div className="project-image">
                <img src="assets/digital-periegesis/digital-periegesis.png" alt="Screenshot of map" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/melody">
              <h2>Melody</h2>
              <div className="project-image">
                <img src="assets/melody/melody.png" alt="Melody screenshot of webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/iaccept">
              <h2>iAccept</h2>
              <div className="project-image">
                <img src="assets/iaccept/iaccept.jpg" alt="Screenshot of webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/rave">
              <h2>RAVE & C-RAVE</h2>
              <div className="project-image">
                <img src="assets/rave+c-rave/rave.png" alt="Screenshot of Rave webpage" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/digitalamodeller">
              <h2>Digitala modeller</h2>
              <div className="project-image">
                <img src="assets/digitalamodeller/model3.png" alt="Wooden tool" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/enida">
              <h2>ENIDA</h2>
              <div className="project-image">
                <img src="assets/enida/enida-screenshot-1.png" alt="Screenshot from application of ENIDA" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/yrkesrum">
              <h2>Yrkesrum</h2>
              <div className="project-image">
                <img src="assets/yrkesrum/yrkesrum1.png" alt="Screenshot of network within application" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/utopia">
              <h2>Utopia</h2>
              <div className="project-image">
                <img src="assets/utopia/1.png" alt="Screenshot from game" />
              </div>
            </Link>
          </div>

          <div className="project-tile">
            <Link to="/staden">
              <h2>Staden</h2>
              <div className="project-image">
                <img src="assets/staden-screenshot-1.png" alt="Screenshot of application" />
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

          <div id="banner">
            <h1>Humlab Showcase</h1>
          </div>

          <div id="main-lower">
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
