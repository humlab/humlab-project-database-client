import React from 'react';
import './QueerAIPage.scss';

function QueerAIPage() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
        <div className="project-page-container">
          {/* Project/Page Title */}
          <div className="page-title">
            <h1>Queer AI</h1>
          </div>
    
          {/* Image Carousel */}
          <div className="image-carousel">
            <img src="../assets/queer-ai/queer-ai.png" alt="Queer AI" />
          </div>
    
          {/* Callouts / Pull Quotes */}
          <div className="pull-quote">
            <div class="quote-container">
            <p><strong>“Detta projekt syftar till att identifiera aktuell forskning om skärningspunkterna mellan FA (Automated facial analysis) och queerpositioner och identifieringar, och/eller forskning om FA från queerteoretiska utgångspunkter.”</strong></p>
            </div>
          </div>
    
          {/* Explore Application Button or link to external site */}
          <a className="button" href="https://play.umu.se/playlist/dedicated/105250/0_qwbiscsy/0_lqdnclpb" target="_blank">
          Humlab Talk
          </a>
            
    
          {/* Longer Text */}
          <div className="long-text">
            <p>
            Automated facial analysis (FA) technologies - such as facial detection and facial recognition - stand out as central in discussions about Artificial Intelligence's (AI) impact on human beings. AI is intertwined with both the most mundane and the most critical aspects of human life, and image detection and classification represents a pertinent domain where we can see a tight coupling of human identity and computation. In previous research on automatic gender recognition, the classification of gender by FA technologies, has raised potential concerns around issues of racial and gender bias (e.g. Schuerman et al 2019). Research on FA from queer perspectives is still limited, but the results in studies with focus on queer identity and perspectives points towards potential risks. For an example, Schuerman et al. (2019) found that FA services performed consistently worse on transgender individuals and were universally unable to classify non-binary genders.
            </p>
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