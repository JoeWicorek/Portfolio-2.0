'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Header() {
  useEffect(() => {
    // Header scroll animations
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(header, {
          backgroundColor: 'rgba(0,0,0,0.8)',
          duration: 0.3
        });
      } else {
        gsap.to(header, {
          backgroundColor: 'transparent',
          duration: 0.3
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header">
      <nav>
        <div className="logo">Your Name</div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
