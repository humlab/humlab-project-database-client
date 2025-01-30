import React, { useEffect, useState, useRef } from 'react';
import './ProjectPage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import GalleryButton from './GalleryButton';


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

    if (loading) return <div className='loading-status-text'>Loading...</div>;
    if (error) return <div className='loading-status-text'>
        Error: {error}<br /><br />
        Please email support@humlab.umu.se
        </div>;

    const {
        title,
        subtitle,
        description,
        images,
        pullQuote,
        longText,
        links,
        people,
        cooperation_partners,
        financier,
    } = projectData;


    const handleMouseEnter = (event) => {
        gsap.to(event.currentTarget, {
            scale: 1.05, // Slightly enlarges the box
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", // Adds depth
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (event) => {
        gsap.to(event.currentTarget, {
            scale: 1,
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.15)", // Back to normal
            duration: 0.3,
            ease: "power2.inOut",
        });
    };

    return (
        <div className="project-page-container">
            <a href="/" id="gallery-button">
                <GalleryButton />
            </a>
            {/* Project/Page Title */}
            <div className="page-title">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
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
                    <h3>Whom To Blame</h3>
                    <ul>
                        {people.map((person, index) => (
                            <li key={index}>
                                <a href={person.link}>
                                    <div className="info-box-content profile-container"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    >

                                        {person.profileImage ? (
                                            <div className="profile-image-container">
                                                <img
                                                    src={person.profileImage}
                                                    alt={`${person.name}'s profile`}
                                                    className="profile-image"
                                                />
                                            </div>
                                        ) : (
                                            <div className="profile-image-container">
                                                <i className="fa fa-user-circle"></i>
                                            </div>
                                        )}
                                        {person.name}
                                        
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {cooperation_partners && (
                <div className="info-box cooperation">
                    <h3>In Cooperation With</h3>
                    {cooperation_partners.map((item, index) => (
                        <a href={item.link} key={index} target="_blank" rel="noreferrer">
                            <div
                                className="info-box-content org-container"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="org-image-container">
                                    {item.logo ? (
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="org-image"
                                        />
                                    ) : (
                                        <span className="org-name">{item.name}</span>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}


            {financier && financier.length > 0 && (
                <div className="info-box financier">
                    <h3>Financiers</h3>
                    {financier.map((item, index) => (
                        <a href={item.link} key={index} target="_blank" rel="noreferrer">
                            <div
                                className="info-box-content org-container"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="org-image-container">
                                    {item.logo ? (
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="org-image"
                                        />
                                    ) : (
                                        <span className="org-name">{item.name}</span>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ProjectPage;
