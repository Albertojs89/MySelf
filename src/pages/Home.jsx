import { useEffect, useState, useRef } from 'react';
import '../assets/home.css';

const Home = () => {
  // ESTADOS PRINCIPALES
  const [zoomOut, setZoomOut] = useState(false);          // Zoom inicial
  const [started, setStarted] = useState(false);          // Inicio tras botón
  const [showHint, setShowHint] = useState(false);        // Hint de movimiento
  const [movementReady, setMovementReady] = useState(false); // Control de desbloqueo de movimiento
  const [positionX, setPositionX] = useState(300);        // Posición del fondo
  const [sprite, setSprite] = useState('sprite-quieto.gif'); // Imagen del sprite
  const [showMoveMessage, setShowMoveMessage] = useState(false);

  // REFS
  const sceneRef = useRef(null);
  const audioRef = useRef(null);
  const directionRef = useRef(null);
  const animationFrame = useRef(null);

  // INICIAR ESCENA (Botón inicial)
  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play();
  };

  // DISPARAR ZOOM OUT (al pulsar Enter)
  useEffect(() => {
    const handleEnter = (e) => {
      if (!started || movementReady) return;
      if (e.key === 'Enter') {
        setZoomOut(true);
        setTimeout(() => {
        setMovementReady(true); // Habilita el movimiento tras el zoom
        setShowHint(true);       // Muestra el mensaje
        setTimeout(() => setShowHint(false), 9000); // Lo oculta a los 5s
      }, 4000);

      }
    };

    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [started, movementReady]);

  // CONTROL DE MOVIMIENTO (solo si movementReady === true)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!movementReady) return;
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && directionRef.current !== e.key) {
        if (e.key === 'ArrowRight') setSprite('sprite-corre-derecha.gif');
        if (e.key === 'ArrowLeft') setSprite('sprite-corre-izquierda.gif');

        directionRef.current = e.key;
        startMovement(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (!movementReady) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        stopMovement();
        setSprite('sprite-quieto.gif');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movementReady]);

  // ANIMACION DEL MOVIMIENTO
  const startMovement = (key) => {
    const move = () => {
      setPositionX((prev) => {
        const movement = 0.01;
        if (key === 'ArrowRight') return Math.max(prev - movement, -6800);
        if (key === 'ArrowLeft') return Math.min(prev + movement, 300);
        return prev;
      });
      animationFrame.current = requestAnimationFrame(move);
    };
    move();
  };

  const stopMovement = () => {
    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    directionRef.current = null;
  };

  return (
    <div className="bg-black">
      {/* BOTÓN INICIAL */}
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

      {/* ENLACE AL CLÁSICO */}
      {started && (
        <a
          href="#about"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
        >
          AboutMe ↓
        </a>
      )}

      {/* AUDIO */}
      <audio ref={audioRef} src="/audio/musicaFondo.mp3" loop hidden />

      {/* SPRITE MÓVIL (oculto hasta que haya zoom completo) */}
      {zoomOut && movementReady && (
        <img
          key={sprite}
          src={`/sprites/${sprite}`}
          alt="Sprite"
          className="fixed bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300"
        />
      )}

      {/* ESCENA PRINCIPAL */}
      <div className="outer-container" style={{ transform: `translateX(${positionX}px)` }}>
        <div
          ref={sceneRef}
          className={`scene w-[9800px] h-screen relative overflow-hidden mx-auto ${
            zoomOut ? 'scene-zoom-out' : 'scene-zoom'
          } ${started ? 'scene-fade-in' : ''}`}
        >
          {/* FONDO */}
          <div className="absolute inset-0 w-[9800px] h-screen bg-bottom bg-no-repeat bg-[url('/images/fondo.png')] filter blur-[2px] z-0" />

          {/* SUELO */}
          <img
            src="/images/fondoSuelo.png"
            alt="Suelo"
            className="absolute bottom-[-25px]
 left-0 w-[9800px] z-10 pointer-events-none"
          />

          {/* SPRITE INICIAL */}
          {started && (
            <img
              src="/sprites/sprite-quieto.gif"
              alt="Sprite inicial"
              className={`absolute bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300 ${
                zoomOut ? 'sprite-fade-out' : ''
              }`}
            />
          )}

          {/* MENSAJE ENTER / MOVE */}
          {started && !zoomOut && (
            <div className="enter-message absolute bottom-[220px] left-[170px] text-white text-sm z-30 animate-fade-in">
              Pulsa <b className="mx-1">Enter</b> para despertar
            </div>
          )}

          {zoomOut && movementReady && showHint && (
            <div className={`absolute bottom-[480px] left-[190px] text-white text-xl z-30 ${showHint ? 'move-message' : 'hide-move-message'}`}>

              <div className="flex gap-6 items-center text-white text-3xl font-semibold drop-shadow-md">
              {/* Flecha izquierda */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 animate-bounce text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <span>Move</span>

              {/* Flecha derecha */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 animate-bounce text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            </div>
          )}
        </div>
      </div>

      {/* PORTFOLIO CLÁSICO */}
      <div
        id="about"
        className="h-[3000px] w-full bg-black text-white flex items-center justify-center text-4xl scroll-mt-[-1000px]"
      >
        Aquí irá el resto del portfolio clásico
      </div>
    </div>
  );
};

export default Home;