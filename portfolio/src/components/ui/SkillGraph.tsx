import { useEffect, useRef, useCallback } from 'react';

type Category = 'AI / ML' | 'Full Stack' | 'Product';

interface SkillItem {
  name: string;
  category: Category;
}

interface SkillNode {
  name: string;
  category: Category;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
}

const SKILLS: SkillItem[] = [
  { name: 'Python', category: 'AI / ML' },
  { name: 'RAG', category: 'AI / ML' },
  { name: 'LangChain', category: 'AI / ML' },
  { name: 'NLP', category: 'AI / ML' },
  { name: 'Agents', category: 'AI / ML' },
  { name: 'ML', category: 'AI / ML' },
  { name: 'React', category: 'Full Stack' },
  { name: 'TypeScript', category: 'Full Stack' },
  { name: 'Node.js', category: 'Full Stack' },
  { name: 'MongoDB', category: 'Full Stack' },
  { name: 'FastAPI', category: 'Full Stack' },
  { name: 'Postgres', category: 'Full Stack' },
  { name: 'System Design', category: 'Product' },
  { name: 'UX', category: 'Product' },
  { name: 'Architecture', category: 'Product' },
  { name: 'Problem Solving', category: 'Product' },
];

const CATEGORY_COLORS: Record<Category, string> = {
  'AI / ML': 'rgba(168,85,247,',
  'Full Stack': 'rgba(59,130,246,',
  'Product': 'rgba(34,211,238,',
};

const CATEGORY_HOVER: Record<Category, string> = {
  'AI / ML': 'rgba(192,132,252,',
  'Full Stack': 'rgba(96,165,250,',
  'Product': 'rgba(103,232,249,',
};

const CATEGORY_SOLID: Record<Category, string> = {
  'AI / ML': '#A855F7',
  'Full Stack': '#3B82F6',
  'Product': '#22D3EE',
};

let textColorCache = '#FFFFFF';

function getTextColor(): string {
  if (typeof document === 'undefined') return '#FFFFFF';
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue('--color-text-main').trim() || '#FFFFFF';
}

