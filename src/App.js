import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'; // Make sure Router is imported
import QueerAIPage from './components/QueerAIPage';
import SeadPage from './components/SeadPage';
import VispPage from './components/VispPage';
import ProjectPage from './components/ProjectPage';
import "font-awesome/css/font-awesome.min.css";

function GalleryPage() {
  
  return <div>
          <h1>Humlab Showcase</h1>
          <h4>A showcase of current and completed projects at Humlab, Umeå University</h4>
          <div id="main-gallery-container">

          <Link to="/sead" className="project-tile-link">
          <h2>SEAD</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  
                  <div className="project-tile" title="SEAD logotype" style={{ backgroundImage: "url('./assets/sead/sead-screen-small.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                  <h3>SEAD is a state of the art international standard database for environmental archaeology data and a national research infrastructure for archaeology.</h3>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/visp" className="project-tile-link">
          <h2>Visible Speech</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Visible Speech logotype" style={{ backgroundImage: "url('./assets/visp/screenshot2.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/westac" className="project-tile-link">
          <h2>Welfare state analytics</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Welfare state analytics logotype" style={{ backgroundImage: "url('./assets/westac/screenshot1.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/inidun" className="project-tile-link">
          <h2>International Ideas at UNESCO</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="International Ideas at UNESCO logotype" style={{ backgroundImage: "url('./assets/inidun/inidun.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/swedeb" className="project-tile-link">
          <h2>SweDeb</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="SweDeb logotype" style={{ backgroundImage: "url('./assets/swedeb/SweDeb.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/infravis-sead" className="project-tile-link">
          <h2>SEAD Conservation Paleobiology</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="SEAD Conservation Paleobiology logotype" style={{ backgroundImage: "url('./assets/infravis-sead/seadbugs-screenshot.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/digibon" className="project-tile-link">
          <h2>DigiBön</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="DigiBön logotype" style={{ backgroundImage: "url('./assets/digibon/digibon-screenshot.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/plagiat" className="project-tile-link">
          <h2>Nätutbildning om plagiat</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Nätutbildning om plagiat logotype" style={{ backgroundImage: "url('./assets/kuber.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/queer-ai" className="project-tile-link">
          <h2>Queer AI</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Queer AI logotype" style={{ backgroundImage: "url('./assets/queer-ai/queer-ai.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/aps" className="project-tile-link">
          <h2>Andra Person Singular</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Andra Person Singular logotype" style={{ backgroundImage: "url('./assets/aps/aps_love.jpg')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/umanista" className="project-tile-link">
          <h2>Umanista</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Umanista logotype" style={{ backgroundImage: "url('./assets/umanista/umanista.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/linguistic-landscape" className="project-tile-link">
          <h2>The Language of Place-making</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="The Language of Place-making logotype" style={{ backgroundImage: "url('./assets/linguistic-landscape/LL-screenshot.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/dialectical-imaginaries" className="project-tile-link">
          <h2>Dialectical Imaginaries</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Dialectical Imaginaries logotype" style={{ backgroundImage: "url('./assets/dialectical-imaginaries/di.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/going-beyond-search" className="project-tile-link">
          <h2>Going beyond search</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Going beyond search logotype" style={{ backgroundImage: "url('./assets/going-beyond-search/kuber2.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/tcoir" className="project-tile-link">
          <h2>The Culture of International Society</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="The Culture of International Society logotype" style={{ backgroundImage: "url('./assets/tcoir/tcoir.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/digital-periegesis" className="project-tile-link">
          <h2>Digital Periegesis</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Digital Periegesis logotype" style={{ backgroundImage: "url('./assets/digital-periegesis/digital-periegesis.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/melody" className="project-tile-link">
          <h2>Melody</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Melody logotype" style={{ backgroundImage: "url('./assets/melody/melody.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/iaccept" className="project-tile-link">
          <h2>iAccept</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="iAccept logotype" style={{ backgroundImage: "url('./assets/iaccept/iaccept.jpg')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/rave" className="project-tile-link">
          <h2>RAVE & C-RAVE</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="RAVE & C-RAVE logotype" style={{ backgroundImage: "url('./assets/rave+c-rave/rave.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/digitalamodeller" className="project-tile-link">
          <h2>Digitala modeller</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Digitala modeller logotype" style={{ backgroundImage: "url('./assets/digitalamodeller/model3.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/enida" className="project-tile-link">
          <h2>ENIDA</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="ENIDA logotype" style={{ backgroundImage: "url('./assets/enida/enida-screenshot-1.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/yrkesrum" className="project-tile-link">
          <h2>Yrkesrum</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Yrkesrum logotype" style={{ backgroundImage: "url('./assets/yrkesrum/yrkesrum1.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/utopia" className="project-tile-link">
          <h2>Utopia</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Utopia logotype" style={{ backgroundImage: "url('./assets/utopia/1.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </Link>

                <Link to="/staden" className="project-tile-link">
          <h2>Staden</h2>
            <div className="scene">
              <div className="cube">
                <div className="face face--front">
                  <div className="project-tile" title="Staden logotype" style={{ backgroundImage: "url('./assets/staden-screenshot-1.png')" }}></div>
                </div>
                <div className="face face--right project-tile">
                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div>
              </div>
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
