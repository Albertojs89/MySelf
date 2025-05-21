// Home.jsx con animación del cuervo retrasada y efecto visual en mensaje 'Move'
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import '../assets/particles.css';
import CrowAnimation from '../components/CrowAnimation';
import '../assets/cursor.css';

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

  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastScrollX = useRef(0);
  const timeoutRef = useRef(null);

  const handleStart = () => {
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
        setTimeout(() => setShowCrow(true), 2000); // lanzar cuervo tras 2s
        setTimeout(() => {
          setMovementReady(true);
          setShowHint(true);
          setTimeout(() => setShowHint(false), 9000);
        }, 4000);
      }
    };
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [started, movementReady]);

  useEffect(() => {
    const container = scrollContainerRef.current;
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
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, [movementReady]);

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
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <button
            onClick={handleStart}
            className="text-white border border-white px-6 py-3 text-xl hover:bg-white hover:text-black transition-all duration-300 rounded-full"
          >
            Entrar a mi portfolio
          </button>
        </div>
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
              mmmhh... Look this...
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
              Pulsa
              <img
                src="https://www.svgrepo.com/show/489753/keyboard-enter.svg"
                alt="Enter"
                className="w-6 h-6 animate-soft-blink invert"
              />
              para despertar
            </div>
          )}

          {zoomOut && movementReady && showHint && (
            <div className="enter-message absolute bottom-[480px] left-[190px] text-white text-xl z-30 animate-fade-in">
              <div className="flex gap-6 items-center text-white text-3xl font-semibold drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 animate-bounce text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <img
                  src="/images/icono-raton-transparente.png"
                  alt="Rueda del ratón"
                  className="w-6 h-6 animate-soft-blink invert"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 animate-bounce text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          )}

          {showCrow && <CrowAnimation />}
        </div>
      </div>
    </div>
  );
};

export default Home;