import { useEffect, useState, useRef } from 'react';
import '../assets/home.css';

const Home = () => {
const [zoomOut, setZoomOut] = useState(false);        // Controla si se aplica el efecto de zoom-out
const [started, setStarted] = useState(false);        // Indica si se ha pulsado el botón de entrada
const [showHint, setShowHint] = useState(false);      // Muestra el mensaje "Move"
const [positionX, setPositionX] = useState(300);      // Posición X del fondo
const [sprite, setSprite] = useState('sprite-quieto.gif'); // Imagen actual del sprite
const sceneRef = useRef(null);           // Referencia al contenedor de la escena
const audioRef = useRef(null);           // Referencia al elemento de audio
const directionRef = useRef(null);       // Guarda la dirección actual (left/right)
const animationFrame = useRef(null);     // Referencia a la animación en curso


// CONTROL DE TECLAS: Movimiento y cambio de sprite //

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!started) return;

      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && directionRef.current !== e.key) {
        if (e.key === 'ArrowRight') {
          setSprite('sprite-corre-derecha.gif');
        }
        if (e.key === 'ArrowLeft') {
          setSprite('sprite-corre-izquierda.gif');
        }

        setZoomOut(true);
        setShowHint(false);
        directionRef.current = e.key;
        startMovement(e.key);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        stopMovement();
      }
      setSprite('sprite-quieto.gif');

    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [started]);

  // INICIO: BOTON PARA COMENZAR LA ANIMACION //

  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play();
  };


  // ANIMACION: Movimiento del fondo y sprite //

  const startMovement = (key) => {
  const move = (time) => {
    setPositionX((prev) => {
      const movement = 0.01; // VELOCIDAD AJUSTABLE
      if (key === 'ArrowRight') return Math.max(prev - movement, -6800);
      if (key === 'ArrowLeft') return Math.min(prev + movement, 300);
      return prev;
    });

    animationFrame.current = requestAnimationFrame(move);
  };
  move(); // ← Esto ejecuta la primera de inmediato

  // Actualiza la posición inmediatamente antes de iniciar la animación
  setPositionX((prev) => {
    const movement = 0.01; // VELOCIDAD AJUSTABLE
    if (key === 'ArrowRight') return Math.max(prev - movement, -6800);
    if (key === 'ArrowLeft') return Math.min(prev + movement, 300);
    return prev;
  });

  animationFrame.current = requestAnimationFrame(move);
};



  const stopMovement = () => {
    cancelAnimationFrame(animationFrame.current);
    animationFrame.current = null;
    directionRef.current = null;
  };

  //MENSAJE: "Move"< > //

  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => setShowHint(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [started]);





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

      {started && (
        <a
          href="#about"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
        >
          AboutMe ↓
        </a>
      )}

      <audio ref={audioRef} src="/audio/musicaFondo.mp3" loop hidden />

      
      {/* sprite moviendose fuera del fondo */}
       {zoomOut && (
          <img
            key={sprite}
            src={`/sprites/${sprite}`}
            alt="Sprite"
            className="fixed bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300"
          />
        )}


          {/* Fondo animado con desplazamiento */}


      <div className="outer-container" style={{ transform: `translateX(${positionX}px)` }}>
        <div
          ref={sceneRef}
          className={`scene w-[6800px] h-screen relative overflow-hidden mx-auto ${
            zoomOut ? 'scene-zoom-out' : 'scene-zoom'
          } ${started ? 'scene-fade-in' : ''}`}
        >
          <div className="absolute inset-0 w-[6800px] h-screen bg-bottom bg-no-repeat bg-[url('/images/fondo.png')] filter blur-[2px] z-0" />

          <img
            src="/images/fondoSuelo.png"
            alt="Suelo"
            className="absolute bottom-0 left-0 w-[6800px] z-10 pointer-events-none"
          />


          {/* sprite inicial solo */}
       {started && (
          <img
            src="/sprites/sprite-quieto.gif"
            alt="Sprite zoom inicial"
            className={`absolute bottom-[78px] left-[200px] w-[80px] h-[120px] z-20 pointer-events-none transition-all duration-300 ${
              zoomOut ? 'sprite-fade-out' : ''
            }`}
          />
        )}





        {/* Mensaje "Move" */}


          {started && (
            <div
              className={`absolute bottom-[180px] left-[190px] text-white text-sm z-30 transition-opacity duration-500 ${
                showHint ? 'animate-fade-in' : 'fade-out'
              }`}
            >
              <div className="flex gap-3 items-center text-white text-sm mb-8">
                {/* Flecha izquierda */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-bounce">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <span>Move</span>
                {/* Flecha derecha */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 animate-bounce">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

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
