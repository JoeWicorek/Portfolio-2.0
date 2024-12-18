'use client';

export default function Footer() {
  return (
    <footer>
      <div className="social-links">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:your.email@example.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <p>© 2024 Joseph Wicorek. All rights reserved.</p>
    </footer>
  );
}
