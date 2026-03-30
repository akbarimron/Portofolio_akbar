import { useEffect, useRef } from 'react';
import { createCube, drawCube, createParticle, drawGrid } from '../../utils/animations';
import type { CubeObj, Particle } from '../../utils/animations';
import './Background.css';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cubesRef = useRef<CubeObj[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize cubes and particles
    cubesRef.current = Array.from({ length: 16 }, () =>
      createCube(canvas.width, canvas.height)
    );
    particlesRef.current = Array.from({ length: 75 }, () =>
      createParticle(canvas.width, canvas.height)
    );

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / canvas.width - 0.5) * 2;
      mouseRef.current.y = (e.clientY / canvas.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      drawGrid(ctx, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 90) * 0.07;
            ctx.strokeStyle = '#7c6fcd';
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.al;
        ctx.fillStyle = p.col;
        ctx.shadowBlur = 5;
        ctx.shadowColor = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Update and draw cubes
      cubesRef.current.forEach((c) => {
        c.rx += c.drx;
        c.ry += c.dry;
        c.rz += c.drz;
        c.y += c.vy;
        if (c.y < -120) {
          c.y = canvas.height + 80;
          c.x = (Math.random() * canvas.width * 0.35 + canvas.width * 0.06) * (Math.random() < 0.5 ? -1 : 1) + canvas.width / 2;
        }
        drawCube(ctx, c, mouseRef.current.x, mouseRef.current.y);
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="bgCanvas"></canvas>;
}
