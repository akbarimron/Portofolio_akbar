import { useEffect, useState, useRef } from 'react';
import { CODE_SNIPPETS } from '../../utils/constants';
import './FloatingCode.css';

interface FloatingCode {
  id: string;
  snippet: string;
  position: 'left' | 'right';
  top: number;
  color: string;
}

const CODE_COLORS = [
  'rgba(124,111,205,0.18)',
  'rgba(78,158,206,0.16)',
  'rgba(173,108,210,0.15)',
];

export default function FloatingCode() {
  const [codes, setCodes] = useState<FloatingCode[]>([]);

  useEffect(() => {
    let activeCount = 0;
    const maxActive = 5;
    const timeoutIds: NodeJS.Timeout[] = [];
    let intervalId: NodeJS.Timeout;

    const spawnCode = () => {
      if (activeCount >= maxActive) return;

      const id = Math.random().toString();
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      const position = Math.random() < 0.5 ? 'left' : 'right';
      const top = 90 + Math.random() * (window.innerHeight - 230);
      const color = CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)];

      const newCode: FloatingCode = { id, snippet, position, top, color };
      setCodes((prev) => [...prev, newCode]);
      activeCount++;

      // Remove after animation completes
      const removeTimeout = setTimeout(() => {
        setCodes((prev) => prev.filter((c) => c.id !== id));
        activeCount--;
      }, 8000);
      timeoutIds.push(removeTimeout);
    };

    // Initial spawns
    const timeout1 = setTimeout(spawnCode, 700);
    const timeout2 = setTimeout(spawnCode, 1900);
    timeoutIds.push(timeout1, timeout2);

    // Recurring spawns
    intervalId = setInterval(spawnCode, 2700);

    return () => {
      clearInterval(intervalId);
      timeoutIds.forEach((tid) => clearTimeout(tid));
    };
  }, []);

  return (
    <div id="codeContainer">
      {codes.map((code) => (
        <FloatingCodeItem key={code.id} code={code} />
      ))}
    </div>
  );
}

function FloatingCodeItem({ code }: { code: FloatingCode }) {
  const [displayText, setDisplayText] = useState('');
  const [isFading, setIsFading] = useState(false);
  const charIndexRef = useRef(0);
  const intervalsRef = useRef<{ typing?: NodeJS.Timeout; blink?: NodeJS.Timeout; fade?: NodeJS.Timeout }>({});
  
  // Generate position once, don't regenerate
  const positionRef = useRef(8 + Math.random() * 80);

  useEffect(() => {
    // Reset state
    charIndexRef.current = 0;
    setDisplayText('');
    setIsFading(false);

    const typingSpeed = 28 + Math.random() * 16;

    // Phase 1: Typing
    const typeInterval = setInterval(() => {
      if (charIndexRef.current < code.snippet.length) {
        const prefix = code.snippet.slice(0, charIndexRef.current + 1);
        setDisplayText(prefix + '▋');
        charIndexRef.current++;
      } else {
        // Move to blink phase
        clearInterval(typeInterval);
        intervalsRef.current.typing = undefined;
        startBlinking();
      }
    }, typingSpeed);

    intervalsRef.current.typing = typeInterval;

    // Phase 2: Blinking cursor
    const startBlinking = () => {
      let blinkCount = 0;
      const blinkInterval = setInterval(() => {
        setDisplayText(code.snippet + (blinkCount % 2 === 0 ? '▋' : ''));
        blinkCount++;

        if (blinkCount > 6) {
          clearInterval(blinkInterval);
          intervalsRef.current.blink = undefined;
          startFading();
        }
      }, 400);

      intervalsRef.current.blink = blinkInterval;
    };

    // Phase 3: Fading
    const startFading = () => {
      setDisplayText(code.snippet);
      const fadeTimeout = setTimeout(() => {
        setIsFading(true);
      }, 3000 + Math.random() * 2000);

      intervalsRef.current.fade = fadeTimeout;
    };

    // Cleanup function
    return () => {
      if (intervalsRef.current.typing) clearInterval(intervalsRef.current.typing);
      if (intervalsRef.current.blink) clearInterval(intervalsRef.current.blink);
      if (intervalsRef.current.fade) clearTimeout(intervalsRef.current.fade);
    };
  }, [code.snippet]);

  return (
    <div
      className={`code-float ${isFading ? 'fade-out' : ''}`}
      style={{
        [code.position]: `${positionRef.current}px`,
        top: `${code.top}px`,
        color: code.color,
      }}
    >
      {displayText}
    </div>
  );
}
