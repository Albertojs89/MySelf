import React from 'react';
import { FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';

const ContactEvent = () => {
  return (
    <div
      className="absolute z-30"
      style={{
        left: '7400px',
        top: '160px',
        width: '360px',
        textAlign: 'center',
      }}
    >
      {/* Cuervo animado */}
      <img
        src="/sprites/corvo.png"
        alt="Cuervo"
        className="mx-auto w-[100px] animate-float drop-shadow-md"
        style={{
          animationDelay: '0.2s',
          filter: 'grayscale(100%)',
        }}
      />

      {/* Carta fondo ilustrado */}
      <div
        className="relative animate-fade-in-soft"
        style={{
          backgroundImage: "url('/images/carta.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%',
          height: '500px',
          padding: '140px 30px 100px 30px',
          filter: 'grayscale(100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="text-[#222] text-base flex flex-col gap-5 items-center">
          <h3 className="text-xl font-bold">CONTACTO</h3>

          <a href="mailto:albertojs.dev@gmail.com" className="underline hover:text-blue-700">
            albertojs.dev@gmail.com
          </a>

          <div className="flex gap-6 justify-center text-[26px]">
            <a
              href="https://www.linkedin.com/in/albertojs/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="hover:scale-125 transition-transform text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/Albertojs89"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hover:scale-125 transition-transform text-black"
            >
              <FaGithub />
            </a>
            <a
              href="/cv_alberto.pdf"
              download
              title="Descargar CV"
              className="hover:scale-125 transition-transform text-gray-700"
            >
              <FaFileAlt />
            </a>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes fadeInSoft {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-soft {
            animation: fadeInSoft 2.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ContactEvent;
