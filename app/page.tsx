'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import BackgroundCanvas from './components/BackgroundCanvas';

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="container">
      <LoadingScreen />
      <BackgroundCanvas />
      <Header />
      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <h1 data-aos="fade-up">Your Name</h1>
            <p data-aos="fade-up" data-aos-delay="200">
              Software Engineer | Web Developer | Creative Technologist
            </p>
          </div>
        </section>

        <section id="about" className="about">
          <h2 data-aos="fade-up">About Me</h2>
          <div className="about-content" data-aos="fade-up" data-aos-delay="200">
            <p>
              Passionate developer with expertise in creating innovative web solutions. 
              Combining technical skills with creative problem-solving to build 
              exceptional digital experiences.
            </p>
          </div>
        </section>

        <section id="projects" className="projects">
          <h2 data-aos="fade-up">Projects</h2>
          <div className="project-grid">
            <div className="project-card" data-aos="fade-up">
              <h3>Project 1</h3>
              <p>Description of your project</p>
            </div>
            <div className="project-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Project 2</h3>
              <p>Description of your project</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2 data-aos="fade-up">Contact Me</h2>
          <div className="contact-form" data-aos="fade-up" data-aos-delay="200">
            <form>
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Your Name. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
