import { useEffect, useState } from 'react';
import { setupScrollReveal } from '../../utils/animations';
import './Projects.css';

interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  bgGradient: string;
  hidden: boolean;
}

interface ProjectSection {
  id: string;
  title: string;
  subtitle: string;
  animationDelay: number;
  moreButtonDelay: number;
  isVideo: boolean;
  projects: ProjectItem[];
}

interface ProjectsData {
  sections: ProjectSection[];
}

interface ProjectCardProps extends ProjectItem {
  isVideo: boolean;
  animationDelay?: string;
}

const ProjectCard = ({ title, desc, tags, bgGradient, isVideo, animationDelay }: ProjectCardProps) => {
  return (
    <div className="pcard reveal-scale" style={animationDelay ? { animationDelay } : undefined}>
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
  const [sections, setSections] = useState<ProjectSection[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [animatingOut, setAnimatingOut] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const fetchUrl = `${import.meta.env.BASE_URL}projects.json`;
        console.log('Fetching from:', fetchUrl);
        const response = await fetch(fetchUrl);
        console.log('Response status:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error(`Failed: ${response.status} ${response.statusText}`);
        }
        const data: ProjectsData = await response.json();
        console.log('Parsed data:', data, 'sections:', data.sections?.length);
        setSections(data.sections ?? []);
        setLoadError('');
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error('Load error:', msg);
        setSections([]);
        setLoadError(msg);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjects();
  }, []);

  // Debug effect to log state
  useEffect(() => {
    sections.forEach((s) => {
      const visible = s.projects.filter((p) => !p.hidden).length;
      console.log(`${s.id}: ${visible} visible projects`);
    });
  }, [sections]);

  // Re-setup observer after projects render
  useEffect(() => {
    if (sections.length > 0) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        setupScrollReveal();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [sections]);

  // Re-observe when expanding/collapsing
  useEffect(() => {
    const timer = setTimeout(() => {
      setupScrollReveal();
    }, 400); // After animation completes
    return () => clearTimeout(timer);
  }, [expandedSections]);

  const toggleSection = (sectionId: string) => {
    const isCurrentlyExpanded = expandedSections[sectionId] ?? false;
    
    if (isCurrentlyExpanded) {
      // Closing - trigger pop out animation first
      setAnimatingOut((prev) => ({ ...prev, [sectionId]: true }));
      setTimeout(() => {
        setExpandedSections((prev) => ({
          ...prev,
          [sectionId]: false,
        }));
        setAnimatingOut((prev) => ({ ...prev, [sectionId]: false }));
      }, 300); // Duration of pop out animation
    } else {
      // Opening - expand immediately, animation will trigger on render
      setExpandedSections((prev) => ({
        ...prev,
        [sectionId]: true,
      }));
    }
  };

  return (
    <section id="projects">
      <div className="sw center">
        <h2 className="proj-main-h reveal-up">My <em>Projects</em></h2>
        <p className="proj-main-sub reveal-up" style={{ animationDelay: '0.1s' }}>A collection of projects showcasing my expertise in video editing, graphic design, and web development</p>

        {isLoading && <p className="proj-main-sub">Loading projects...</p>}
        {!isLoading && loadError && <p className="proj-main-sub" style={{ color: '#ff6b6b' }}>{loadError}</p>}
        {!isLoading && !loadError && sections.length === 0 && <p className="proj-main-sub">No projects found</p>}
        {!isLoading && !loadError && sections && sections.length > 0 && sections.map((section) => {
          const visibleProjects = section.projects.filter((p) => !p.hidden);
          const hiddenProjects = section.projects.filter((p) => p.hidden);
          const isExpanded = expandedSections[section.id] ?? false;

          return (
            <div key={section.id}>
              <div style={{ textAlign: 'left' }}>
                <div className="proj-sec-h reveal-left" style={{ animationDelay: `${section.animationDelay}s` }}>
                  {section.title}
                </div>
                <div className="proj-sec-sub reveal-left" style={{ animationDelay: `${section.animationDelay + 0.05}s` }}>
                  {section.subtitle}
                </div>
              </div>

              <div className="pgrid">
                {visibleProjects.map((project, index) => (
                  <ProjectCard 
                    key={`${section.id}-${project.id}`} 
                    {...project} 
                    isVideo={section.isVideo}
                    animationDelay={`${section.animationDelay + 0.1 + index * 0.08}s`}
                  />
                ))}
              </div>

              {isExpanded && (
                <div className={`pgrid pgrid-expanded ${animatingOut[section.id] ? 'pop-out' : 'pop-in'}`} style={{ marginTop: '18px' }}>
                  {hiddenProjects.map((project, index) => (
                    <div key={`${section.id}-${project.id}-hidden`} style={{ '--card-delay': `${0.05 + index * 0.08}s` } as React.CSSProperties}>
                      <ProjectCard 
                        {...project} 
                        isVideo={section.isVideo}
                      />
                    </div>
                  ))}
                </div>
              )}

              {hiddenProjects.length > 0 && (
                <div className="see-more-wrap">
                  <button
                    className="see-more-btn reveal-up"
                    onClick={() => toggleSection(section.id)}
                    style={{ animationDelay: `${section.moreButtonDelay}s` }}
                  >
                    <span>{isExpanded ? 'See Less' : 'See More'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
