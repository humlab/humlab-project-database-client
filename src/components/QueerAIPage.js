import React from 'react';
import './QueerAIPage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function QueerAIPage() {

    return (
        
        <div className="project-page-container">
          {/* Project/Page Title */}
          <div className="page-title">
            <h1>Queer AI</h1>
          </div>
    
          {/* Image Carousel */}
          <div className="image-carousel">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{
                delay: 5000, // Delay in milliseconds (e.g., 3000ms = 3 seconds)
                disableOnInteraction: true, // Keeps autoplay running after user interactions
            }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
            <SwiperSlide><img src="../assets/queer-ai/queer-ai.png" alt="Queer AI" /></SwiperSlide>
            </Swiper>
            
          </div>
    
          {/* Callouts / Pull Quotes */}
          <div className="pull-quote">
            <div className="quote-container">
            <p><strong>“This project aims to identify current research on the intersections between Automated Facial Analysis (FA) and queer positions and identities, and/or research on FA from queer theoretical perspectives.”</strong></p>
            </div>
          </div>  
    
          {/* Longer Text */}
          <div className="long-text">
            <p>
            Automated facial analysis (FA) technologies - such as facial detection and facial recognition - stand out as central in discussions about Artificial Intelligence's (AI) impact on human beings. AI is intertwined with both the most mundane and the most critical aspects of human life, and image detection and classification represents a pertinent domain where we can see a tight coupling of human identity and computation. 
            </p><p>
            In previous research on automatic gender recognition, the classification of gender by FA technologies, has raised potential concerns around issues of racial and gender bias (e.g. Schuerman et al 2019). Research on FA from queer perspectives is still limited, but the results in studies with focus on queer identity and perspectives points towards potential risks. For an example, Schuerman et al. (2019) found that FA services performed consistently worse on transgender individuals and were universally unable to classify non-binary genders.
            </p>
          </div>

          {/* Explore Application Button or link to external site */}
          <a className="button" href="https://play.umu.se/playlist/dedicated/105250/0_qwbiscsy/0_lqdnclpb" target="_blank" rel="noreferrer">
          Humlab Talk
          </a>

          <div className="info-box publications" style={{gridColumn: "span 6"}}>
            <h3>Publications</h3>
            <ul>
                <li>Danielsson, K., Tubella, A. A., Liliequist, E., & Cocq, C. (2023). Queer Eye on AI: binary systems versus fluid identities. In Handbook of Critical Studies of Artificial Intelligence (pp. 595-606). Edward Elgar Publishing.</li>

                <li>Liliequist, E., Tubella, A. A., Danielsson, K., & Cocq, C. (2023). Beyond the Binary - Queering AI for an Inclusive Future. interactions, 30(3), 31-33.</li>
            </ul>
          </div>
          <div className="info-box cards events-box" style={{gridColumn: "span 6"}}>
            <h3>Events</h3>
            <div className="left-text-content">
            <h4>Upcoming</h4>
            <a href="https://www.umu.se/en/humlab/program-activities/queer-futures-of-ai/" target="_blank" rel="noreferrer">
                <li>
                    Conference "Queer futures of AI? Possibilities, constraints, and risks"
                </li>
            </a> 
            <h4>Past</h4>

            <a href="https://www.umu.se/en/events/humlab-talk-queer-in-ai_11398958/" target="_blank" rel="noreferrer">
                <li>
                    Humlab Talk: Queer in AI
                </li>
            </a>

            <a href="https://www.umu.se/en/events/humlab-talk-how-we-teach-algorithms-identity-_11162212/" target="_blank" rel="noreferrer">
                <li>
                    Humlab Talk: How we teach algorithms identity
                </li>
            </a>
            <a href="https://www.umu.se/en/events/humlab-talk-the-whole-thing-smacks-of-gender_11286200/" target="_blank" rel="noreferrer">
                <li>
                    Humlab Talk: The Whole Thing Smacks Of Gender
                </li>
            </a>
            </div>
            
            </div>

          
    
          {/* Info Boxes: People, Cooperation, Financier */}
          <div className="info-box people">
            <h3>People @ Humlab</h3>
            <ul>
                <li><a href="https://www.umu.se/en/staff/coppelie-cocq/">Coppélie Cocq</a></li>
                <li><a href="https://www.umu.se/personal/karin-danielsson/">Karin Danielsson</a></li>
                <li><a href="https://www.umu.se/personal/evelina-liliequist/">Evelina Liliequist</a></li>
            </ul>
          </div>
          <div className="info-box cooperation">
            <h3>In Cooperation With</h3>
            <p>Collaborators or institutions.</p>
          </div>
          <div className="info-box financier">
            <h3>Financier</h3>
            <p>The Faculty of Arts and Humanities, Umeå University</p>
          </div>
        </div>
      );
}


export default QueerAIPage;