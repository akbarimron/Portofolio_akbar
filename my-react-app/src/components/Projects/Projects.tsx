import { useEffect, useState } from 'react';
import { setupScrollReveal } from '../../utils/animations';
import './Projects.css';

// Import project images
import ukmibafupiImg from '../../assets/project_assets/UKMIBAFUPI.png';
import animatedTwibbonVideo from '../../assets/project_assets/animatedTwibbon.mp4';

// Map project identifier to image
const projectImageMap: Record<string, string> = {
  'UKM IBAF UPI': ukmibafupiImg,
};

// Map project identifier to video
const projectVideoMap: Record<string, string> = {
  'Animated Twibbon OLKA UPI 2025': animatedTwibbonVideo,
};

const getProjectImage = (imageUrl?: string, title?: string): string | undefined => {
  if (title && projectImageMap[title]) {
    return projectImageMap[title];
  }
  return imageUrl;
};

const getProjectVideo = (videoUrl?: string, title?: string): string | undefined => {
  if (title && projectVideoMap[title]) {
    return projectVideoMap[title];
  }
  return videoUrl;
};

const useVideoThumbnail = (videoUrl?: string, seekTime = 0.8) => {
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    if (!videoUrl) {
      return;
    }

    let cancelled = false;
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.src = videoUrl;

    const cleanup = () => {
      video.removeAttribute('src');
      video.load();
    };

    const captureFrame = () => {
      if (cancelled || video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (!context) {
        return;
      }

      try {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnail(canvas.toDataURL('image/jpeg', 0.78));
      } catch {
        setThumbnail('');
      }
    };

    const handleLoadedMetadata = () => {
      if (cancelled) {
        return;
      }

      const safeDuration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
      const targetTime = Math.min(Math.max(seekTime, 0.1), Math.max(safeDuration - 0.1, 0.1));

      try {
        video.currentTime = targetTime;
      } catch {
        captureFrame();
      }
    };

    const handleSeeked = () => {
      captureFrame();
    };

    const handleError = () => {
      if (!cancelled) {
        setThumbnail('');
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
      cleanup();
    };
  }, [seekTime, videoUrl]);

  return thumbnail;
};

interface ProjectItem {
  id: number;
  title: string;
  desc: string;
  detail?: string;
  visitUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  showVisitButton?: boolean;
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
  videoPreviewEnabled?: boolean;
  animationDelay?: string;
  onOpenDetails: () => void;
}

