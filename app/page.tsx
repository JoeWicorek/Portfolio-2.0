'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import BackgroundCanvas from './components/BackgroundCanvas';

export default function Home() {
  useEffect(() => {
    // Ensure iframe content is loaded after component mounts
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = '/index.html';
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe 
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          display: 'block' // Prevents unwanted spacing
        }} 
      />
    </div>
  );
}
