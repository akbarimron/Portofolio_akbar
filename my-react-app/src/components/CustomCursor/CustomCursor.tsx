import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  "[role='button']",
  "input[type='submit']",
  "input[type='button']",
  '.pcard',
  '.see-more-btn',
].join(',');

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hasShownRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateEnabled = () => {
      setIsEnabled(!mediaQuery.matches);
    };

    updateEnabled();
    mediaQuery.addEventListener('change', updateEnabled);

    return () => {
      mediaQuery.removeEventListener('change', updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const animateRing = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      current.current.x += dx * 0.34;
      current.current.y += dy * 0.34;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(animateRing);
    };

    const onMouseMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;

      if (!hasShownRef.current) {
        hasShownRef.current = true;
        current.current.x = event.clientX;
        current.current.y = event.clientY;
        setIsVisible(true);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      const targetElement = event.target as Element | null;
      const isInteractive = !!targetElement?.closest(INTERACTIVE_SELECTOR);
      setIsHoveringInteractive(isInteractive);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeaveWindow = (event: MouseEvent) => {
      if (event.relatedTarget) {
        return;
      }
      setIsVisible(false);
      setIsPressed(false);
      hasShownRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseout', onMouseLeaveWindow);

    rafRef.current = window.requestAnimationFrame(animateRing);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseout', onMouseLeaveWindow);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'is-visible' : ''} ${isHoveringInteractive ? 'is-hover' : ''} ${isPressed ? 'is-pressed' : ''}`}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'is-visible' : ''} ${isHoveringInteractive ? 'is-hover' : ''} ${isPressed ? 'is-pressed' : ''}`}
      />
    </>
  );
}
