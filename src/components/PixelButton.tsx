import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PixelButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: '_blank' | '_self';
  className?: string;
  
  // Particle Settings
  pixelColors?: string[];
  pixelSize?: number;
  pixelGap?: number;
  shimmerSpeed?: number;
  
  // Animation Toggles
  pixelAnimation?: 'always' | 'hover';
  enableRipple?: boolean;
  enableBeam?: boolean;
  enableInnerGlow?: boolean;
  
  // Styling
  backgroundColor?: string;
  textColor?: string;
  beamColors?: [string, string];
  beamWidth?: number;
  beamSpeed?: number;
  borderRadius?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string | number;
  
  // Text Outline (Halo)
  enableTextOutline?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  color: string;
  baseAlpha: number;
  alpha: number;
  targetAlpha: number;
  scale: number;
  targetScale: number;
  shimmerOffset: number;

  constructor(x: number, y: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.size = size;
    this.color = color;
    this.baseAlpha = 0.1 + Math.random() * 0.3;
    this.alpha = this.baseAlpha;
    this.targetAlpha = this.baseAlpha;
    this.scale = 0;
    this.targetScale = 0;
    this.shimmerOffset = Math.random() * Math.PI * 2;
  }

  update(
    mouseX: number, 
    mouseY: number, 
    isHovered: boolean, 
    isAlwaysOn: boolean,
    ripple: { x: number, y: number, r: number, active: boolean } | null,
    time: number,
    shimmerSpeed: number
  ) {
    // Default state: Pixels are visible but static
    this.targetScale = 0.6;
    this.targetAlpha = this.baseAlpha;

    if (isHovered) {
      // Hover state: Soften pixels and reduce individual flash
      // Instead of increasing alpha, we keep it steady or slightly lower to let the background glow shine
      this.targetScale = 0.65;
      this.targetAlpha = this.baseAlpha * 0.8; 
      
      // Add subtle movement
      const jitter = Math.sin(time * 0.005 + this.shimmerOffset) * 0.1;
      this.targetScale += jitter;
    }

    // Ripple Logic (Keep this sharp/bright for impact)
    if (ripple && ripple.active) {
      const rdx = ripple.x - this.x;
      const rdy = ripple.y - this.y;
      const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
      const rippleWidth = 50;
      
      if (Math.abs(rDist - ripple.r) < rippleWidth) {
        const rippleFactor = 1 - Math.abs(rDist - ripple.r) / rippleWidth;
        this.targetScale += rippleFactor * 1.2;
        this.targetAlpha = 1; 
      }
    }

    // Smooth transitions
    this.scale += (this.targetScale - this.scale) * 0.1;
    this.alpha += (this.targetAlpha - this.alpha) * 0.1;
    
    this.alpha = Math.max(0, Math.min(1, this.alpha));
  }

  draw(ctx: CanvasRenderingContext2D, isHovered: boolean) {
    if (this.scale <= 0.01) return;
    
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    
    if (isHovered) {
      // Soften edges on hover using shadowBlur
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
    }

    const s = this.size * this.scale;
    ctx.fillRect(this.x - s / 2, this.y - s / 2, s, s);
    ctx.restore();
  }
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  text = "Get unlimited access",
  onClick,
  href,
  target = "_self",
  className = "",
  pixelColors = ["#351FFF", "#5E4DFF", "#9F94FF"],
  pixelSize = 4,
  pixelGap = 6,
  shimmerSpeed = 0.005,
  pixelAnimation = "hover",
  enableRipple = true,
  enableBeam = true,
  enableInnerGlow = true,
  backgroundColor = "#ffffff",
  textColor = "#1a1a1a",
  beamColors = ["#351FFF", "#9F94FF"],
  beamWidth = 2,
  beamSpeed = 3,
  borderRadius = "9999px",
  padding = "16px 48px",
  fontSize = "18px",
  fontWeight = 500,
  enableTextOutline = true,
  outlineColor = "#ffffff",
  outlineWidth = 4,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number, y: number, r: number, active: boolean } | null>(null);
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
        particles.push(new Particle(x, y, pixelSize, color));
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

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ripple && ripple.active) {
        setRipple(prev => {
          if (!prev) return null;
          const nextR = prev.r + 4;
          if (nextR > Math.max(canvas.width, canvas.height)) {
            return { ...prev, active: false };
          }
          return { ...prev, r: nextR };
        });
      }

      particlesRef.current.forEach(p => {
        p.update(
          mousePos.current.x,
          mousePos.current.y,
          isHovered,
          pixelAnimation === 'always',
          ripple,
          time,
          shimmerSpeed
        );
        p.draw(ctx, isHovered);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, [initParticles, isHovered, pixelAnimation, ripple, shimmerSpeed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleClick = (e: React.MouseEvent) => {
    if (enableRipple) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0,
        active: true
      });
    }
    onClick?.(e);
  };

  const textHaloStyle = enableTextOutline ? {
    textShadow: `
      0 0 ${outlineWidth}px ${outlineColor},
      0 0 ${outlineWidth / 2}px ${outlineColor}
    `
  } : {};

  const ButtonContent = (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden cursor-pointer group ${className}`}
      style={{
        padding,
        borderRadius,
        backgroundColor,
        color: textColor,
        fontSize,
        fontWeight,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mousePos.current = { x: -1000, y: -1000 };
      }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      whileHover={{}}
      whileTap={{ scale: 0.98 }}
    >
      {/* Rotating Beam Border */}
      {enableBeam && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius }}
        >
          <div 
            className="absolute inset-[-2px] animate-[spin_var(--speed)_linear_infinite]"
            style={{
              borderRadius,
              background: `conic-gradient(from 0deg, transparent, ${beamColors[0]}, ${beamColors[1]}, transparent 40%)`,
              '--speed': `${beamSpeed}s`,
            } as any}
          />
          <div 
            className="absolute inset-[1px]"
            style={{ borderRadius, backgroundColor }}
          />
        </div>
      )}

      {/* Soft Background Glow on Hover */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          borderRadius,
          background: `radial-gradient(circle at var(--x) var(--y), ${pixelColors[0]}33 0%, transparent 70%)`,
          '--x': `${mousePos.current.x}px`,
          '--y': `${mousePos.current.y}px`,
        } as any}
      />

      {/* Inner Glow */}
      {enableInnerGlow && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            borderRadius,
            boxShadow: `inset 0 0 25px ${pixelColors[0]}33, inset 0 0 10px ${pixelColors[0]}22`,
            border: `1px solid ${pixelColors[0]}22`
          }}
        />
      )}

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Label */}
      <span 
        className="relative z-10 select-none transition-transform duration-300 group-active:scale-95"
        style={textHaloStyle}
      >
        {text}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} className="inline-block no-underline">
        {ButtonContent}
      </a>
    );
  }

  return ButtonContent;
};
