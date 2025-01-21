import React from 'react';
import './TemplatePage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function TemplatePage() {
  return (
    <div className="project-page-container">
      {/* Project/Page Title */}
      <div className="page-title">
        <h1>Project Title</h1>
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
            <img src="PLACEHOLDER_IMAGE_URL" alt="Placeholder description" />
          </SwiperSlide>
          {/* Add more SwiperSlides as needed */}
        </Swiper>
      </div>

      {/* Callouts / Pull Quotes */}
      <div className="pull-quote">
        <div className="quote-container">
          <p>
            <strong>“Placeholder pull quote text.”</strong>
          </p>
        </div>
      </div>

      {/* Longer Text */}
      <div className="long-text">
        <p>Placeholder paragraph text for longer description. Replace with detailed information.</p>
      </div>

      {/* Explore Application Button or link to external site */}
      <a className="button" href="PLACEHOLDER_LINK" target="_blank" rel="noreferrer">
        Placeholder Button Text
      </a>

      {/* Info Box: Publications */}
      <div className="info-box publications" style={{ gridColumn: 'span 6' }}>
        <h3>Publications</h3>
        <ul>
          <li>Placeholder publication 1</li>
          <li>Placeholder publication 2</li>
        </ul>
      </div>

      {/* Info Box: Events */}
      <div className="info-box cards events-box" style={{ gridColumn: 'span 6' }}>
        <h3>Events</h3>
        <div className="left-text-content">
          <h4>Upcoming</h4>
          <a href="PLACEHOLDER_LINK" target="_blank" rel="noreferrer">
            <li>Placeholder upcoming event</li>
          </a>
          <h4>Past</h4>
          <a href="PLACEHOLDER_LINK" target="_blank" rel="noreferrer">
            <li>Placeholder past event 1</li>
          </a>
          <a href="PLACEHOLDER_LINK" target="_blank" rel="noreferrer">
            <li>Placeholder past event 2</li>
          </a>
        </div>
      </div>

      {/* Info Boxes: People, Cooperation, Financier */}
      <div className="info-box people">
        <h3>People @ Placeholder</h3>
        <ul>
          <li>
            <a href="PLACEHOLDER_LINK">Person 1</a>
          </li>
          <li>
            <a href="PLACEHOLDER_LINK">Person 2</a>
          </li>
          <li>
            <a href="PLACEHOLDER_LINK">Person 3</a>
          </li>
        </ul>
      </div>

      <div className="info-box cooperation">
        <h3>In Cooperation With</h3>
        <p>Placeholder collaborators or institutions.</p>
      </div>

      <div className="info-box financier">
        <h3>Financier</h3>
        <p>Placeholder funding organization.</p>
      </div>
    </div>
  );
}

export default TemplatePage;