const ProjectCard = ({
  title,
  desc,
  tags,
  bgGradient,
  isVideo,
  videoPreviewEnabled = true,
  animationDelay,
  onOpenDetails,
  imageUrl,
  videoUrl,
}: ProjectCardProps) => {
  const resolvedImage = getProjectImage(imageUrl, title);
  const resolvedVideo = getProjectVideo(videoUrl, title);
  const resolvedVideoPoster = useVideoThumbnail(isVideo ? resolvedVideo : undefined);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpenDetails();
    }
  };

  return (
    <div
      className="pcard reveal-scale"
      style={animationDelay ? { animationDelay } : undefined}
      onClick={onOpenDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${title}`}
    >
      <div className="pthumb" style={{ background: bgGradient }}>
        <div className="pthumb-ov"></div>
        {!isVideo && (
          <div className="pthumb-bar">
            <div className="pthumb-dot"></div>
            <div className="pthumb-dot"></div>
            <div className="pthumb-dot"></div>
          </div>
        )}
        {isVideo ? <div className="play-circle">▶</div> : null}
        {resolvedImage && !isVideo && (
          <img src={resolvedImage} alt={title} className="pthumb-img" />
        )}
        {isVideo && resolvedVideo && videoPreviewEnabled && (
          <video
            className="pthumb-video"
            src={resolvedVideo}
            poster={resolvedVideoPoster || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        {isVideo && (
          <div
            className="pthumb-fallback"
            style={{ backgroundImage: resolvedVideoPoster ? `url(${resolvedVideoPoster})` : undefined, display: !videoPreviewEnabled || !resolvedVideo ? 'block' : 'none' }}
          />
        )}
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
  const [activeProject, setActiveProject] = useState<(ProjectItem & { isVideo: boolean; sectionId: string }) | null>(null);
  const [videoPreviewEnabled, setVideoPreviewEnabled] = useState<Record<string, boolean>>({ video: true });

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

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
    };
  }, [activeProject]);

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
              <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <div className="proj-sec-h reveal-left" style={{ animationDelay: `${section.animationDelay}s` }}>
                    {section.title}
                  </div>
                  <div className="proj-sec-sub reveal-left" style={{ animationDelay: `${section.animationDelay + 0.05}s` }}>
                    {section.subtitle}
                  </div>
                </div>
                {section.isVideo && (
                  <label className="video-preview-toggle" style={{ marginLeft: 'auto' }}>
                    <input
                      type="checkbox"
                      checked={videoPreviewEnabled[section.id] ?? true}
                      onChange={(e) =>
                        setVideoPreviewEnabled((prev) => ({
                          ...prev,
                          [section.id]: e.target.checked,
                        }))
                      }
                      aria-label="Toggle video preview"
                    />
                    <span className="toggle-label">{videoPreviewEnabled[section.id] ?? true ? 'Preview On' : 'Preview Off'}</span>
                  </label>
                )}
              </div>

              <div className="pgrid">
                {visibleProjects.map((project, index) => (
                  <ProjectCard 
                    key={`${section.id}-${project.id}`} 
                    {...project} 
                    isVideo={section.isVideo}
                    videoPreviewEnabled={videoPreviewEnabled[section.id] ?? true}
                    animationDelay={`${section.animationDelay + 0.1 + index * 0.08}s`}
                    onOpenDetails={() => setActiveProject({ ...project, isVideo: section.isVideo, sectionId: section.id })}
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
                        videoPreviewEnabled={videoPreviewEnabled[section.id] ?? true}
                        onOpenDetails={() => setActiveProject({ ...project, isVideo: section.isVideo, sectionId: section.id })}
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

      {activeProject && (
        <div className="project-modal-overlay" onClick={() => setActiveProject(null)}>
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.title} detail`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="project-modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close detail popup"
            >
              ×
            </button>

            <div className="project-modal-head" style={{ background: activeProject.bgGradient }}>
              {activeProject.isVideo ? (
                getProjectVideo(activeProject.videoUrl, activeProject.title) ? (
                  <video
                    className="project-modal-video"
                    controls
                    preload="metadata"
                    src={getProjectVideo(activeProject.videoUrl, activeProject.title)}
                  />
                ) : (
                  <div className="project-modal-fallback">Video source belum ditambahkan</div>
                )
              ) : getProjectImage(activeProject.imageUrl, activeProject.title) ? (
                <img src={getProjectImage(activeProject.imageUrl, activeProject.title)!} alt={activeProject.title} className="project-modal-image" />
              ) : (
                <div className="project-modal-preview">{activeProject.title}</div>
              )}
            </div>

            <div className="project-modal-body">
              <h3>{activeProject.title}</h3>
              <p>{activeProject.detail ?? activeProject.desc}</p>

              <div className="project-modal-tags">
                {activeProject.tags.map((tag) => (
                  <span key={`${activeProject.id}-${tag}`}>{tag}</span>
                ))}
              </div>

              {activeProject.showVisitButton !== false && (
                <div className="project-modal-actions">
                  {activeProject.visitUrl ? (
                    <a href={activeProject.visitUrl} target="_blank" rel="noreferrer">
                      {activeProject.isVideo ? 'Kunjungi Link' : 'Visit Project'}
                    </a>
                  ) : (
                    <button type="button" disabled>
                      Visit Unavailable
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
