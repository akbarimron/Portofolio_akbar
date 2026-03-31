import { useState, useEffect } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-logo">Akbar Imron</div>

      <button
        className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#who" onClick={closeMenu}>About</a></li>
        <li><a href="#projects" onClick={closeMenu}>Project</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact Me</a></li>
      </ul>
    </nav>
  );
}
