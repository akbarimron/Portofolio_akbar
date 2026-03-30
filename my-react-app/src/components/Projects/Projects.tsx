import { useState } from 'react';
import { WEB_PROJECTS, VIDEO_PROJECTS } from '../../utils/constants';
import './Projects.css';

interface ProjectCardProps {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  icon?: string;
  bgGradient: string;
  isVideo?: boolean;
  hidden?: boolean;
}

const ProjectCard = ({ title, desc, tags, icon, bgGradient, isVideo, hidden }: ProjectCardProps) => {
  return (
    <div className="pcard" style={hidden ? { display: 'none' } : {}}>
      <div className="pthumb" style={{ background: bgGradient }}>
        <div className="pthumb-ov"></div>
        {!isVideo && (
          <div className="pthumb-bar">
            <div className="pthumb-dot"></div>
            <div className="pthumb-dot"></div>
            <div className="pthumb-dot"></div>
          </div>
        )}
        {isVideo ? (
          <div className="play-circle">▶</div>
        ) : null}
      </div>
      <div className="pbody">
        <div className="ptitle">{title}</div>
        <div className="pdesc">{desc}</div>
        <div className="ptags">
          {tags.map((tag) => (
            <span key={tag} className="ptag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [webMoreVisible, setWebMoreVisible] = useState(false);
  const [videoMoreVisible, setVideoMoreVisible] = useState(false);

  const toggleWebMore = () => setWebMoreVisible(!webMoreVisible);
  const toggleVideoMore = () => setVideoMoreVisible(!videoMoreVisible);

  return (
    <section id="projects">
      <div className="sw center reveal">
        <h2 className="proj-main-h">My <em>Projects</em></h2>
        <p className="proj-main-sub">A collection of projects showcasing my expertise in video editing, graphic design, and web development</p>

        {/* WEB SECTION */}
        <div style={{ textAlign: 'left' }}>
          <div className="proj-sec-h">Web Projects</div>
          <div className="proj-sec-sub">Some of my best Web Projects</div>
        </div>

        <div className="pgrid">
          {WEB_PROJECTS.filter((p) => !p.hidden).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <div className="pgrid" style={{ display: webMoreVisible ? 'grid' : 'none', marginTop: '18px' }}>
          {WEB_PROJECTS.filter((p) => p.hidden).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        <div className="see-more-wrap">
          <button className="see-more-btn" onClick={toggleWebMore}>
            <span>{webMoreVisible ? '∧ See Less' : '∨ See More'}</span>
          </button>
        </div>

        {/* VIDEO SECTION */}
        <div style={{ textAlign: 'left' }}>
          <div className="proj-sec-h">Video Projects</div>
          <div className="proj-sec-sub">Some of my best Video Projects</div>
        </div>

        <div className="pgrid">
          {VIDEO_PROJECTS.filter((p) => !p.hidden).map((project) => (
            <ProjectCard key={project.id} {...project} isVideo={true} bgGradient={project.bgGradient} />
          ))}
        </div>

        <div className="pgrid" style={{ display: videoMoreVisible ? 'grid' : 'none', marginTop: '18px' }}>
          {VIDEO_PROJECTS.filter((p) => p.hidden).map((project) => (
            <ProjectCard key={project.id} {...project} isVideo={true} bgGradient={project.bgGradient} />
          ))}
        </div>

        <div className="see-more-wrap">
          <button className="see-more-btn" onClick={toggleVideoMore}>
            <span>{videoMoreVisible ? '∧ See Less' : '∨ See More'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
