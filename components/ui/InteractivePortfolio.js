import { useState, useEffect } from 'react';
import Image from 'next/image';

const InteractivePortfolio = ({ projects, showCategoryFilter = false, categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [activeProject, setActiveProject] = useState(projects[0]?.id || 1); // İlk projenin ID'sini kullan

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
            height: min(90vmin, 600px);
            width: min(55vmin, 400px);
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
          }

          .project-image-container {
            width: min(53vmin, 368px);
            height: min(53vmin, 368px);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: min(12px, 3vmin);
            overflow: hidden;
            margin: min(2vmin, 15px) 0;
            position: relative;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            max-width: 368px;
            max-height: 368px;
          }

          .project-image {
            object-fit: cover;
            border-radius: 10px;
            transition: transform 0.3s ease;
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
            font-size: min(4vmin, 24px);
            line-height: 1.2;
            margin-bottom: min(2vmin, 15px);
          }

          .portfolio-description {
            font-size: min(2.5vmin, 16px);
            line-height: 1.4;
            color: rgba(255, 255, 255, 0.6);
          }

          @media (max-width: 768px) {
            .portfolio-app {
              height: min(70vh, 450px);
              width: min(85vw, 350px);
              max-width: 95vw;
            }

            .portfolio-app > section {
              margin: min(3vmin, 20px) min(4vmin, 25px);
            }
            
            .portfolio-title {
              font-size: max(20px, 5vw);
              margin-bottom: min(3vmin, 20px);
            }
            
            .portfolio-description {
              font-size: max(14px, 3.5vw);
              line-height: 1.5;
            }

            .project-image-container {
              width: min(46vmin, 238px);
              height: min(46vmin, 238px);
              border-radius: min(8px, 2vmin);
              margin: min(2vmin, 12px) auto;
              max-width: 238px;
              max-height: 238px;
            }

            .portfolio-article {
              padding: min(3vmin, 20px);
              text-align: center;
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
          }

          @media (max-width: 480px) {
            .portfolio-app {
              height: min(60vh, 400px);
              width: min(90vw, 300px);
            }

            .portfolio-app > section {
              margin: min(2vmin, 15px) min(3vmin, 20px);
            }
            
            .portfolio-title {
              font-size: max(18px, 6vw);
              margin-bottom: min(2vmin, 15px);
            }
            
            .portfolio-description {
              font-size: max(13px, 4vw);
            }

            .project-image-container {
              width: min(40vmin, 199px);
              height: min(40vmin, 199px);
              margin: min(1.5vmin, 10px) auto;
              max-width: 199px;
              max-height: 199px;
            }

            .portfolio-article {
              padding: min(2vmin, 15px);
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

        <div className="portfolio-app">
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
          
          <section className="content portfolio-section">
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
                <span className="text-xs font-semibold px-3 py-1 bg-white/20 text-white rounded-full mr-2 mt-4 self-start">
                  {project.category}
                </span>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default InteractivePortfolio;
