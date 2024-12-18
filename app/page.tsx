'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import BackgroundCanvas from './components/BackgroundCanvas';

export default function Home() {
  return (
    <div>
      <iframe 
        src="/index.html" 
        style={{ 
          width: '100%', 
          height: '100vh', 
          border: 'none' 
        }} 
      />
    </div>
  );
}
