/**
 * THE ROYAL EXPERIENCE — Canvas Particle Atmosphere Engine
 * Theme-reactive particles: fireflies, celestial stars, rose petals, stardust.
 * High-performance, retina-aware, battery-friendly, reduced-motion compliant.
 */

class RoyalParticleEngine {
  constructor(canvasId = 'particles-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.theme = 'royal';
    this.intensity = 1.0; // 0.5 (subtle), 1.0 (ethereal), 1.5 (majestic)
    this.animationId = null;
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize(), { passive: true });
    this.spawnParticles();
    if (!this.prefersReducedMotion) {
      this.start();
    }
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
    this.spawnParticles();
  }

  setTheme(themeName) {
    this.theme = themeName;
    this.spawnParticles();
  }

  setIntensity(level) {
    // level: 'subtle' = 0.5, 'ethereal' = 1.0, 'majestic' = 1.6
    this.intensity = level === 'subtle' ? 0.5 : (level === 'majestic' ? 1.6 : 1.0);
    this.spawnParticles();
  }

  getParticleCount() {
    const isMobile = this.width < 768;
    const base = isMobile ? 35 : 75;
    return Math.floor(base * this.intensity);
  }

  spawnParticles() {
    this.particles = [];
    const count = this.getParticleCount();

    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    const p = {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: 0.015 + Math.random() * 0.03,
      pulseOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02
    };

    // Theme adjustments
    if (this.theme === 'fairytale') {
      // Emerald & Gold Fireflies
      p.color = Math.random() > 0.4 ? '#E5C365' : '#6EE7B7';
      p.glow = 12;
      p.radius = Math.random() * 2.8 + 1.2;
    } else if (this.theme === 'celestial') {
      // Starlight Starbursts
      p.color = Math.random() > 0.3 ? '#C7D2FE' : '#F1D27E';
      p.glow = 8;
      p.vy = (Math.random() - 0.5) * 0.15; // Slow ambient float
      p.vx = (Math.random() - 0.5) * 0.15;
    } else if (this.theme === 'garden') {
      // Drifting Rose Petals
      p.color = Math.random() > 0.5 ? '#FDA4AF' : '#E8A598';
      p.radius = Math.random() * 4 + 3; // Flatter petal shape
      p.vy = 0.4 + Math.random() * 0.6; // Falling down gently
      p.vx = Math.sin(Math.random() * 10) * 0.4;
      p.isPetal = true;
    } else if (this.theme === 'pastel') {
      // Ethereal Opalescent Bubbles
      p.color = '#D8B4E2';
      p.radius = Math.random() * 5 + 2;
      p.isBubble = true;
      p.alpha = Math.random() * 0.4 + 0.1;
    } else if (this.theme === 'midnight') {
      // Diamond Stars
      p.color = '#FFFFFF';
      p.radius = Math.random() * 2 + 0.8;
      p.glow = 15;
    } else {
      // Default Royal: Warm Champagne Gold Dust
      p.color = '#D4AF37';
      p.glow = 10;
    }

    return p;
  }

  update() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.pulseOffset += p.pulseSpeed;

      // Wrap around edges
      if (p.y < -20) p.y = this.height + 10;
      if (p.y > this.height + 20) p.y = -10;
      if (p.x < -20) p.x = this.width + 10;
      if (p.x > this.width + 20) p.x = -10;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.particles) {
      const currentAlpha = Math.max(0.05, Math.min(0.9, p.alpha + Math.sin(p.pulseOffset) * 0.25));

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (p.isPetal) {
        // Draw an organic petal ellipse
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = currentAlpha;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.radius, p.radius * 0.55, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.isBubble) {
        // Draw pearlescent circle with rim
        this.ctx.strokeStyle = p.color;
        this.ctx.fillStyle = 'rgba(255,255,255,0.05)';
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = currentAlpha;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      } else {
        // Glowing star / stardust particle
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = currentAlpha;
        if (p.glow && !this.prefersReducedMotion) {
          this.ctx.shadowBlur = p.glow;
          this.ctx.shadowColor = p.color;
        }
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }
  }

  start() {
    if (this.animationId) return;
    const loop = () => {
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

// Global particle instance
window.royalParticles = new RoyalParticleEngine('particles-canvas');
