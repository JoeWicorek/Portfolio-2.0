'use client';

import { useEffect } from 'react';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    // Import external scripts
    const loadScripts = async () => {
      // Dynamic script loading
      const gsap = await import('gsap');
      const ScrollTrigger = await import('gsap/ScrollTrigger');
      const SplitType = await import('split-type');
      const AOS = await import('aos');
      const VanillaTilt = await import('vanilla-tilt');

      // Initialize libraries
      gsap.default.registerPlugin(ScrollTrigger.ScrollTrigger);
      AOS.default.init();
    };

    loadScripts();
  }, []);

  return (
    <div className="container">
      <LoadingScreen />
      <div className="mouse-trailer"></div>
      <div className="cursor-dot"></div>
      <div className="cursor-outline"></div>
      <canvas id="gradient-canvas"></canvas>
      <div className="cursor"></div>
      <div className="cursor-follower"></div>
      <div className="noise"></div>
      <div className="background-gradient"></div>

      <Header />
      <main>
        <Hero />
        <Experience />
        {/* Add other sections as components */}
      </main>
      <Footer />
    </div>
  );
}
