import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const InteractivePortfolio = ({ projects, showCategoryFilter = false, categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [activeProject, setActiveProject] = useState(projects[0]?.id || 1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef(null); // İlk projenin ID'sini kullan

  const filteredProjects = showCategoryFilter && selectedCategory !== 'Tümü' 
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  useEffect(() => {
    if (filteredProjects.length > 0) {
      // Mevcut aktif proje filtrelenmiş projeler arasında var mı kontrol et
      const currentProjectExists = filteredProjects.some(project => project.id === activeProject);
      
      // Eğer mevcut aktif proje filtrelenmiş projeler arasında yoksa, ilk projeyi aktif yap
      if (!currentProjectExists) {
        setActiveProject(filteredProjects[0]?.id);
      }
    }
  }, [filteredProjects, activeProject]);

  const handleProjectClick = (projectId) => {
    setActiveProject(projectId);
  };

  // Touch event handlers for swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = filteredProjects.findIndex(p => p.id === activeProject);
      let nextIndex;

      if (isLeftSwipe) {
        // Sol kaydırma - sonraki proje
        nextIndex = (currentIndex + 1) % filteredProjects.length;
      } else {
        // Sağ kaydırma - önceki proje  
        nextIndex = currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1;
      }

      setActiveProject(filteredProjects[nextIndex]?.id);
    }

    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="py-16 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        {/* Category Filter - sadece showCategoryFilter true ise göster */}
        {showCategoryFilter && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <style jsx>{`
          .goo-filter { 
            position: absolute; 
            visibility: hidden; 
          }

          .portfolio-app {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            height: min(99vmin, 660px);
            width: min(60.5vmin, 440px);
            margin: 0 auto;
            max-width: 90vw;
          }

          .portfolio-app > section {
            margin: min(5vmin, 30px) min(8vmin, 40px);
            grid-area: 1 / 1; 
          }

          .portfolio-section {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: 1fr;
            transform-style: preserve-3d;
            perspective: 800px;
            will-change: transform;
          }

          .portfolio-section > * {
            flex: 0 0 100%;
            grid-area: 1 / 1;
          }

          .backgrounds {
            filter: url("#goo");
            pointer-events: none;
          }

          .background {
            will-change: transform;
            border-radius: min(2vmin, 15px);
            background-image: linear-gradient(
              to bottom,
              var(--primary-color, #c776a3),
              var(--secondary-color, #ee8877)
            );
            transition: transform 0.7s cubic-bezier(0.6, 0, 0.2, 1);
            transition-property: transform, transform-origin, z-index;
            padding: min(5vmin, 30px);
            color: white;
            transform-origin: right center;
            transform: translateX(-90%) translateZ(-25vmin) rotateY(40deg);
          }

          .background::before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            z-index: 3;
            background-image: linear-gradient(to bottom, #4b3777, #331847);
            opacity: 0.8;
            transition: inherit;
            transition-property: opacity;
          }

          .background[data-active]::before {
            opacity: 0.01;
          }

          .portfolio-article {
            display: flex;
            flex-direction: column;
            will-change: transform;
            transition: transform 0.7s cubic-bezier(0.6, 0, 0.2, 1);
            transition-property: transform, transform-origin, opacity, z-index;
            padding: min(5vmin, 30px);
            color: white;
            transform-origin: right center;
            transform: translateX(-90%) translateZ(-25vmin) rotateY(40deg);
            opacity: 0;
            cursor: pointer;
            overflow: hidden;
            text-align: center;
            align-items: center;
            position: relative;
          }

          .project-image-container {
            width: min(38vmin, 280px);
            height: min(38vmin, 280px);
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: min(3vmin, 18px);
            overflow: hidden;
            margin: min(1vmin, 8px) auto min(3vmin, 20px) auto;
            position: relative;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            max-width: 280px;
            max-height: 280px;
            flex-shrink: 0;
          }

          .project-image {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            object-fit: cover;
            object-position: center;
            border-radius: 10px;
            transition: transform 0.3s ease;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }

          .project-image:hover {
            transform: scale(1.05);
          }

          .background[data-active],
          .portfolio-article[data-active] {
            transform-origin: center center;
            transform: translateX(0) translateZ(0) rotateY(0deg);
            z-index: 3;
          }

          .portfolio-article[data-active] {
            opacity: 1;
          }

          .background[data-active] ~ .background,
          .portfolio-article[data-active] ~ .portfolio-article {
            z-index: -1;
            transform-origin: left center;
            transform: translateX(140%) translateZ(-25vmin) rotateY(-40deg);
          }

          .background[data-active] + .background,
          .portfolio-article[data-active] + .portfolio-article {
            z-index: 1;
            transform: translateX(90%) translateZ(-25vmin) rotateY(-40deg);
          }

          .portfolio-title {
            font-size: min(5.5vmin, 32px);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: min(3vmin, 20px);
            text-align: center;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .portfolio-description {
            font-size: min(3vmin, 18px);
            font-weight: 400;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.85);
            text-align: center;
            max-width: 85%;
            margin: 0 auto min(2vmin, 15px) auto;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }

          .project-tag {
            position: absolute;
            bottom: min(4vmin, 25px);
            left: min(4vmin, 25px);
            font-size: min(2.2vmin, 13px);
            font-weight: 700;
            padding: min(1.8vmin, 10px) min(3vmin, 16px);
            background: rgba(255, 255, 255, 0.15);
            color: white;
            border-radius: min(5vmin, 25px);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 5;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }

          .swipe-indicator {
            position: relative;
            margin-top: 20px;
            display: none;
            justify-content: center;
            gap: 8px;
            z-index: 10;
          }

          .swipe-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .swipe-dot.active {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.2);
          }

          @media (max-width: 768px) {
            .portfolio-app {
              height: min(92.4vh, 594px);
              width: min(93.5vw, 385px);
              max-width: 95vw;
            }

            .portfolio-app > section {
              margin: min(3vmin, 20px) min(4vmin, 25px);
            }
            
            .portfolio-title {
              font-size: max(24px, 5.5vw);
              font-weight: 700;
              margin-bottom: min(3vmin, 18px);
              text-align: center;
              letter-spacing: -0.02em;
            }
            
            .portfolio-description {
              font-size: max(16px, 4vw);
              font-weight: 400;
              line-height: 1.5;
              text-align: center;
              margin: 0 auto min(2vmin, 12px) auto;
              max-width: 90%;
              color: rgba(255, 255, 255, 0.85);
            }

            .project-image-container {
              width: min(55vmin, 300px);
              height: min(55vmin, 300px);
              border-radius: min(2.5vmin, 15px);
              margin: min(1vmin, 6px) auto min(2.5vmin, 15px) auto;
              max-width: 300px;
              max-height: 300px;
              flex-shrink: 0;
            }

            .project-image {
              width: 100% !important;
              height: 100% !important;
              max-width: 100% !important;
              max-height: 100% !important;
              object-fit: cover;
              object-position: center;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
            }

            .portfolio-article {
              padding: min(3vmin, 20px);
              text-align: center;
              align-items: center;
            }

            .project-tag {
              bottom: min(3vmin, 18px);
              left: min(3vmin, 18px);
              font-size: max(11px, 2.8vw);
              font-weight: 700;
              padding: min(1.2vmin, 8px) min(2.2vmin, 12px);
              letter-spacing: 0.3px;
            }

            .background {
              padding: min(3vmin, 20px);
            }

            .background[data-active] ~ .background,
            .portfolio-article[data-active] ~ .portfolio-article {
              transform: translateX(100%) translateZ(-15vmin) rotateY(-25deg);
            }

            .background[data-active] + .background,
            .portfolio-article[data-active] + .portfolio-article {
              transform: translateX(70%) translateZ(-15vmin) rotateY(-25deg);
            }

            .swipe-indicator {
              display: flex;
              margin-top: 15px;
            }
          }

          @media (max-width: 480px) {
            .portfolio-app {
              height: min(79.2vh, 528px);
              width: min(99vw, 330px);
            }

            .portfolio-app > section {
              margin: min(2vmin, 15px) min(3vmin, 20px);
            }
            
            .portfolio-title {
              font-size: max(22px, 6.5vw);
              font-weight: 700;
              margin-bottom: min(2.5vmin, 16px);
              text-align: center;
              letter-spacing: -0.02em;
            }
            
            .portfolio-description {
              font-size: max(15px, 4.2vw);
              font-weight: 400;
              line-height: 1.5;
              text-align: center;
              margin: 0 auto min(1.5vmin, 10px) auto;
              max-width: 92%;
              color: rgba(255, 255, 255, 0.85);
            }

            .project-image-container {
              width: min(48vmin, 250px);
              height: min(48vmin, 250px);
              margin: min(1vmin, 6px) auto min(2vmin, 12px) auto;
              max-width: 250px;
              max-height: 250px;
              flex-shrink: 0;
            }

            .project-image {
              width: 100% !important;
              height: 100% !important;
              max-width: 100% !important;
              max-height: 100% !important;
              object-fit: cover;
              object-position: center;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
            }

            .portfolio-article {
              padding: min(2vmin, 15px);
              text-align: center;
              align-items: center;
            }

            .project-tag {
              bottom: min(2vmin, 15px);
              left: min(2vmin, 15px);
              font-size: max(10px, 2.5vw);
              font-weight: 700;
              padding: min(1vmin, 6px) min(1.8vmin, 10px);
              letter-spacing: 0.2px;
            }

            .background {
              padding: min(2vmin, 15px);
            }
          }
        `}</style>

        <svg className="goo-filter" viewBox="0 0 1 1">
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -20" result="goo" />
          </filter>
        </svg>

        <div className="portfolio-app" ref={containerRef}>
          <section className="backgrounds portfolio-section">
            {filteredProjects.map((project) => (
              <div 
                key={`bg-${project.id}`}
                className="background" 
                data-active={activeProject === project.id ? 'true' : undefined}
                style={{
                  '--primary-color': project.primaryColor,
                  '--secondary-color': project.secondaryColor
                }}
              />
            ))}
          </section>
          
          <section 
            className="content portfolio-section"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {filteredProjects.map((project) => (
              <article 
                key={`article-${project.id}`}
                className="portfolio-article"
                data-active={activeProject === project.id ? 'true' : undefined}
                onClick={() => handleProjectClick(project.id)}
              >
                <header>
                  <h1 className="portfolio-title">{project.title}</h1>
                </header>
                
                {/* Proje görseli - title altında kare border içinde */}
                {project.image && (
                  <div className="project-image-container">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="project-image"
                    />
                  </div>
                )}
                
                <p className="portfolio-description">{project.description}</p>
                
                {/* Proje kategorisi - sol alt köşede sabit */}
                <span className="project-tag">
                  {project.category}
                </span>
              </article>
            ))}
          </section>
        </div>

        {/* Swipe indicators - slider'ın altında */}
        <div className="swipe-indicator">
          {filteredProjects.map((project) => (
            <div 
              key={`indicator-${project.id}`}
              className={`swipe-dot ${activeProject === project.id ? 'active' : ''}`}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractivePortfolio;
