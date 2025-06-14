// Animated section component with intersection observer
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export default function AnimatedSection({ children, className = '', animation = 'fade-up', delay = 0 }) {
  const [ref, , hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out';
    const delayClass = delay > 0 ? `delay-${delay}` : '';
    
    if (!hasIntersected) {
      switch (animation) {
        case 'fade-up':
          return `${baseClass} ${delayClass} opacity-0 translate-y-8`;
        case 'fade-down':
          return `${baseClass} ${delayClass} opacity-0 -translate-y-8`;
        case 'fade-left':
          return `${baseClass} ${delayClass} opacity-0 translate-x-8`;
        case 'fade-right':
          return `${baseClass} ${delayClass} opacity-0 -translate-x-8`;
        case 'fade':
          return `${baseClass} ${delayClass} opacity-0`;
        case 'scale':
          return `${baseClass} ${delayClass} opacity-0 scale-95`;
        default:
          return `${baseClass} ${delayClass} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClass} ${delayClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  );
}
