import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const ContactIcons = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8 animate-fade-in-soft">
      <h3 className="text-white text-base font-semibold font-sans">Redes & Contacto</h3>

      <div className="flex flex-wrap justify-center gap-6">
        <a href="mailto:bertocover@gmail.com" target="_blank" rel="noopener noreferrer" title="Email">
          <FaEnvelope className="text-white text-3xl hover:text-blue-300 shadow-xl animate-float-soft" />
        </a>
        <a href="https://www.linkedin.com/in/albertojs/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <FaLinkedin className="text-white text-3xl hover:text-blue-400 shadow-xl animate-float-soft" />
        </a>
        <a href="https://github.com/Albertojs89" target="_blank" rel="noopener noreferrer" title="GitHub">
          <FaGithub className="text-white text-3xl hover:text-gray-300 shadow-xl animate-float-soft" />
        </a>
        <a href="https://instagram.com/tuUsuario" target="_blank" rel="noopener noreferrer" title="Instagram">
          <FaInstagram className="text-white text-3xl hover:text-pink-400 shadow-xl animate-float-soft" />
        </a>
      </div>

      <style>
        {`
          @keyframes floatSoft {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }

          .animate-float-soft {
            animation: floatSoft 2.5s ease-in-out infinite;
          }

          @keyframes fadeInSoft {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-soft {
            animation: fadeInSoft 2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ContactIcons;
