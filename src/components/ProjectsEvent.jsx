import { useState } from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaExternalLinkAlt, FaPhp
} from 'react-icons/fa';
import {
  SiTailwindcss, SiVite, SiMysql, SiBootstrap
} from 'react-icons/si';

const projects = [
  {
    title: 'Xavi Valverde | Make up Artist',
    techs: [FaHtml5, FaCss3Alt, FaJs, SiTailwindcss, SiVite],
    desc: 'Portfolio visual y elegante para un estilista profesional.',
    img: '/images/xavi.jpg',
    github: 'https://github.com/Albertojs89/XaviValverde',
    link: 'https://xavi-valverde.vercel.app/',
  },
  {
    title: 'Albertojs | Portfolio Developer & Designer',
    techs: [FaHtml5, FaCss3Alt, FaReact, FaJs, SiTailwindcss, SiVite],
    desc: 'Mi portfolio personal y profesional.',
    img: '/images/miPortfolio.jpg',
    github: 'https://github.com/Albertojs89/AlbertoJSDev',
    link: 'https://www.albertojs.com/',
  },
  {
    title: 'Bitepixe PortalGames',
    techs: [FaHtml5, SiBootstrap, FaPhp, FaCss3Alt, SiMysql],
    desc: 'Plataforma gamer con comunidad, análisis y sistema de usuarios.',
    img: '/images/bitepixe.jpg',
    github: 'https://github.com/Albertojs89/M7DAW2_AlbertoJim/tree/UF3/BITEPIXE',
    link: 'https://albertojs89.alwaysdata.net/BITEPIXE/index.php',
  },
];

export default function ProjectsEvent() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % projects.length);
  const prev = () => setCurrent((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <div className="absolute top-[120px] left-[5700px] w-full max-w-[800px] px-4 z-30">
      {/* Desktop view */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        {projects.map((proj, i) => (
          <a
            key={i}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transform transition-all duration-700 opacity-0 animate-fade-in-scale hover:scale-105 hover:shadow-2xl hover:brightness-110 hover:-translate-y-1"
            style={{ animationDelay: `${i * 300}ms`, animationFillMode: 'forwards' }}
          >
            <img src={proj.img} alt={proj.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-white font-sans">
              <h3 className="text-lg font-medium drop-shadow-md">{proj.title}</h3>
              <div className="flex gap-2 text-xl mt-2">
                {proj.techs.map((Icon, idx) => (
                  <Icon key={idx} className="text-[#64ffda]" />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-200 leading-relaxed">
                {proj.desc}
              </p>
              <div className="mt-3 flex gap-4">
                <a href={proj.github} target="_blank" className="text-white text-xl hover:text-[#64ffda]">
                  <FaGithub />
                </a>
                <a href={proj.link} target="_blank" className="text-white text-xl hover:text-[#64ffda]">
                  <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col items-center">
        <a
          href={projects[current].link}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transform transition-all duration-700 opacity-100 animate-fade-in-scale"
        >
          <img src={projects[current].img} alt={projects[current].title} className="w-full h-40 object-cover" />
          <div className="p-4 text-white font-sans">
            <h3 className="text-base font-semibold drop-shadow-md">{projects[current].title}</h3>
            <div className="flex gap-2 text-lg mt-2 flex-wrap">
              {projects[current].techs.map((Icon, idx) => (
                <Icon key={idx} className="text-[#64ffda]" />
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-200 leading-relaxed">
              {projects[current].desc}
            </p>
            <div className="mt-3 flex gap-4">
              <a href={projects[current].github} target="_blank" className="text-white text-xl hover:text-[#64ffda]">
                <FaGithub />
              </a>
              <a href={projects[current].link} target="_blank" className="text-white text-xl hover:text-[#64ffda]">
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        </a>

        {/* Botones de navegación */}
        <div className="flex justify-center gap-6 mt-4">
          <button onClick={prev} className="text-white text-2xl px-4 py-2 rounded-full bg-white/20 hover:bg-white/40">⟵</button>
          <button onClick={next} className="text-white text-2xl px-4 py-2 rounded-full bg-white/20 hover:bg-white/40">⟶</button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}
