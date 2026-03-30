export const COLORS = {
  bg: '#12111f',
  bg2: '#1a1830',
  card: '#1e1d30',
  card2: '#252342',
  border: 'rgba(120,110,200,0.2)',
  purple: '#7c6fcd',
  purple2: '#9d8fe0',
  white: '#ffffff',
  gray: '#9898b0',
  gray2: '#c5c5d8',
  text: '#e2e2f0',
};

export const CODE_SNIPPETS = [
  `function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, cam);
}`,
  `const cube = new THREE.Mesh(
  new BoxGeometry(1,1,1),
  new MeshStandardMaterial()
);`,
  `@keyframes spin {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(360deg); }
}`,
  `Route::get('/portfolio', [
  PortfolioController::class,
  'index'
]);`,
  `SELECT * FROM projects
WHERE status='done'
ORDER BY year DESC;`,
  `$primary: #7c6fcd;
.hero h1 {
  font-size: 3rem;
  color: $primary;
}`,
  `gsap.from('.hero', {
  opacity:0, y:40,
  duration:1, ease:'power3'
});`,
  `ffmpeg -i input.mp4
  -vf "scale=1920:1080"
  output.mp4`,
  `layer.addEffect(new VFX({
  type: 'lightning',
  intensity: 0.85
}));`,
];

export const TOOLS_TECH = [
  { name: 'After Effect', category: 'design' },
  { name: 'Illustrator', category: 'design' },
  { name: 'Figma', category: 'design' },
  { name: 'Blender', category: 'design' },
  { name: 'Visual Studio', category: 'dev' },
  { name: 'Unity', category: 'dev' },
  { name: 'Android Studio', category: 'dev' },
  { name: 'Laravel', category: 'dev' },
  { name: 'Flutter', category: 'dev' },
  { name: 'Firebase', category: 'dev' },
  { name: 'Github', category: 'dev' },
  { name: 'SQL', category: 'dev' },
  { name: 'React', category: 'dev' },
];

export const WEB_PROJECTS = [
  {
    id: 1,
    title: 'UKM IBAF UPI',
    desc: 'Looking for a partner for your next digital project? Let\'s collaborate and build',
    tags: ['React', 'Firebase', 'Bootstrap'],
    icon: '🏛️',
    bgGradient: 'linear-gradient(135deg,#0e2040,#1a3264)',
  },
  {
    id: 2,
    title: 'GYM UPI',
    desc: 'Looking for a partner for your next digital project? Let\'s collaborate and build',
    tags: ['Laravel', 'Firebase', 'Bootstrap'],
    icon: '🏋️',
    bgGradient: 'linear-gradient(135deg,#181050,#261870)',
  },
  {
    id: 3,
    title: 'GYM UPI',
    desc: 'Looking for a partner for your next digital project? Let\'s collaborate and build',
    tags: ['Laravel', 'Firebase', 'Bootstrap'],
    icon: '🏋️',
    bgGradient: 'linear-gradient(135deg,#0c1c38,#163058)',
  },
  {
    id: 4,
    title: 'Working Login Page',
    desc: 'Full-stack login with PHP & MySQL database authentication.',
    tags: ['PHP', 'MySQL', 'CSS'],
    icon: '🔐',
    bgGradient: 'linear-gradient(135deg,#200d3a,#301460)',
    hidden: true,
  },
  {
    id: 5,
    title: 'Simple Counter',
    desc: 'Interactive counter website with vanilla JavaScript.',
    tags: ['HTML', 'CSS', 'JS'],
    icon: '🧮',
    bgGradient: 'linear-gradient(135deg,#102030,#1c3048)',
    hidden: true,
  },
];

export const VIDEO_PROJECTS = [
  {
    id: 1,
    title: '3D Asrama UPI',
    desc: 'Looking for a partner for your next digital project? Let\'s collaborate and build',
    tags: ['Blender'],
    bgGradient: 'linear-gradient(135deg,#1a0538,#300860)',
    isVideo: true,
  },
  {
    id: 2,
    title: 'Teaser OLKA UPI 2025',
    desc: 'Looking for a partner for your next digital project? Let\'s collaborate and build',
    tags: ['After Effect'],
    bgGradient: 'linear-gradient(135deg,#0a1535,#18255a)',
    isVideo: true,
  },
  {
    id: 3,
    title: 'Teaser OLKA UPI 2025',
    desc: 'Looking for a partner for your next digital project? Let\'s collaborate and build',
    tags: ['After Effect'],
    bgGradient: 'linear-gradient(135deg,#1e0830,#36104e)',
    isVideo: true,
  },
  {
    id: 4,
    title: 'Aftermovie OLKA Asrama',
    desc: 'Full aftermovie with cinematic color grade and VFX.',
    tags: ['After Effect', 'Premiere Pro'],
    bgGradient: 'linear-gradient(135deg,#100830,#201450)',
    isVideo: true,
    hidden: true,
  },
  {
    id: 5,
    title: 'Aftermovie BAKSA Asrama',
    desc: 'Event documentation with dynamic transitions.',
    tags: ['Premiere Pro'],
    bgGradient: 'linear-gradient(135deg,#0e1c38,#182848)',
    isVideo: true,
    hidden: true,
  },
  {
    id: 6,
    title: 'VFX Editing Showcase',
    desc: 'Lightning, blood FX, and 3D compositing demo.',
    tags: ['After Effect', 'VFX'],
    bgGradient: 'linear-gradient(135deg,#200a18,#3a1030)',
    isVideo: true,
    hidden: true,
  },
];

export const ABOUT_CARDS = [
  {
    id: 1,
    title: 'Video Editor',
    desc: 'Specialized in post-production for promotional and digital content. Expert in Adobe Premiere Pro and After Effects, delivering high-quality motion graphics and VFX.',
    icon: 'video',
  },
  {
    id: 2,
    title: 'Graphic Designer',
    desc: 'Adept at transforming ideas into captivating visual designs, including logo creation, vector art, marketing collateral, and social media assets.',
    icon: 'info',
  },
  {
    id: 3,
    title: 'Web Developer',
    desc: 'Focused on developing dynamic and scalable web applications. Proficient in modern full-stack technologies, primarily utilizing React, Next.js, Laravel, and Firebase.',
    icon: 'code',
  },
  {
    id: 4,
    title: 'Education',
    desc: 'Undergraduate student in Computer Science Education at Universitas Pendidikan Indonesia (UPI), driven by a strong passion for integrating creative design with software engineering.',
    icon: 'book',
  },
];
