import React from 'react';
import './SeadPage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function SeadPage() {
  return (
    <div className="project-page-container">
      {/* Project/Page Title */}
      <div className="page-title">
        <h1>The Strategic Environmental Archaeology Database</h1>
      </div>

      {/* Image Carousel */}
      <div className="image-carousel">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          spaceBetween={50}
          slidesPerView={1}
        >
        <SwiperSlide>
        <div className="slide-content">
            <img src="../assets/sead/SEAD-logo-with-subtext.png" alt="SEAD logotype" />
            <div className="overlay-text">SEAD: Strategic Environmental Archaeology Database</div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slide-content">
            <img src="../assets/sead/sead-screen-small.png" alt="Database structure" />
            <div className="overlay-text">A screenshot of SEAD's user interface</div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="slide-content">
            <img src="../assets/sead/db.png" alt="Database structure" />
            <div className="overlay-text">The SEAD database structure</div>
        </div>
        </SwiperSlide>

          {/* Add more SwiperSlides as needed */}
        </Swiper>
      </div>

      {/* Callouts / Pull Quotes */}
      <div className="pull-quote">
        <div className="quote-container">
          <p>
            <strong>“SEAD is a state of the art international standard database for environmental archaeology data and a national research infrastructure for archaeology.”</strong>
          </p>
        </div>
      </div>

      {/* Longer Text */}
      <div className="long-text">
        <p>SEAD, or the <span style={{ color: "#2E8B57", fontWeight: "bold" }}> Strategic Environmental Archaeology Database</span>, is being developed and managed at the Environmental Archaeology Lab (MAL), in collaboration with Humlab at Umeå University, Sweden. SEAD is part of the Swedish National Infrastructure for Digital Archaeology (SweDigArch).
        </p><p>
        The system allows the online storage, extraction, analysis and visualisation of data on past climates, environments and human impacts, and forms part of an international network of research infrastructure for environmental archaeology and Quaternary palaeoecology. 
        </p>
      </div>

      {/* Explore Application Button or link to external site */}
      <a className="button" style={{ gridColumn: 'span 4' }} href="https://browser.sead.se" target="_blank" rel="noreferrer">
        SEAD browser
      </a>
      <a className="button" style={{ gridColumn: 'span 4' }} href="https://sead.se" target="_blank" rel="noreferrer">
        SEAD website
      </a>
      <a className="button" style={{ gridColumn: 'span 4' }} href="https://swedigarch.se/" target="_blank" rel="noreferrer">
        SweDigArch website
      </a>
      

      {/* Info Boxes: People, Cooperation, Financier */}
      <div className="info-box people">
        <h3>People @ Humlab</h3>
        <ul>
          <li>
            <a href="PLACEHOLDER_LINK">Johan von Boer</a>
          </li>
          <li>
            <a href="PLACEHOLDER_LINK">Roger Mähler</a>
          </li>
          <li>
            <a href="PLACEHOLDER_LINK">Rebecka Weegar</a>
          </li>
        </ul>
      </div>

      <div className="info-box cooperation">
        <h3>In Cooperation With</h3>
        <a href="https://www.umu.se/forskning/infrastruktur/mal/" target="_blank" rel="noreferrer"><p>The Environmental Archaeology Laboratory (MAL) @ UMU</p></a>
      </div>

      <div className="info-box financier">
        <h3>Financier</h3>
        <div><img src="../assets/vr.png" alt="Vetenskapsrådet logo" /></div>
        <div><img src="../assets/umu-logo-EN.png" alt="Umeå university logo" /></div>
      </div>
    </div>
  );
}

export default SeadPage;
