import { useEffect, useRef } from 'react';

const AdminBackgroundFallback = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
          targetAlpha: Math.random() * 0.5 + 0.2,
          fadeDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
        
        // Update alpha
        particle.alpha += particle.fadeDirection * 0.002;
        if (particle.alpha <= 0.1) {
          particle.fadeDirection = 1;
          particle.alpha = 0.1;
        }
        if (particle.alpha >= particle.targetAlpha) {
          particle.fadeDirection = -1;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(0deg, #191d1e 50%, #283139 100%)',
      backgroundAttachment: 'fixed'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* CSS-based additional effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'pulse 8s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '10%',
        width: '30%',
        height: '30%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 12s ease-in-out infinite alternate-reverse',
        pointerEvents: 'none'
      }} />
      
      <style jsx>{`
        @keyframes pulse {
          0% { 
            transform: scale(1) translateX(0px) translateY(0px);
            opacity: 0.5;
          }
          100% { 
            transform: scale(1.1) translateX(20px) translateY(-10px);
            opacity: 0.8;
          }
        }
        
        @keyframes float {
          0% { 
            transform: scale(0.8) translateX(0px) translateY(0px);
            opacity: 0.3;
          }
          100% { 
            transform: scale(1.2) translateX(-30px) translateY(20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminBackgroundFallback;