export function SkillGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, hoveredNode: -1 });
  const animRef = useRef<number>(0);

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: SkillNode[] = SKILLS.map((skill) => ({
      ...skill,
      x: Math.random() * (w - 100) + 50,
      y: Math.random() * (h - 100) + 50,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 28 + Math.random() * 12,
      connections: [],
    }));

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].category === nodes[j].category) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
        }
      }
    }

    const crossPairs: [number, number][] = [
      [0, 6],  [1, 9],  [2, 8],
      [4, 12], [7, 14], [3, 15],
    ];
    for (const [a, b] of crossPairs) {
      if (!nodes[a].connections.includes(b)) {
        nodes[a].connections.push(b);
        nodes[b].connections.push(a);
      }
    }

    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    textColorCache = getTextColor();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastW = 0;
    let lastH = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const newW = rect.width;
      const newH = rect.height;

      canvas.width = newW * dpr;
      canvas.height = newH * dpr;
      ctx.scale(dpr, dpr);

      if (nodesRef.current.length === 0) {
        initNodes(newW, newH);
      } else if (lastW > 0 && lastH > 0) {
        // Scale node positions proportionally on resize
        for (const n of nodesRef.current) {
          n.x = (n.x / lastW) * newW;
          n.y = (n.y / lastH) * newH;
        }
      }
      lastW = newW;
      lastH = newH;
    };

    resize();
    window.addEventListener('resize', resize);

    // Read theme text color
    const updateTextColor = () => { textColorCache = getTextColor(); };
    const observer = new MutationObserver(updateTextColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      // Physics — no central attraction; nodes find their own equilibrium

      // Compute category centroids for clustering
      const centroids: Record<string, { cx: number; cy: number; count: number }> = {};
      for (const n of nodes) {
        if (!centroids[n.category]) centroids[n.category] = { cx: 0, cy: 0, count: 0 };
        centroids[n.category].cx += n.x;
        centroids[n.category].cy += n.y;
        centroids[n.category].count++;
      }
      for (const key in centroids) {
        centroids[key].cx /= centroids[key].count;
        centroids[key].cy /= centroids[key].count;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Category clustering: gentle pull toward category centroid
        const cent = centroids[n.category];
        const ccx = cent.cx - n.x;
        const ccy = cent.cy - n.y;
        const ccDist = Math.sqrt(ccx * ccx + ccy * ccy);
        if (ccDist > 15) {
          const catForce = Math.min(ccDist * 0.002, 0.25);
          n.vx += (ccx / ccDist) * catForce;
          n.vy += (ccy / ccDist) * catForce;
        }

        // Inverse-square repulsion from all other nodes
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = n.x - nodes[j].x;
          const dy = n.y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = n.radius + nodes[j].radius;
          const effectiveDist = Math.max(dist, minDist * 0.5);
          if (effectiveDist < 300) {
            const force = Math.min(800 / (effectiveDist * effectiveDist), 3);
            n.vx += (dx / effectiveDist) * force;
            n.vy += (dy / effectiveDist) * force;
          }
        }

        // Spring force: pulls connected nodes toward an ideal separation
        for (const connIdx of n.connections) {
          const target = nodes[connIdx];
          const dx = target.x - n.x;
          const dy = target.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const idealDist = 110;
          if (dist > 0) {
            const displacement = dist - idealDist;
            const force = 0.005 * displacement;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Magnetic mouse interaction — attract at range, repel when very close
        const dmx = n.x - mx;
        const dmy = n.y - my;
        const dmDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (dmDist < 250 && dmDist > 0) {
          if (dmDist > 45) {
            // Gentle attraction toward cursor (magnetic pull)
            const force = Math.min(0.03 * (1 - dmDist / 250), 0.02);
            n.vx -= (dmx / dmDist) * force;
            n.vy -= (dmy / dmDist) * force;
          } else {
            // Repulsion when the cursor is right on top (bump away)
            const force = Math.min(1.5 / dmDist, 1.0);
            n.vx += (dmx / dmDist) * force;
            n.vy += (dmy / dmDist) * force;
          }
        }

        // Damping
        n.vx *= 0.97;
        n.vy *= 0.97;

        // Speed limit
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 4) {
          n.vx = (n.vx / speed) * 4;
          n.vy = (n.vy / speed) * 4;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Boundary clamping with bounce
        if (n.x < n.radius) { n.x = n.radius; n.vx *= -0.5; }
        if (n.x > w - n.radius) { n.x = w - n.radius; n.vx *= -0.5; }
        if (n.y < n.radius) { n.y = n.radius; n.vy *= -0.5; }
        if (n.y > h - n.radius) { n.y = h - n.radius; n.vy *= -0.5; }
      }

      // Check hover
      let hovered = -1;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const dx = mx - n.x;
        const dy = my - n.y;
        if (dx * dx + dy * dy < (n.radius + 8) * (n.radius + 8)) {
          hovered = i;
          break;
        }
      }
      mouseRef.current.hoveredNode = hovered;

      // Draw category background glows
      for (const key in centroids) {
        const cent = centroids[key];
        const catKey = key as Category;

        // Compute cluster radius — max distance from centroid to any node in this category
        let maxDist = 0;
        for (const n of nodes) {
          if (n.category !== key) continue;
          const dx = n.x - cent.cx;
          const dy = n.y - cent.cy;
          const d = Math.sqrt(dx * dx + dy * dy) + n.radius;
          if (d > maxDist) maxDist = d;
        }

        const glowRadius = Math.max(maxDist + 50, 120);

        // Subtle outer halo
        const halo = ctx.createRadialGradient(cent.cx, cent.cy, 0, cent.cx, cent.cy, glowRadius * 1.6);
        halo.addColorStop(0, CATEGORY_COLORS[catKey] + '0.04)');
        halo.addColorStop(1, CATEGORY_COLORS[catKey] + '0)');
        ctx.beginPath();
        ctx.arc(cent.cx, cent.cy, glowRadius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Brighter inner glow
        const inner = ctx.createRadialGradient(cent.cx, cent.cy, 0, cent.cx, cent.cy, glowRadius);
        inner.addColorStop(0, CATEGORY_COLORS[catKey] + '0.10)');
        inner.addColorStop(0.4, CATEGORY_COLORS[catKey] + '0.06)');
        inner.addColorStop(1, CATEGORY_COLORS[catKey] + '0)');
        ctx.beginPath();
        ctx.arc(cent.cx, cent.cy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = inner;
        ctx.fill();
      }

      // Draw connections
      for (let ni = 0; ni < nodes.length; ni++) {
        const n = nodes[ni];
        for (const connIdx of n.connections) {
          if (connIdx > ni) continue;
          const target = nodes[connIdx];
          const isConnected = hovered >= 0 && (hovered === ni || hovered === connIdx);
          const lineAlpha = isConnected ? 0.25 : 0.08;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = CATEGORY_COLORS[n.category] + lineAlpha + ')';
          ctx.lineWidth = isConnected ? 1.5 : 0.6;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const isHovered = hovered === i;
        const isConnected = hovered >= 0 && n.connections.includes(hovered);
        const alpha = hovered < 0 ? 1 : isHovered || isConnected ? 1 : 0.3;

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 12, 0, Math.PI * 2);
          ctx.fillStyle = CATEGORY_COLORS[n.category] + '0.15)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        const colorMap = isHovered ? CATEGORY_HOVER : CATEGORY_COLORS;
        ctx.fillStyle = colorMap[n.category] + (0.08 * alpha) + ')';
        ctx.fill();
        ctx.strokeStyle = colorMap[n.category] + (0.3 * alpha) + ')';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Parse theme-aware text color
        const tc = textColorCache;
        const r = parseInt(tc.slice(1, 3), 16);
        const g = parseInt(tc.slice(3, 5), 16);
        const b = parseInt(tc.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.75 * alpha})`;
        ctx.font = `${isHovered ? 12 : 10}px "Inter", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.name, n.x, n.y + 1);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.hoveredNode = -1;
    };

    canvas.addEventListener('mousemove', handleMouse);
    canvas.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      canvas.removeEventListener('mouseleave', handleLeave);
      observer.disconnect();
    };
  }, [initNodes]);

  return (
    <div className="relative w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-[400px] md:h-[500px] rounded-2xl cursor-pointer select-none"
      />
      <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-mono">
        {(Object.entries(CATEGORY_COLORS) as [Category, string][]).map(([category]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: CATEGORY_SOLID[category] }}
            />
            <span className="text-[var(--color-text-muted)] opacity-60">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
