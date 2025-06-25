import React, { useState } from 'react';
import ContactIcons from './ContactIcons';


const ContactEvent = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSend = () => {
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 4000); // Oculta tras 4 segundos
  };

  return (
    <div
      className="absolute z-30 animate-fade-in-soft"
      style={{
        left: '7400px',
        top: '160px',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
      }}
    >
      <div
        className="backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-500 border border-white/10 rounded-2xl px-8 py-8 text-white text-sm font-sans shadow-xl mx-auto w-full max-w-lg"
        style={{ boxShadow: '0 0 20px rgba(255,255,255,0.05)' }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-white tracking-wide">Contacto</h3>
        <form
          action="mailto:bertocover@gmail.com"
          method="POST"
          encType="text/plain"
          onSubmit={handleSend}
        >
          <div className="mb-5 text-left">
            <label htmlFor="name" className="block mb-1 text-white text-sm">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full bg-transparent border-b border-white outline-none py-2 px-2 text-white placeholder-white/60 focus:border-[#64ffda] transition-all duration-300"
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-5 text-left">
            <label htmlFor="email" className="block mb-1 text-white text-sm">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full bg-transparent border-b border-white outline-none py-2 px-2 text-white placeholder-white/60 focus:border-[#64ffda] transition-all duration-300"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-6 text-left">
            <label htmlFor="message" className="block mb-1 text-white text-sm">Mensaje</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              className="w-full bg-transparent border border-white rounded-md outline-none py-3 px-3 text-white placeholder-white/60 resize-none focus:border-[#64ffda] transition-all duration-300"
              placeholder="Tu mensaje..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-all duration-300 font-semibold tracking-wide"
          >
            Enviar ✉️
          </button>
        </form>

        <ContactIcons />


        {/* Mensaje de confirmación */}
        {messageSent && (
          <p className="mt-4 text-green-300 text-sm animate-fade-in">
            ✅ Mensaje enviado. Gracias por contactarme.
          </p>
        )}
      </div>

      {/* Estilos personalizados */}
      <style>
        {`
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

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .animate-fade-in {
            animation: fadeIn 0.6s ease-in forwards;
          }

          @media (max-width: 480px) {
            .max-w-lg {
              padding-left: 1rem;
              padding-right: 1rem;
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ContactEvent;
