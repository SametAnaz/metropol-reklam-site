import { useEffect, useState } from 'react';
import Script from 'next/script';
import AdminBackgroundFallback from './AdminBackgroundFallback';

const AdminBackground = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    const initParticles = () => {
      try {
        if (typeof createjs === 'undefined' || typeof TweenMax === 'undefined') {
          setFailedAttempts(prev => prev + 1);
          if (failedAttempts > 10) {
            console.warn("Scripts failed to load after multiple attempts, using fallback");
            setScriptError(true);
            return;
          }
          setTimeout(initParticles, 200);
          return;
        }

        setScriptsLoaded(true);
        console.log('Scripts loaded successfully, initializing particles...');

        // Simplified but effective particle system
        const canvas = document.getElementById('projector');
        if (!canvas) return;

        const stage = new createjs.Stage('projector');
        const totalWidth = canvas.width = canvas.offsetWidth;
        const totalHeight = canvas.height = canvas.offsetHeight;

        // Create background lights
        for (let i = 0; i < 3; i++) {
          const light = new createjs.Shape();
          const size = 200 + Math.random() * 200;
          light.graphics.beginFill(`rgba(255,255,255,${0.05 + Math.random() * 0.1})`).drawCircle(0, 0, size);
          light.x = Math.random() * totalWidth;
          light.y = Math.random() * totalHeight;
          light.alpha = 0.3;
          
          stage.addChild(light);
          
          // Animate lights
          TweenMax.to(light, 8 + Math.random() * 4, {
            x: Math.random() * totalWidth,
            y: Math.random() * totalHeight,
            scaleX: 0.5 + Math.random() * 1.5,
            scaleY: 0.5 + Math.random() * 1.5,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
        }

        // Create particles
        for (let i = 0; i < 100; i++) {
          const circle = new createjs.Shape();
          const radius = Math.random() * 3 + 1;
          circle.graphics.beginFill(`rgba(255,255,255,${Math.random() * 0.4 + 0.1})`).drawCircle(0, 0, radius);
          circle.x = Math.random() * totalWidth;
          circle.y = Math.random() * totalHeight;
          circle.alpha = Math.random() * 0.6;
          
          stage.addChild(circle);
          
          // Animate particles
          TweenMax.to(circle, Math.random() * 10 + 5, {
            x: Math.random() * totalWidth,
            y: Math.random() * totalHeight,
            alpha: Math.random() * 0.6,
            repeat: -1,
            yoyo: true,
            ease: Power1.easeInOut
          });
        }

        // Render loop
        createjs.Ticker.addEventListener("tick", () => stage.update());
        
        // Resize handler
        const handleResize = () => {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          stage.update();
        };
        
        window.addEventListener('resize', handleResize, false);

      } catch (error) {
        console.error('Error initializing particles:', error);
        setScriptError(true);
      }
    };

    // Timeout for script loading - shorter timeout for production
    const timeout = setTimeout(() => {
      if (!scriptsLoaded && (typeof createjs === 'undefined' || typeof TweenMax === 'undefined')) {
        console.warn('External scripts failed to load within timeout');
        setScriptError(true);
      }
    }, 3000); // Reduced from 5000ms to 3000ms for faster fallback

    // Second safety timeout
    const finalTimeout = setTimeout(() => {
      if (!scriptsLoaded) {
        console.warn('Final timeout reached, forcing fallback');
        setScriptError(true);
      }
    }, 5000);

    initParticles();

    return () => {
      clearTimeout(finalTimeout);
      clearTimeout(timeout);
      if (typeof createjs !== 'undefined') {
        createjs.Ticker.removeAllEventListeners();
      }
      window.removeEventListener('resize', () => {});
    };
  }, []);

  // If there's a script error, use the fallback background
  if (scriptError) {
    return <AdminBackgroundFallback />;
  }

  return (
    <>
      <Script 
        src="https://code.createjs.com/1.0.0/createjs.min.js" 
        strategy="beforeInteractive"
        onLoad={() => console.log('CreateJS loaded successfully')}
        onError={(e) => {
          console.error('Failed to load CreateJS:', e);
          setScriptError(true);
        }}
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" 
        strategy="beforeInteractive"
        onLoad={() => console.log('GSAP loaded successfully')}
        onError={(e) => {
          console.error('Failed to load GSAP:', e);
          setScriptError(true);
        }}
      />
      <canvas 
        id="projector"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: 'linear-gradient(0deg, #191d1e 50%, #283139 100%)',
          backgroundAttachment: 'fixed'
        }}
      >
        Your browser does not support the Canvas element.
      </canvas>
      <style jsx>{`
        @keyframes backgroundFloat {
          0% { transform: translateX(-10px) translateY(-10px) rotate(0deg); }
          100% { transform: translateX(10px) translateY(10px) rotate(1deg); }
        }
      `}</style>
    </>
  );
};

export default AdminBackground;
