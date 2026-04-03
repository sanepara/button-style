# Next.js Setup: Professional Upwork Pixel Button

To get the **exact** same look and feel in your Next.js project, follow these steps precisely.

## 1. Prerequisites
Install the required animation library:
```bash
npm install motion
```

## 2. Global CSS (`app/globals.css`)
Copy this into your global CSS file. This handles the fonts and the critical "spin" animation for the border beam.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}
```

## 3. The Component (`components/PixelButton.tsx`)
Create this file. Note the `'use client'` directive at the top, which is mandatory for Next.js components using Canvas or Framer Motion.

```tsx
'use client';

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
  enableHoverGlow?: boolean;
  enableParticles?: boolean;
  enableUnderline?: boolean;
  enableHoverOpacity?: boolean;
  backgroundColor?: string;
  textColor?: string;
  beamColors?: [string, string];
  beamSpeed?: number;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string | number;
  enableTextOutline?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
}

class Particle {
  x: number; y: number; originX: number; originY: number; baseSize: number; color: string;
  baseAlpha: number; alpha: number; targetAlpha: number; scale: number; targetScale: number;
  shimmerOffset: number; borderRadius: number;

  constructor(x: number, y: number, color: string) {
    this.x = x; this.y = y; this.originX = x; this.originY = y;
    const rand = Math.random();
    if (rand < 0.6) { this.baseSize = 1; this.borderRadius = 0.1; }
    else if (rand < 0.9) { this.baseSize = 2; this.borderRadius = 0.3; }
    else { this.baseSize = 3; this.borderRadius = 0.5; }
    this.color = color;
    this.baseAlpha = 0.1 + Math.random() * 0.3;
    this.alpha = this.baseAlpha; this.targetAlpha = this.baseAlpha;
    this.scale = 0.6; this.targetScale = 0.6;
    this.shimmerOffset = Math.random() * Math.PI * 2;
  }

  update(mouseX: number, mouseY: number, isHovered: boolean, ripple: any, time: number) {
    this.targetScale = 0.6;
    this.targetAlpha = this.baseAlpha;
    const ambientShimmer = Math.sin(time * 0.004 + this.shimmerOffset) * 0.1;
    this.targetAlpha += ambientShimmer;

    const floatX = Math.cos(time * 0.003 + this.shimmerOffset) * 0.8;
    const floatY = Math.sin(time * 0.003 + this.shimmerOffset) * 0.8;
    this.x = this.originX + floatX;
    this.y = this.originY + floatY;

    if (isHovered) {
      const fastJitter = Math.sin(time * 0.01 + this.shimmerOffset) * 0.2;
      this.targetScale = 0.75 + fastJitter;
      this.targetAlpha = Math.min(1, this.baseAlpha + 0.4 + fastJitter);
      const dx = mouseX - this.x; const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const factor = 1 - dist / 100;
        this.targetScale += factor * 0.3;
        this.targetAlpha += factor * 0.3;
      }
    }

    if (ripple && ripple.active) {
      const rdx = ripple.x - this.x; const rdy = ripple.y - this.y;
      const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
      if (Math.abs(rDist - ripple.r) < 45) {
        const factor = 1 - Math.abs(rDist - ripple.r) / 45;
        this.targetScale += factor * 1.5;
        this.targetAlpha = 1;
      }
    }

