import { useEffect, useState } from 'react';
import './Hero.css';

const TYPING_WORDS = ['DEVELOPER', 'DESIGNER', 'EDITOR'];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const randomTail = (length: number) => {
  return Array.from({ length }, () => {
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }).join('');
};

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [scrambleSteps, setScrambleSteps] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    let delay = 95;

    if (isDeleting) {
      delay = typedLength === 0 ? 260 : 55;
    } else if (typedLength === currentWord.length) {
      delay = 950;
    } else if (scrambleSteps < 3) {
      delay = 35;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedLength === currentWord.length) {
          setDisplayText(currentWord);
          setIsDeleting(true);
          return;
        }

        if (scrambleSteps < 3) {
          const fixedPart = currentWord.slice(0, typedLength);
          const scrambledPart = randomTail(1);
          setDisplayText(fixedPart + scrambledPart);
          setScrambleSteps((prev) => prev + 1);
          return;
        }

        const nextLength = typedLength + 1;
        setTypedLength(nextLength);
        setScrambleSteps(0);
        setDisplayText(currentWord.slice(0, nextLength));
        return;
      }

      if (typedLength === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        setScrambleSteps(0);
        setDisplayText('');
        return;
      }

      const nextLength = typedLength - 1;
      setTypedLength(nextLength);
      setScrambleSteps(0);
      setDisplayText(currentWord.slice(0, nextLength));
    }, delay);

    return () => clearTimeout(timer);
  }, [isDeleting, typedLength, scrambleSteps, wordIndex]);

  return (
    <section id="hero">
      <div className="hero-left-intro reveal-up" style={{ animationDelay: '0.3s' }}>
        <div className="hero-left-label">I'm a</div>
        <h2 className="hero-left-typing">
          <span className="hero-typed-word">{displayText}</span>
          <span className="typing-cursor">|</span>
        </h2>
      </div>

      <div className="hero-main-row">
        <div className="hero-text reveal-left" style={{ animationDelay: '0.5s' }}>
          <div className="hero-tags reveal-up" style={{ animationDelay: '0.6s' }}>
            <span className="hero-tag">Web Developer</span>
            <span className="hero-tag">Video Editor</span>
            <span className="hero-tag">Graphic Designer</span>
          </div>

         

          <p className="hero-desc reveal-up" style={{ animationDelay: '0.7s' }}>
            A versatile Fullstack Generalist blending robust engineering with creative vision. From server architectures and intuitive UI/UX to cinematography and video editing, I build complete, end-to-end digital experiences
          </p>

          <a href="#contact" className="btn-contact reveal-up" style={{ animationDelay: '0.8s' }}>Contact Me</a>
        </div>

        <div className="hero-side-panel reveal-right" style={{ animationDelay: '0.6s' }}>
          <div className="hero-stats">
            <div className="stat-block reveal-scale" style={{ animationDelay: '0.7s' }}>
              <div className="stat-lbl">Years Of Experience</div>
              <div className="stat-box">1+</div>
            </div>
            <div className="stat-block reveal-scale" style={{ animationDelay: '0.8s' }}>
              <div className="stat-lbl">Finished Projects</div>
              <div className="stat-box">10+</div>
            </div>
            <div className="stat-block reveal-scale" style={{ animationDelay: '0.9s' }}>
              <div className="stat-lbl">Happy Clients</div>
              <div className="stat-box">5+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
