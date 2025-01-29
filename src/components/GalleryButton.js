import { useEffect } from "react";
import gsap from "gsap";

import './GalleryButton.scss';

function GalleryButton() {
    useEffect(() => {
      const squares = document.querySelectorAll(".gallery-button-grid-container i");
      const container = document.querySelector(".gallery-button-grid-container");
      let animationIntervals = [];
  
      // Default state: white
      gsap.set(squares, { color: "white" });
  
      const startColorAnimation = () => {
        squares.forEach((square, index) => {
          const changeColor = () => {
            const neonColor = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 30 + 70}%)`;
            gsap.to(square, { duration: 0.5, color: neonColor });
          };
          
          // Change color every 0.5s
          changeColor();
          animationIntervals[index] = setInterval(changeColor, 500);
        });
      };
  
      const stopColorAnimation = () => {
        animationIntervals.forEach(clearInterval);
        gsap.to(squares, { duration: 0.5, color: "white" });
      };
  
      container.addEventListener("mouseenter", startColorAnimation);
      container.addEventListener("mouseleave", stopColorAnimation);
  
      return () => {
        container.removeEventListener("mouseenter", startColorAnimation);
        container.removeEventListener("mouseleave", stopColorAnimation);
        stopColorAnimation(); // Ensure intervals are cleared when component unmounts
      };
    }, []);
  
    return (
      <a href="/" id="gallery-button">
        <div className="gallery-button-grid-container">
          {[...Array(9)].map((_, index) => (
            <i key={index} className="fa fa-square" aria-hidden="true"></i>
          ))}
        </div>
      </a>
    );
  }
  
  export default GalleryButton;