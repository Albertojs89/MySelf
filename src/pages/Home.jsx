import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import '../assets/particles.css';
import CrowAnimation from '../components/CrowAnimation';
import '../assets/cursor.css';
import SkillsEvent from '../components/SkillsEvent';
import ProjectsEvent from '../components/ProjectsEvent';
import ContactEvent from '../components/ContactEvent';
import ContactIcons from '../components/ContactIcons';


// Función para detectar si es dispositivo móvil
const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

const Home = () => {
  const [zoomOut, setZoomOut] = useState(false);
  const [started, setStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [movementReady, setMovementReady] = useState(false);
  const [sprite, setSprite] = useState('sprite-quieto.gif');
  const [showCrow, setShowCrow] = useState(false);
  const [showTreeMessage, setShowTreeMessage] = useState(false);
  const [showEnterMessage, setShowEnterMessage] = useState(false);
  const [showSabioMessage, setShowSabioMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSkills, setShowSkills] = useState(false); // Nuevo estado para evento de Skills
  const [showExperienceText, setShowExperienceText] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [currentSection, setCurrentSection] = useState(''); //Sección actual del minimapa
  const [showContact, setShowContact] = useState(false); //Sección de contacto



  

  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastScrollX = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play();
    setTimeout(() => {
      setShowEnterMessage(true);
    }, 4500);
  };

  const handleMobileStart = () => {
    setStarted(true);
    audioRef.current?.play();
    setTimeout(() => {
      setShowEnterMessage(true);
    }, 4500);
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (!started || movementReady) return;
      if (e.key === 'Enter') {
        setZoomOut(true);
        setTimeout(() => setShowCrow(true), 2000);
        setTimeout(() => {
          setMovementReady(true);
          setShowHint(true);
          setTimeout(() => setShowHint(false), 9000);
        }, 4000);
      }
    };

    // Tap en móvil para "despertar"
    const handleMobileTap = () => {
      if (!started || movementReady) return;
      setZoomOut(true);
      setTimeout(() => setShowCrow(true), 2000);
      setTimeout(() => {
        setMovementReady(true);
        setShowHint(true);
        setTimeout(() => setShowHint(false), 9000);
      }, 4000);
    };

    if (isMobile) {
      window.addEventListener('touchend', handleMobileTap);
    } else {
      window.addEventListener('keydown', handleEnter);
    }
    return () => {
      if (isMobile) {
        window.removeEventListener('touchend', handleMobileTap);
      } else {
        window.removeEventListener('keydown', handleEnter);
      }
    };
  }, [started, movementReady, isMobile]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    let touchStartX = 0;
    let lastTouchX = 0;

    const handleWheel = (e) => {
      if (!movementReady) return;
      e.preventDefault();
      const newScrollX = container.scrollLeft;

      if (newScrollX > lastScrollX.current) {
        setSprite('sprite-corre-derecha.gif');
      } else if (newScrollX < lastScrollX.current) {
        setSprite('sprite-corre-izquierda.gif');
      }
      lastScrollX.current = newScrollX;
      container.scrollLeft += e.deltaY * 2.2;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSprite('sprite-quieto.gif');
      }, 500);
    };

    // Swipe en móvil
    const handleTouchStart = (e) => {
      if (!movementReady) return;
      touchStartX = e.touches[0].clientX;
      lastTouchX = touchStartX;
    };

    const handleTouchMove = (e) => {
      if (!movementReady) return;
      const touchX = e.touches[0].clientX;
      const deltaX = lastTouchX - touchX;
      container.scrollLeft += deltaX * 1.8;

      if (deltaX > 0) {
        setSprite('sprite-corre-derecha.gif');
      } else if (deltaX < 0) {
        setSprite('sprite-corre-izquierda.gif');
      }
      lastTouchX = touchX;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setSprite('sprite-quieto.gif');
      }, 500);
    };

    if (isMobile) {
      container?.addEventListener('touchstart', handleTouchStart, { passive: false });
      container?.addEventListener('touchmove', handleTouchMove, { passive: false });
    } else {
      container?.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (isMobile) {
        container?.removeEventListener('touchstart', handleTouchStart);
        container?.removeEventListener('touchmove', handleTouchMove);
      } else {
        container?.removeEventListener('wheel', handleWheel);
      }
    };
  }, [movementReady, isMobile]);

  useEffect(() => {
    const handleScrollTree = () => {
      if (!showTreeMessage && scrollContainerRef.current?.scrollLeft >= 650 && scrollContainerRef.current?.scrollLeft <= 780) {
        setShowTreeMessage(true);
      }
    };
    const scrollEl = scrollContainerRef.current;
    scrollEl?.addEventListener('scroll', handleScrollTree);
    return () => scrollEl?.removeEventListener('scroll', handleScrollTree);
  }, [showTreeMessage, movementReady]);

    // Evento de skills - muestra los iconos al alcanzar cierta posición
    useEffect(() => {
      const handleScrollSkills = () => {
        const scrollX = scrollContainerRef.current?.scrollLeft || 0;
  
        // Muestra en consola la posición actual del scroll
        console.log('Scroll horizontal:', scrollX);
  
        // Activa el evento de skills una vez
        if (!showSkills && scrollX >= 3600) {
          setShowSkills(true);
          console.log('🎉 Evento de skills activado');
        }
      };
  
      const scrollEl = scrollContainerRef.current;
      scrollEl?.addEventListener('scroll', handleScrollSkills);
  
      return () => scrollEl?.removeEventListener('scroll', handleScrollSkills);
    }, [showSkills]);

    // Evento de proyectos -

    useEffect(() => {
      const handleScrollProjects = () => {
        const x = scrollContainerRef.current?.scrollLeft || 0;
        if (!showProjects && x >= 5600) {
          setShowProjects(true);
          console.log('📦 Evento de proyectos activado');
        }
      };
      scrollContainerRef.current?.addEventListener('scroll', handleScrollProjects);
      return () => scrollContainerRef.current?.removeEventListener('scroll', handleScrollProjects);
    }, [showProjects]);
    

    // Nuevo evento: mostrar texto de experiencia al llegar a la posición 2000 (y que permanezca visible)
    useEffect(() => {
      const handleScrollExperience = () => {
        const scrollX = scrollContainerRef.current?.scrollLeft || 0;

        // Solo activa el evento una vez, cuando se alcanza la posición 2000 o más
        if (
          zoomOut &&
          movementReady &&
          !showExperienceText &&
          scrollX >= 2000
        ) {
          setShowExperienceText(true);
        }
      };

      const scrollEl = scrollContainerRef.current;
      scrollEl?.addEventListener('scroll', handleScrollExperience);

      return () => scrollEl?.removeEventListener('scroll', handleScrollExperience);
    }, [zoomOut, movementReady, showExperienceText]);

  useEffect(() => {
    const cursor = document.getElementById('cursor-glow');
    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursor) {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);


  useEffect(() => {
    const handleSectionHighlight = () => {
      const x = scrollContainerRef.current?.scrollLeft || 0;
  
      if (x >= 0 && x < 1400) setCurrentSection('Inicio');
      else if (x >= 1400 && x < 3000) setCurrentSection('Experiencia');
      else if (x >= 3000 && x < 4400) setCurrentSection('Skills');
      else if (x >= 4400 && x < 6400) setCurrentSection('Proyectos');
      else if (x >= 6400) setCurrentSection('Contacto');
    };
  
    const scrollEl = scrollContainerRef.current;
    scrollEl?.addEventListener('scroll', handleSectionHighlight);
  
    return () => scrollEl?.removeEventListener('scroll', handleSectionHighlight);
  }, []);
  


  useEffect(() => {
    const handleScrollContact = () => {
      const x = scrollContainerRef.current?.scrollLeft || 0;
      if (!showContact && x >= 7300) {
        setShowContact(true);
        console.log('📮 Evento de contacto activado');
      }
    };
  
    const scrollEl = scrollContainerRef.current;
    scrollEl?.addEventListener('scroll', handleScrollContact);
  
    return () => scrollEl?.removeEventListener('scroll', handleScrollContact);
  }, [showContact]);
  

//RENDERIZADO

  return (
    <div className="bg-black">
      <div className="custom-cursor-container">
        <div id="cursor-glow" className="cursor-glow"></div>
      </div>

      {!started && (
  isMobile ? (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 flex-col"
      onClick={handleMobileStart}
      style={{ touchAction: 'manipulation', cursor: 'pointer' }}
    >
      <button
        className="text-white border border-white px-6 py-3 text-xl hover:bg-white hover:text-black transition-all duration-300 rounded-full"
        style={{ fontSize: 22 }}
      >
        Toca para entrar a mi portfolio
      </button>

      <p className="text-white text-xs md:text-sm opacity-70 absolute bottom-6 text-center px-4 w-full">
        Experiencia recomendada: Escritorio, pantalla completa (F11) y auriculares 🎧
      </p>
    </div>
  ) : (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 flex-col">
      <button
        onClick={handleStart}
        className="text-white border border-white px-6 py-3 text-xl hover:bg-white hover:text-black transition-all duration-300 rounded-full"
      >
        Entrar a mi portfolio
      </button>

      <p className="text-white text-xs md:text-sm opacity-70 absolute bottom-6 text-center px-4 w-full">
        Experiencia recomendada: Escritorio, pantalla completa (F11) y auriculares 🎧
      </p>
    </div>
  )
)}


      {/* {started && (
        <Link
          to="/about"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
        >
          AboutMe
        </Link>
      )} */}

      <audio ref={audioRef} src="/audio/musicaFondo.mp3" loop hidden />

      {zoomOut && movementReady && (
        <img
          key={sprite}
          src={`/sprites/${sprite}`}
          alt="Sprite"
          className="fixed bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300"
        />
      )}

      {/* Minimapa de navegación fijo */}
      {zoomOut && movementReady && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex gap-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {[{ pos: 440, label: 'Inicio' }, { pos: 2200, label: 'Experiencia' }, { pos: 3600, label: 'Skills' }, { pos: 5190, label: 'Proyectos' }, { pos: 7300, label: 'Contacto' }].map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                scrollContainerRef.current?.scrollTo({
                  left: item.pos,
                  behavior: 'smooth',
                });
              }}
              className={`w-4 h-4 rounded-full shadow-md transition-transform duration-200 ${
                currentSection === item.label ? 'scale-125 bg-[#64ffda]' : 'bg-white hover:scale-125'
              }`}
              title={item.label}
            ></button>
          ))}
        </div>
      )}



      {/* Flechas móviles para mover el sprite */}
      {zoomOut && movementReady && isMobile && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-10 z-50 pointer-events-auto">
          <button
            aria-label="Mover a la izquierda"
            className="bg-white/20 hover:bg-white/40 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg backdrop-blur transition-all duration-200 active:scale-90"
            style={{ boxShadow: '0 2px 16px 0 rgba(255,255,255,0.12)' }}
            onClick={() => {
              const container = scrollContainerRef.current;
              if (container) {
                container.scrollTo({
                  left: container.scrollLeft - 160,
                  behavior: 'smooth'
                });
                setSprite('sprite-corre-izquierda.gif');
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                  setSprite('sprite-quieto.gif');
                }, 500);
              }
            }}
          >
            <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 28L8 16l12-12" />
            </svg>
          </button>
          <button
            aria-label="Mover a la derecha"
            className="bg-white/20 hover:bg-white/40 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg backdrop-blur transition-all duration-200 active:scale-90"
            style={{ boxShadow: '0 2px 16px 0 rgba(255,255,255,0.12)' }}
            onClick={() => {
              const container = scrollContainerRef.current;
              if (container) {
                container.scrollTo({
                  left: container.scrollLeft + 160,
                  behavior: 'smooth'
                });
                setSprite('sprite-corre-derecha.gif');
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                  setSprite('sprite-quieto.gif');
                }, 500);
              }
            }}
          >
            <svg width="32" height="32" fill="none" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l12 12-12 12" />
            </svg>
          </button>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="w-screen h-screen overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth"
      >
        <div
          className={`scene w-[9800px] h-screen relative inline-block ${zoomOut ? 'scene-zoom-out' : 'scene-zoom'} ${started ? 'scene-fade-in' : ''}`}
        >
          <div
            className="absolute rounded-full animate-pulse pointer-events-none"
            style={{
              top: '490px',
              left: '250px',
              width: '250px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0) 900%)',
              filter: 'blur(23px)',
              zIndex: 5,
            }}
          ></div>

          {showTreeMessage && (
            <div
              className="absolute text-white text-xl md:text-3xl text-center z-30 transition-opacity duration-[9000ms] opacity-0 animate-fade-in-slow"
              style={{ top: '250px', left: '690px', width: '400px', pointerEvents: 'none' }}
            >
              Frontend Developer<br />&<br />Creative Designer
            </div>
          )}

