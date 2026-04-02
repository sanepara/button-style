# Pixel Button: Upwork Professional Style

A high-performance, interactive CTA component featuring a real-time HTML5 Canvas particle system, soft radial glow, and click ripple effects.

## 🎨 Design Specifications
- **Primary Color**: `#16A700` (Upwork Green)
- **Text Primary**: `#3A453A`
- **Text Secondary**: `#7A907A`
- **Background**: `#ffffff`
- **Card Background**: `#F1F7F4`

---

## 🚀 Setup Instructions

### 1. Install Dependencies
Ensure you have `motion` and `lucide-react` installed in your React project:
```bash
npm install motion lucide-react
```

### 2. Global CSS Configuration
Add the following to your global CSS file (e.g., `index.css` or `globals.css`) to enable the rotating border animation:

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}
```

### 3. Component Implementation (`PixelButton.tsx`)
Create a new file `src/components/PixelButton.tsx` and paste the following code:

```tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

interface PixelButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: '_blank' | '_self';
  className?: string;
  pixelColors?: string[];
  pixelSize?: number;
  pixelGap?: number;
  enableRipple?: boolean;
  enableBeam?: boolean;
  enableInnerGlow?: boolean;
  backgroundColor?: string;
  textColor?: string;
  beamColors?: [string, string];
  beamSpeed?: number;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

class Particle {
  x: number; y: number; size: number; color: string;
  baseAlpha: number; alpha: number; targetAlpha: number; scale: number; targetScale: number;
  shimmerOffset: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x; this.y = y; this.size = size; this.color = color;
    this.baseAlpha = 0.1 + Math.random() * 0.2;
    this.alpha = this.baseAlpha; this.targetAlpha = this.baseAlpha;
    this.scale = 0.6; this.targetScale = 0.6;
    this.shimmerOffset = Math.random() * Math.PI * 2;
  }

  update(isHovered: boolean, ripple: any, time: number) {
    this.targetScale = 0.6;
    this.targetAlpha = this.baseAlpha;

    if (isHovered) {
      this.targetScale = 0.65;
      this.targetAlpha = this.baseAlpha * 0.7; 
      const jitter = Math.sin(time * 0.005 + this.shimmerOffset) * 0.1;
      this.targetScale += jitter;
    }

    if (ripple && ripple.active) {
      const rdx = ripple.x - this.x; const rdy = ripple.y - this.y;
      const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
      if (Math.abs(rDist - ripple.r) < 50) {
        const factor = 1 - Math.abs(rDist - ripple.r) / 50;
        this.targetScale += factor * 1.2;
        this.targetAlpha = 1; 
      }
    }

    this.scale += (this.targetScale - this.scale) * 0.1;
    this.alpha += (this.targetAlpha - this.alpha) * 0.1;
  }

  draw(ctx: CanvasRenderingContext2D, isHovered: boolean) {
    if (this.scale <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
    ctx.fillStyle = this.color;
    if (isHovered) {
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
    }
    const s = this.size * this.scale;
    ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
    ctx.restore();
  }
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  text = "Hire me on Upwork",
  onClick, href, target = "_self", className = "",
  pixelColors = ["#16A700", "#3A453A", "#7A907A"],
  pixelSize = 5, pixelGap = 5,
  enableRipple = true, enableBeam = true, enableInnerGlow = true,
  backgroundColor = "#ffffff", textColor = "#3A453A",
  beamColors = ["#16A700", "#F1F7F4"], beamSpeed = 3,
  borderRadius = "9999px", padding = "20px 56px", fontSize = "20px", fontWeight = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<any>(null);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    const step = pixelSize + pixelGap;
    for (let x = step/2; x < w; x += step) {
      for (let y = step/2; y < h; y += step) {
        particles.push(new Particle(x, y, pixelSize, pixelColors[Math.floor(Math.random() * pixelColors.length)]));
      }
    }
    particlesRef.current = particles;
  }, [pixelSize, pixelGap, pixelColors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
      canvas.getContext('2d')?.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };
    const ro = new ResizeObserver(updateSize);
    if (containerRef.current) ro.observe(containerRef.current);
    updateSize();
    const animate = (time: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (ripple?.active) {
        setRipple((prev: any) => ({ ...prev, r: prev.r + 4, active: prev.r + 4 < Math.max(canvas.width, canvas.height) }));
      }
      particlesRef.current.forEach(p => {
        p.update(isHovered, ripple, time);
        p.draw(ctx, isHovered);
      });
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => { ro.disconnect(); cancelAnimationFrame(raf); };
  }, [initParticles, isHovered, ripple]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden cursor-pointer group ${className}`}
      style={{ padding, borderRadius, backgroundColor, color: textColor, fontSize, fontWeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); mousePos.current = { x: -1000, y: -1000 }; }}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onClick={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (enableRipple && rect) setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, active: true });
        onClick?.(e);
      }}
      whileHover={{}} whileTap={{ scale: 0.98 }}
    >
      {enableBeam && (
        <div className="absolute inset-0 pointer-events-none" style={{ borderRadius }}>
          <div className="absolute inset-[-2px] animate-spin-slow" style={{ borderRadius, background: `conic-gradient(from 0deg, transparent, ${beamColors[0]}, ${beamColors[1]}, transparent 40%)`, animationDuration: `${beamSpeed}s` } as any} />
          <div className="absolute inset-[1px]" style={{ borderRadius, backgroundColor }} />
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius, background: `radial-gradient(circle at ${mousePos.current.x}px ${mousePos.current.y}px, ${pixelColors[0]}22 0%, transparent 70%)` }} />
      {enableInnerGlow && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius, boxShadow: `inset 0 0 25px ${pixelColors[0]}22`, border: `1px solid ${pixelColors[0]}11` }} />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }} />
      <span className="relative z-10 select-none">{text}</span>
    </motion.div>
  );
};
```

---

## 🤖 AI Prompt for Generation

Copy and paste this prompt into your AI agent to generate this exact component:

> "Create a React component named `PixelButton` using Framer Motion and HTML5 Canvas. The button should have a grid of pixels visible by default. On hover, pixels should soften their edges using `shadowBlur` and animate with a subtle jitter. Add a soft radial background glow that follows the cursor on hover. Implement a click ripple effect that flashes pixels to full brightness. Add a rotating border beam using a conic-gradient. 
> 
> Use the following color palette:
> - Primary Pixel/Beam Color: #16A700
> - Text Color: #3A453A
> - Secondary Pixel Color: #7A907A
> - Button Background: #ffffff
> - Beam Secondary Color: #F1F7F4
> 
> Ensure the button is responsive using ResizeObserver and has a professional 'Hire me on Upwork' aesthetic with 20px padding and 600 font weight."
