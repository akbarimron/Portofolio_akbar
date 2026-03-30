import './Hero.css';
import bgImage from '../../assets/bg gw.png';

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-photo-col">
        <div className="hero-photo-box" style={{ backgroundImage: `url(${bgImage})` }}></div>
      </div>

      <div className="hero-text">
        <div className="hero-tags">
          <span className="hero-tag">Web Developer</span>
          <span className="hero-tag">Video Editor</span>
          <span className="hero-tag">Graphic Designer</span>
        </div>

        <h1 className="hero-name">Akbar <em>Imron</em></h1>

        <p className="hero-desc">
          A versatile Fullstack Generalist blending robust engineering with creative vision. From server architectures and intuitive UI/UX to cinematography and video editing, I build complete, end-to-end digital experiences
        </p>

        <a href="#contact" className="btn-contact">Contact Me</a>

        <div className="hero-stats">
          <div className="stat-block">
            <div className="stat-lbl">Years Of Experience</div>
            <div className="stat-box">1+</div>
          </div>
          <div className="stat-block">
            <div className="stat-lbl">Finished Projects</div>
            <div className="stat-box">10+</div>
          </div>
          <div className="stat-block">
            <div className="stat-lbl">Happy Clients</div>
            <div className="stat-box">5+</div>
          </div>
        </div>
      </div>
    </section>
  );
}
