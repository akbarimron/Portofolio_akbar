export const setupScrollReveal = () => {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay for multiple elements
          const staggerDelay = (entry.target as HTMLElement).getAttribute('data-stagger');
          if (staggerDelay) {
            (entry.target as HTMLElement).style.animationDelay = `${parseFloat(staggerDelay) * index}ms`;
          }
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Observe all reveal elements and variations
  document.querySelectorAll('.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .reveal-parallax').forEach((el) => {
    obs.observe(el);
  });
};

// Enhanced scroll reveal with parallax effect
export const setupParallaxScroll = () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;

  const handleParallax = () => {
    parallaxElements.forEach((el) => {
      const element = el as HTMLElement;
      const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
      const scrollPosition = window.scrollY;
      const elementOffset = element.getBoundingClientRect().top + scrollPosition;
      const distance = scrollPosition - elementOffset;
      
      element.style.transform = `translateY(${distance * speed}px)`;
    });
  };

  window.addEventListener('scroll', handleParallax, { passive: true });
  return () => window.removeEventListener('scroll', handleParallax);
};

// Setup scroll animations with observer
export const setupAdvancedScrollAnimations = () => {
  setupScrollReveal();
  setupParallaxScroll();
};

export const setupNavScroll = () => {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.background =
        window.scrollY > 30
          ? 'rgba(18,17,31,0.98)'
          : 'rgba(18,17,31,0.93)';
    }
  });
};

export const toggleMore = (id: string, txtId: string) => {
  const grid = document.getElementById(id);
  const txt = document.getElementById(txtId);

  if (grid && txt) {
    const isHidden = grid.style.display === 'none';
    grid.style.display = isHidden ? 'grid' : 'none';
    txt.textContent = isHidden ? '∨ See More' : '∧ See Less';
  }
};

export const sendMessage = (btn: HTMLButtonElement) => {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 3000);
};

// 3D Cube helpers
const rotateX = (p: any, a: number) => ({
  x: p.x,
  y: p.y * Math.cos(a) - p.z * Math.sin(a),
  z: p.y * Math.sin(a) + p.z * Math.cos(a),
});

const rotateY = (p: any, a: number) => ({
  x: p.x * Math.cos(a) + p.z * Math.sin(a),
  y: p.y,
  z: -p.x * Math.sin(a) + p.z * Math.cos(a),
});

const rotateZ = (p: any, a: number) => ({
  x: p.x * Math.cos(a) - p.y * Math.sin(a),
  y: p.x * Math.sin(a) + p.y * Math.cos(a),
  z: p.z,
});

const project = (x: number, y: number, z: number, cx: number, cy: number, f: number) => {
  const s = f / (f + z);
  return { x: cx + x * s, y: cy + y * s };
};

const VERTICES = [
  { x: -1, y: -1, z: -1 },
  { x: 1, y: -1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 },
  { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 1, z: 1 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

export interface CubeObj {
  x: number;
  y: number;
  sz: number;
  rx: number;
  ry: number;
  rz: number;
  drx: number;
  dry: number;
  drz: number;
  vy: number;
  al: number;
  col: string;
}

export const createCube = (W: number, H: number): CubeObj => {
  const side = Math.random() < 0.5 ? -1 : 1;
  return {
    x: (Math.random() * W * 0.35 + W * 0.06) * side + W / 2,
    y: Math.random() * H,
    sz: 16 + Math.random() * 52,
    rx: Math.random() * Math.PI * 2,
    ry: Math.random() * Math.PI * 2,
    rz: Math.random() * Math.PI * 2,
    drx: (Math.random() - 0.5) * 0.007,
    dry: (Math.random() - 0.5) * 0.009,
    drz: (Math.random() - 0.5) * 0.005,
    vy: -0.1 - Math.random() * 0.2,
    al: 0.06 + Math.random() * 0.15,
    col: ['#7c6fcd', '#5db8d4', '#a46fd4', '#4ea8cf'][0 | Math.random() * 4],
  };
};

export const drawCube = (
  ctx: CanvasRenderingContext2D,
  cube: CubeObj,
  mx: number,
  my: number
) => {
  const verts = VERTICES.map((v) => {
    let p = {
      x: v.x * cube.sz,
      y: v.y * cube.sz,
      z: v.z * cube.sz,
    };
    p = rotateX(p, cube.rx + my * 0.12);
    p = rotateY(p, cube.ry + mx * 0.12);
    p = rotateZ(p, cube.rz);
    return project(p.x, p.y, p.z + 300, cube.x, cube.y, 400);
  });

  ctx.save();
  ctx.globalAlpha = cube.al;
  ctx.strokeStyle = cube.col;
  ctx.lineWidth = 0.9;
  ctx.shadowBlur = 7;
  ctx.shadowColor = cube.col;

  EDGES.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(verts[a].x, verts[a].y);
    ctx.lineTo(verts[b].x, verts[b].y);
    ctx.stroke();
  });

  ctx.restore();
};

export interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  al: number;
  col: string;
}

export const createParticle = (W: number, H: number): Particle => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: 0.8 + Math.random() * 1.8,
  vx: (Math.random() - 0.5) * 0.35,
  vy: (Math.random() - 0.5) * 0.35,
  al: 0.12 + Math.random() * 0.28,
  col: Math.random() < 0.7 ? '#7c6fcd' : '#4fb8cc',
});

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number
) => {
  ctx.save();
  ctx.strokeStyle = 'rgba(100,90,180,0.032)';
  ctx.lineWidth = 0.5;

  for (let x = 0; x < W; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  for (let y = 0; y < H; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  ctx.restore();
};