    const lerpSpeed = isHovered ? 0.15 : 0.2;
    this.scale += (this.targetScale - this.scale) * lerpSpeed;
    this.alpha += (this.targetAlpha - this.alpha) * lerpSpeed;
  }

  draw(ctx: CanvasRenderingContext2D, isHovered: boolean) {
    if (this.scale <= 0.01) return;
    ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
    ctx.fillStyle = this.color;
    const s = this.baseSize * this.scale;
    ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
  }
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  text = "Hire me on Upwork",
  onClick, href, target = "_self", className = "",
  pixelColors = ["#16A700", "#3A453A", "#7A907A"],
  pixelSize = 5, pixelGap = 5,
  enableRipple = true, enableBeam = true, enableInnerGlow = true,
  enableHoverGlow = true, enableParticles = true,
  backgroundColor = "#ffffff", textColor = "#3A453A",
  beamColors = ["#16A700", "#F1F7F4"], beamSpeed = 3,
  borderRadius = "9999px", padding = "20px 56px", fontSize = "16px", fontWeight = 500,
  enableTextOutline = false, outlineColor = "#ffffff", outlineWidth = 4,
  enableUnderline = false,
  enableHoverOpacity = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const isHoveredRef = useRef(false);
  const rippleRef = useRef<{ x: number, y: number, r: number, active: boolean } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const requestRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const cols = Math.floor(width / (pixelSize + pixelGap));
    const rows = Math.floor(height / (pixelSize + pixelGap));
    const offsetX = (width - cols * (pixelSize + pixelGap)) / 2 + pixelSize / 2;
    const offsetY = (height - rows * (pixelSize + pixelGap)) / 2 + pixelSize / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = offsetX + i * (pixelSize + pixelGap);
        const y = offsetY + j * (pixelSize + pixelGap);
        const color = pixelColors[Math.floor(Math.random() * pixelColors.length)];
        particles.push(new Particle(x, y, color));
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
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updateSize();

    const animate = (time: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

      const currentRipple = rippleRef.current;
      if (currentRipple && currentRipple.active) {
        currentRipple.r += 6;
        if (currentRipple.r > Math.max(canvas.width, canvas.height)) {
          currentRipple.active = false;
        }
      }

      particlesRef.current.forEach(p => {
        p.update(
          mousePos.current.x,
          mousePos.current.y,
          isHoveredRef.current,
          currentRipple,
          time
        );
        p.draw(ctx, isHoveredRef.current);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, [initParticles]);

  const textHalo = enableTextOutline ? {
    textShadow: `0 0 ${outlineWidth}px ${outlineColor}, 0 0 ${outlineWidth / 2}px ${outlineColor}`
  } : {};

  const content = (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden cursor-pointer group ${className}`}
      style={{ padding, borderRadius, backgroundColor, color: textColor, fontSize, fontWeight }}
      onMouseEnter={() => {
        setIsHovered(true);
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        isHoveredRef.current = false;
        mousePos.current = { x: -1000, y: -1000 };
      }}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onClick={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (enableRipple && rect) {
          rippleRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, active: true };
        }
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
      {enableHoverGlow && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius, background: `radial-gradient(circle at ${mousePos.current.x}px ${mousePos.current.y}px, ${pixelColors[0]}22 0%, transparent 70%)` }} />
      )}
      {enableInnerGlow && (
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius, boxShadow: `inset 0 0 25px ${pixelColors[0]}22`, border: `1px solid ${pixelColors[0]}11` }} />
      )}
      {enableParticles && (
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }} />
      )}
      <span 
        className={`relative z-10 select-none transition-all duration-300 group-active:scale-95 ${
          enableHoverOpacity ? 'group-hover:opacity-70' : ''
        }`}
        style={textHalo}
      >
        {text}
        {enableUnderline && (
          <motion.div
            className="absolute -bottom-1 left-0 h-[2px] bg-current origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </span>
    </motion.div>
  );

  if (href) {
    return <a href={href} target={target} className="no-underline">{content}</a>;
  }

  return content;
};
```

## 4. Usage in Page (`app/page.tsx`)
This is how you implement the button in your main page.

```tsx
import { PixelButton } from '@/components/PixelButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-24">
      <PixelButton 
        text="Hire me on Upwork"
        pixelColors={["#16A700", "#3A453A", "#7A907A"]}
        beamColors={["#16A700", "#F1F7F4"]}
        backgroundColor="#ffffff"
        textColor="#3A453A"
        pixelSize={5}
        pixelGap={5}
        fontWeight={500}
        enableTextOutline={false}
      />
    </main>
  );
}
```

## 5. Exporting to GitHub
To get the **exact** project files to upload to GitHub:
1. Click the **Settings** (gear icon) in the top right of the AI Studio interface.
2. Select **Export to GitHub** or **Download ZIP**.
3. This will give you the full source code exactly as it is running here.
