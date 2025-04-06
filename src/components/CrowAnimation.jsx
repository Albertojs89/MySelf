import { useEffect, useState } from 'react';

const CrowAnimation = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isFading, setIsFading] = useState(false); // Nuevo estado para controlar el desvanecimiento

  useEffect(() => {
    const totalFrames = 11;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= totalFrames - 1) {
          clearInterval(interval);
          setIsFading(true); // Activar el desvanecimiento al completar la animación
          return prev;
        }
        return prev + 1;
      });
    }, 80); // velocidad del frame

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={`/sprites/crow/${currentFrame + 1}.png`}
      alt="Crow animation"
      className={`absolute left-[-80px] top-[100px] w-[500px] h-[900px] pointer-events-none z-30 transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`} // Aplicar clases dinámicas para el desvanecimiento
    />
  );
};

export default CrowAnimation;
