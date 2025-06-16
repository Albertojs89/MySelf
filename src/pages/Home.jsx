import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import '../assets/particles.css';
import CrowAnimation from '../components/CrowAnimation';
import '../assets/cursor.css';
import SkillsEvent from '../components/SkillsEvent';


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

  return (
    <div className="bg-black">
      <div className="custom-cursor-container">
        <div id="cursor-glow" className="cursor-glow"></div>
      </div>

      {!started && (
        isMobile ? (
          <div
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            onClick={handleMobileStart}
            style={{ touchAction: 'manipulation', cursor: 'pointer' }}
          >
            <button
              className="text-white border border-white px-6 py-3 text-xl hover:bg-white hover:text-black transition-all duration-300 rounded-full"
              style={{ fontSize: 22 }}
            >
              Toca para entrar a mi portfolio
            </button>
          </div>
        ) : (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <button
              onClick={handleStart}
              className="text-white border border-white px-6 py-3 text-xl hover:bg-white hover:text-black transition-all duration-300 rounded-full"
            >
              Entrar a mi portfolio
            </button>
          </div>
        )
      )}

      {started && (
        <Link
          to="/about"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
        >
          AboutMe
        </Link>
      )}

      <audio ref={audioRef} src="/audio/musicaFondo.mp3" loop hidden />

      {zoomOut && movementReady && (
        <img
          key={sprite}
          src={`/sprites/${sprite}`}
          alt="Sprite"
          className="fixed bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300"
        />
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

          
          

          <img
            src="/sprites/sabio.gif"
            alt="Sabio"
            className="absolute w-[90px] h-[170px] z-20"
            style={{ top: '40px', left: '2240px', filter: 'blur(1.3px)' }}
            onMouseEnter={() => setShowSabioMessage(true)}
            onMouseLeave={() => setShowSabioMessage(false)}
          />

          {showSabioMessage && (
            <div
              className="absolute bg-white text-black text-sm p-3 rounded-md shadow-md font-sans bocadillo-animado"
              style={{ fontSize: '20px', top: '50px', left: '2340px', maxWidth: '300px', zIndex: 20 }}
            >
                  Keep going... <br></br>your path is just beginning.

            </div>
          )}

          <div className="absolute inset-0 w-[9800px] h-screen bg-bottom bg-no-repeat bg-[url('/images/fondo.png')] filter blur-[2px] z-0" />

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

        </div>
      </div>
    </div>
  );
};

export default Home;