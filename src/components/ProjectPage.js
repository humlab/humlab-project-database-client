import React, { useEffect, useState, useRef } from 'react';
import './ProjectPage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function ProjectPage({ endpoint }) {
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hasFetchedData = useRef(false); // Track if data has been fetched

    useEffect(() => {
        if (hasFetchedData.current) return; // Prevent duplicate fetch
        hasFetchedData.current = true;

        const fetchData = async () => {
            try {
                const response = await fetch(endpoint); // Fetch data from the backend
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setProjectData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const {
        title,
        description,
        images,
        pullQuote,
        longText,
        links,
        people,
        cooperation,
        financier,
    } = projectData;

    return (
        <div className="project-page-container">
            {/* Project/Page Title */}
            <div className="page-title">
                <h1>{title}</h1>
            </div>

            {/* Image Carousel */}
            {images && images.length > 0 && (
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
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="slide-content">
                                    <img src={image.url} alt={image.alt} />
                                    <div className="overlay-text">{image.caption}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* Callouts / Pull Quotes */}
            {pullQuote && (
                <div className="pull-quote">
                    <div className="quote-container">
                        <p>
                            <strong>{pullQuote}</strong>
                        </p>
                    </div>
                </div>
            )}

            {/* Longer Text */}
            {longText && (
                <div className="long-text">
                    <p>{longText}</p>
                </div>
            )}

            {/* External Links */}
            {links && links.length > 0 && (
                <div className="external-links" style={{ gridColumn: 'span 12' }}>
                    {links.map((link, index) => (
                        <a
                            key={index}
                            className="button"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}

            {/* Info Boxes */}
            {people && people.length > 0 && (
                <div className="info-box people">
                    <h3>People</h3>
                    <ul>
                        {people.map((person, index) => (
                            <li key={index}>
                                <a href={person.link}>{person.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {cooperation && (
                <div className="info-box cooperation">
                    <h3>In Cooperation With</h3>
                    <a href={cooperation.link} target="_blank" rel="noreferrer">
                        <p>{cooperation.name}</p>
                    </a>
                </div>
            )}

            {financier && financier.length > 0 && (
                <div className="info-box financier">
                    <h3>Financiers</h3>
                    {financier.map((item, index) => (
                        <div key={index}>
                            <a href={item.url} target="_blank" rel="noreferrer">
                                <img src={item.logo} alt={item.name} />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectPage;
