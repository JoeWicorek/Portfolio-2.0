'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  useEffect(() => {
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
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-animation">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
