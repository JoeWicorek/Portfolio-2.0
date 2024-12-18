'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Hero() {
  useEffect(() => {
    // Text split animation
    const heroText = new SplitType('.highlight-text', { types: 'words,chars' });
    
    gsap.from(heroText.chars, {
      opacity: 0,
      y: 50,
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out'
    });
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="title-container">
          <h1>Hi 👋, I'm</h1>
          <h2 className="highlight-text">Joseph Wicorek</h2>
        </div>
        <p className="hero-description">
          A passionate Software Engineer dedicated to crafting innovative digital solutions
        </p>
        <div className="hero-cta">
          <a href="#contact" className="btn btn-primary">Get in Touch</a>
          <a href="#projects" className="btn btn-secondary">View Projects</a>
        </div>
      </div>
    </section>
  );
}
