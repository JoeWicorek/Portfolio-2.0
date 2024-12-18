'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init();

    // GSAP Animations
    const loadingScreen = document.querySelector('.loading-screen') as HTMLElement;
    const loadingBar = document.querySelector('.loading-bar') as HTMLElement;

    gsap.to(loadingBar, {
      duration: 1.5,
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'power4.inOut'
    });

    gsap.to(loadingScreen, {
      duration: 0.5,
      opacity: 0,
      delay: 2,
      onComplete: () => {
        loadingScreen.style.display = 'none';
      }
    });

    // Three.js Gradient Canvas
    const canvas = document.getElementById('gradient-canvas') as HTMLCanvasElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

  }, []);

  return (
    <div className="container">
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="loading-bar"></div>
        </div>
      </div>
      <canvas id="gradient-canvas"></canvas>
      
      <header className="header">
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home">
          <h1>Joe Wicorek</h1>
          <h2>Software Engineer</h2>
        </section>
      </main>

      <footer>
        <p>© 2024 Joe Wicorek</p>
      </footer>
    </div>
  );
}
