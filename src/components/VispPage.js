import React from 'react';
import './VispPage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function VispPage() {
  return (
    <div className="project-page-container">
      {/* Project/Page Title */}
      <div className="page-title">
        <h1>Visible Speech (VISP)</h1>
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
              <img src="../assets/visp/VISP-logo-black.png" alt="VISP logotype" />
              <div className="overlay-text">The VISP logotype</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src="../assets/visp/visp-screenshot-1.png" alt="VISP user interface" />
              <div className="overlay-text">A screenshot of one of the tools integrated in the VISP system</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content">
              <img src="../assets/visp/visp-ss-1.png" alt="VISP dashboard" />
              <div className="overlay-text">VISP dashboard</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Callouts / Pull Quotes */}
      <div className="pull-quote">
        <div className="quote-container">
          <p>
            <strong>
              “VISP offers the most comprehensive set of publicly available speech and voice analysis procedures in the world.”
            </strong>
          </p>
        </div>
      </div>

      {/* Longer Text */}
      <div className="long-text">
        <p>
          Visible Speech (VISP) is an infrastructure designed to handle speech recordings in compliance with GDPR and IT security standards. It provides a centralized environment for spoken language research, enabling researchers to process speech data securely without risking unauthorized distribution.
        </p>
        <p>
          VISP supports national and international collaborations and features a secure environment for uploading, analyzing, and annotating speech data. The platform also simplifies digital archiving and FAIR-compliant data sharing through a unified, transparent directory structure.
        </p>
      </div>

      {/* Explore Application Buttons */}
      <a
        className="button"
        style={{ gridColumn: 'span 12' }}
        href="https://visp.humlab.umu.se"
        target="_blank"
        rel="noreferrer"
      >
        Go to the VISP system
      </a>

      {/* Info Boxes: People, Cooperation, Financier */}
      <div className="info-box people">
        <h3>People @ Humlab</h3>
        <ul>
          <li>
            <a href="https://www.umu.se/personal/johan-von-boer/">Johan von Boer</a>
          </li>
          <li>
            <a href="https://www.umu.se/personal/tomas-skotare/">Tomas Skotare</a>
          </li>
          <li>
            <a href="https://www.umu.se/personal/kajsa-palm/">Kajsa Palm</a>
          </li>
        </ul>
      </div>

      <div className="info-box cooperation">
        <h3>In Cooperation With</h3>
        <ul>
          <li>Fredrik Karlsson</li>
          <li>Linda Sandström</li>
          <li>
            <a
              href="https://www.umu.se/institutionen-for-klinisk-vetenskap/"
              target="_blank"
              rel="noreferrer"
            >
              Department of Clinical Sciences
            </a>
          </li>
        </ul>
      </div>

      <div className="info-box financier">
        <h3>Financier</h3>
        <div>
          <img src="../assets/vr.png" alt="Swedish Research Council logo" />
        </div>
        <div>
          <img src="../assets/umu-logo-EN.png" alt="Umeå University logo" />
        </div>
      </div>
    </div>
  );
}

export default VispPage;
