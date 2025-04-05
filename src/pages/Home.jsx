import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/home.css';
import '../assets/particles.css';

const Home = () => {
  //ESTADOS
  const [zoomOut, setZoomOut] = useState(false); // Controla si se hace el zoom hacia atrás
  const [started, setStarted] = useState(false);// Controla si se ha iniciado tras pulsar el botón
  const [showHint, setShowHint] = useState(false); // Muestra el mensaje de movimiento
  const [movementReady, setMovementReady] = useState(false); // Controla si el personaje puede moverse
  const [positionX, setPositionX] = useState(300);// Posición horizontal del fondo (para scroll horizontal)
  const [sprite, setSprite] = useState('sprite-quieto.gif'); // Imagen actual del sprite
  //REFERENCIAS
  const sceneRef = useRef(null);
  const audioRef = useRef(null);
  const directionRef = useRef(null);
  const animationFrame = useRef(null);

   // FUNCIÓN AL PULSAR EL BOTÓN INICIAL
  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play();
  };
// EFECTO: Detecta Enter para iniciar el zoom y movimiento
  useEffect(() => {
    const handleEnter = (e) => {
      if (!started || movementReady) return;
      if (e.key === 'Enter') {
        setZoomOut(true);
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

   // EFECTO: Control de teclas izquierda y derecha para mover
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

  // ANIMACIÓN CONTINUA DE MOVIMIENTO HORIZONTAL DEL ESCENARIO
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
// DETENER MOVIMIENTO
  const stopMovement = () => {
    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    directionRef.current = null;
  };

  return (
    <div className="bg-black">
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
      {/* ENLACE A OTRA PÁGINA */}
      {started && (
        <Link
          to="/about"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
        >
          AboutMe 
        </Link>
      )}
      {/* AUDIO DE FONDO */}
      <audio ref={audioRef} src="/audio/musicaFondo.mp3" loop hidden />

         {/* SPRITE QUE APARECE TRAS EL ZOOM */}
      {zoomOut && movementReady && (
        <img
          key={sprite}
          src={`/sprites/${sprite}`}
          alt="Sprite"
          className="fixed bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300"
        />
      )}


    {/* ESCENA COMPLETA CON FONDO Y SPRITE INICIAL */}


      <div className="outer-container" style={{ transform: `translateX(${positionX}px)` }}>
        <div
          ref={sceneRef}
          className={`scene w-[9800px] h-screen relative overflow-hidden mx-auto ${zoomOut ? 'scene-zoom-out' : 'scene-zoom'} ${started ? 'scene-fade-in' : ''}`}
        >
          {/* EFECTO DE LUZ EN FAROLA */}
          <div
            className="absolute rounded-full animate-pulse pointer-events-none"
            style={{
              top: '490px',
              left: '250px',
              width: '250px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0) 900%)',
              filter: 'blur(25px)',
              zIndex: 5
            }}
          ></div>

          <div className="absolute inset-0 w-[9800px] h-screen bg-bottom bg-no-repeat bg-[url('/images/fondo.png')] filter blur-[2px] z-0" />

          <img
            src="/images/fondoSuelo.png"
            alt="Suelo"
            className="absolute bottom-[-25px] left-0 w-[9800px] z-10 pointer-events-none"
          />

     {/* SPRITE ESTÁTICO CON BLUR */}
          {started && (
            <img
              src="/sprites/sprite-quieto.gif"
              alt="Sprite inicial"
              className={`absolute bottom-[58px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300 ${zoomOut ? 'sprite-fade-out' : ''}`}
            />
          )}
          {/* MENSAJE DE INICIO */}
          {started && !zoomOut && (
            <div className="enter-message absolute bottom-[220px] left-[170px] text-white text-sm z-30 animate-fade-in">
              Pulsa <b className="mx-1">Enter</b> para despertar
            </div>
          )}
          {/* MENSAJE DE MOVIMIENTO */}
          {zoomOut && movementReady && showHint && (
            <div className={`absolute bottom-[480px] left-[190px] text-white text-xl z-30 ${showHint ? 'move-message' : 'hide-move-message'}`}>
              <div className="flex gap-6 items-center text-white text-3xl font-semibold drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 animate-bounce text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <span>Move</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 animate-bounce text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
