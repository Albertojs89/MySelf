// ProjectsEvent.jsx
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaExternalLinkAlt, FaPhp } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiMysql, SiBootstrap } from 'react-icons/si';

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
  return (
    <div
      className="absolute top-[70px] left-[5700px] w-[800px] z-30 grid grid-cols-1 md:grid-cols-2 gap-8 px-4"
    >
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
            <h3 className="text-lg font-medium text-white drop-shadow-md">{proj.title}</h3>
            <div className="flex gap-2 text-xl mt-2">
              {proj.techs.map((Icon, idx) => (
                <Icon key={idx} className="text-[#64ffda]" />
              ))}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-200 drop-shadow-md break-words whitespace-pre-line">
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

      {/* Animación personalizada */}
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
