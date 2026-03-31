import './Who.css';
import bgImage from '../../assets/bg gw.png';

export default function Who() {
  return (
    <section id="who">
      <div className="sw">
        <div className="who-grid reveal-up">
          <div className="who-text reveal-left">
            <h2 className="who-title reveal-up" style={{ animationDelay: '0.1s' }}>Hello, I'm <br></br><em>Muhamad Akbar Imron</em></h2>
            <div className="who-line reveal-up" style={{ animationDelay: '0.2s' }}></div>
            <p className="reveal-up" style={{ animationDelay: '0.3s' }}>
              an undergraduate studying Computer Science Education at <span className="hl">Universitas Pendidikan Indonesia (UPI), Bandung</span>. I am driven by a passion for crafting innovative, high-quality solutions across visual design, video production, and web development.
            </p>
            <p className="reveal-up" style={{ animationDelay: '0.4s' }}>
              I firmly believe that the <span className="hl2">intersection of creativity and technology</span> is essential for delivering digital experiences that are both visually compelling and highly functional. Leveraging my background in <span className="hl2">video editing, graphic design, and web development,</span> I am ready to transform complex ideas into impactful, real-world results
            </p>
          </div>
          <div className="who-photo reveal-right" style={{ animationDelay: '0.2s' }}>
            <img src={bgImage} alt="Akbar Imron" className="who-photo-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