{showExperienceText && (
  
<div
  className="absolute z-30 group"
  style={{
    top: '450px',
    left: '2300px',
    width: '600px',
    pointerEvents: 'auto'
  }}
>
  {/* Texto principal */}
  <div
    className="text-white text-xl md:text-2xl text-center transition-opacity duration-[9000ms] opacity-0 animate-fade-in-slow"
  >
    Experiencia en Desarrollo <br />Diseño UX/UI <br />& Illustration
  </div>

  {/* Panel lateral o inferior según pantalla */}
  <div
    className="absolute md:left-[520px] left-0 md:top-0 top-[100px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex md:flex-row flex-col md:items-start items-center gap-4 md:pl-0 pl-4"
  >
    {/* Línea blanca animada */}
    <div
      className="bg-white"
      style={{
        width: '2px',
        height: '120px',
        boxShadow: '0 0 6px white',
        transform: 'scaleY(0)',
        transformOrigin: 'top',
        animation: 'growLine 0.5s ease-in-out forwards'
      }}
    ></div>

    {/* Lista de experiencias */}
    <div className="text-white text-sm md:text-base leading-relaxed font-light space-y-2 text-left md:pt-0 pt-2">
      <p>- Menarini Group – Desarrollador/Diseñador</p>
      <p>- Freepik – Diseñador</p>
      <p>- Diseñador Creativo</p>
      <p>- Proyectos propios como desarrollador frontend</p>
    </div>
  </div>

  {/* Animación para la línea */}
  <style>
    {`
      .group:hover div[style*="scaleY"] {
        animation: growLine 0.5s ease-in-out forwards;
      }

      @keyframes growLine {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
      }
    `}
  </style>
</div>

)}


          <img
            src="/sprites/sabio.gif"
            alt="Sabio"
            className="sabio-sprite absolute w-[90px] h-[170px] z-20"
            style={{ left: '2240px', filter: 'blur(1.3px)' }}
            onMouseEnter={() => setShowSabioMessage(true)}
            onMouseLeave={() => setShowSabioMessage(false)}
          />




          {showSabioMessage && (
            <div
              className="absolute sabio-sprite bg-white text-black text-sm p-3 rounded-md shadow-md font-sans bocadillo-animado"
              style={{ fontSize: '20px', top: '80px', left: '2340px', maxWidth: '300px', zIndex: 20 }}
            >
              Keep going... <br />your path is just beginning.
            </div>
          )}

          <div className="absolute inset-0 w-[9800px] h-screen bg-bottom bg-no-repeat bg-[url('/images/fondo2.jpg')] filter blur-[2px] z-0" />

          <img
            src="/images/fondoSuelo.png"
            alt="Suelo"
            className="absolute bottom-[-25px] left-0 w-[9800px] z-10 pointer-events-none"
          />

          {started && (
            <img
              src="/sprites/sprite-quieto.gif"
              alt="Sprite inicial"
              className={`absolute bottom-[58px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300 ${zoomOut ? 'sprite-fade-out' : ''}`}
            />
          )}

          {started && !zoomOut && showEnterMessage && (
            <div className="enter-message absolute bottom-[220px] left-[130px] text-white text-sm z-30 animate-fade-in flex items-center gap-2">
              {isMobile ? (
                <>
                  Toca la pantalla para despertar
                </>
              ) : (
                <>
                  Pulsa
                  <img
                    src="https://www.svgrepo.com/show/489753/keyboard-enter.svg"
                    alt="Enter"
                    className="w-6 h-6 animate-soft-blink invert"
                  />
                  para despertar
                </>
              )}
            </div>
          )}

{zoomOut && movementReady && (
  <div
    className={`enter-message absolute bottom-[480px] left-[190px] text-white text-xl z-30 animate-fade-in ${
      !showHint ? 'fade-out' : ''
    }`}
  >
    <div className="flex items-center gap-4 text-white font-semibold drop-shadow-md">
      <img
        src="/images/rueda.png"
        alt="Icono de scroll"
        style={{
          width: '40px',
          height: 'auto',
          filter: 'invert(1) brightness(2)',
          animation: 'softBlink 2s infinite alternate'
        }}
      />
      <p
        style={{
          color: 'white',
          fontSize: '1.25rem',      // Más grande y visible
          fontWeight: 600,
          fontFamily: 'inherit',
          margin: 0                  // Elimina margen innecesario
        }}
      >
        Scroll to move
      </p>
    </div>
  </div>
)}




          {showCrow && <CrowAnimation />}
          {showSkills && <SkillsEvent />}
          {showProjects && <ProjectsEvent />}
          {showContact && <ContactEvent />}
          


        </div>
      </div>
    </div>
  );
};

export default Home;