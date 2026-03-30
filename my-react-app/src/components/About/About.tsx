import { TOOLS_TECH, ABOUT_CARDS } from '../../utils/constants';
import './About.css';

const IconComponent = ({ type }: { type: string }) => {
  const icons = {
    video: (
      <svg viewBox="0 0 24 24">
        <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.35V16l7 3.82 7-3.82v-3.65L12 16l-7-3.65z" />
      </svg>
    ),
  };
  return icons[type as keyof typeof icons] || null;
};

export default function About() {
  return (
    <section id="about">
      <div className="sw center reveal">
        <h2 className="about-h">About <em>Me</em></h2>
        <p className="about-sub">I believe that creativity and technology are the keys to delivering engaging and functional visual solutions for every client</p>

        <div className="about-cards">
          {ABOUT_CARDS.map((card) => (
            <div key={card.id} className="acard">
              <div className="acard-icon">
                <IconComponent type={card.icon} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="tools-h">Tools and Technology</div>
        <div className="tools-row">
          {TOOLS_TECH.slice(0, 7).map((tool) => (
            <span key={tool.name} className="tchip">
              {tool.name}
            </span>
          ))}
        </div>
        <div className="tools-row" style={{ marginTop: '10px' }}>
          {TOOLS_TECH.slice(7).map((tool) => (
            <span key={tool.name} className="tchip">
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
