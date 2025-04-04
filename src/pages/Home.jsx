import { useEffect, useState, useRef } from 'react';
import '../assets/home.css';

const Home = () => {
  const [zoomOut, setZoomOut] = useState(false);
  const [started, setStarted] = useState(false);
  const sceneRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && started) {
        setZoomOut(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started]);

  const handleStart = () => {
    setStarted(true);
    audioRef.current?.play(); // quitamos el zoom de aquí
  };

  return (
    <div className="bg-black">
      {/* Botón de entrada (solo si no ha empezado) */}
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

      {/* Enlace fijo al portfolio clásico */}
      {started && (
        <a
          href="#about"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-70 hover:opacity-100 transition-opacity duration-300 z-50"
        >
          AboutMe ↓
        </a>
      )}

      {/* Reproductor de audio */}
      <audio ref={audioRef} src="/audio/musicaFondo.mp3" loop hidden />

      {/* Escena inicial */}
      <div className="outer-container translate-x-[300px]">
        <div
          ref={sceneRef}
          className={`scene w-[6800px] h-screen relative overflow-hidden mx-auto ${
            zoomOut ? 'scene-zoom-out' : 'scene-zoom'
          } ${started ? 'scene-fade-in' : ''}`}
        >
          {/* Fondo con blur */}
          <div className="absolute inset-0 w-[6800px] h-screen bg-bottom bg-no-repeat bg-[url('/images/fondo.png')] filter blur-[2px] z-0" />

          {/* Suelo */}
          <img
            src="/images/fondoSuelo.png"
            alt="Suelo"
            className="absolute bottom-0 left-0 w-[6800px] z-10 pointer-events-none"
          />

          {/* Sprite */}
          <img
            src="/sprites/sprite-quieto.gif"
            alt="Sprite"
            className="absolute bottom-[48px] left-[200px] w-[80px] h-[120px] z-20"
          />
        </div>
      </div>

      {/* Portfolio clásico */}
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
