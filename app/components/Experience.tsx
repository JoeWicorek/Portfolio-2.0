'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Experience() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <section id="experience" className="experience-section">
      <h2>Experience</h2>
      <div className="experience-grid">
        <div className="experience-card" data-aos="fade-up">
          <h3>Software Engineer</h3>
          <p className="company">Tech Innovations Inc.</p>
          <p className="duration">Jan 2022 - Present</p>
          <ul>
            <li>Developed scalable web applications</li>
            <li>Implemented advanced frontend solutions</li>
            <li>Collaborated with cross-functional teams</li>
          </ul>
        </div>
        <div className="experience-card" data-aos="fade-up" data-aos-delay="200">
          <h3>Frontend Developer</h3>
          <p className="company">Digital Solutions LLC</p>
          <p className="duration">Jun 2020 - Dec 2021</p>
          <ul>
            <li>Created responsive design interfaces</li>
            <li>Optimized web performance</li>
            <li>Mentored junior developers</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
