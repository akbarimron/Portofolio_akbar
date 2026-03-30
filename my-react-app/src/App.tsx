import { useEffect } from 'react';
import './styles/global.css';
import './App.css';

import Background from './components/Background/Background';
import FloatingCode from './components/Background/FloatingCode';
import Navigation from './components/Navigation/Navigation';
import SocialBar from './components/SocialBar/SocialBar';
import Hero from './components/Hero/Hero';
import Who from './components/Who/Who';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import { setupScrollReveal, setupNavScroll } from './utils/animations';

function App() {
  useEffect(() => {
    // Setup scroll reveal animations
    setupScrollReveal();
    // Setup nav scroll effect
    setupNavScroll();
  }, []);

  return (
    <>
      <Background />
      <FloatingCode />
      <Navigation />
      <SocialBar />

      <Hero />
      <Who />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
