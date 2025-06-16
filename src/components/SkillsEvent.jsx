// components/SkillsEvent.jsx
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaBootstrap, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiNextdotjs, SiAdobephotoshop, SiAdobeillustrator, SiOpenai } from 'react-icons/si';
import { useEffect, useState } from 'react';

const icons = [
  { icon: <FaHtml5 />, link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { icon: <FaCss3Alt />, link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { icon: <FaJs />, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { icon: <FaReact />, link: 'https://reactjs.org/' },
  { icon: <SiTailwindcss />, link: 'https://tailwindcss.com/' },
  { icon: <FaBootstrap />, link: 'https://getbootstrap.com/' },
  { icon: <SiVite />, link: 'https://vitejs.dev/' },
  { icon: <SiNextdotjs />, link: 'https://nextjs.org/' },
  { icon: <FaGithub />, link: 'https://github.com/' },
  { icon: <SiAdobephotoshop />, link: 'https://www.adobe.com/products/photoshop.html' },
  { icon: <SiAdobeillustrator />, link: 'https://www.adobe.com/products/illustrator.html' },
  { icon: <FaFigma />, link: 'https://figma.com/' },
  { icon: <SiOpenai />, link: 'https://openai.com/chatgpt' }
];

const SkillsEvent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 250); // delay para fade-in
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`absolute z-30 top-[120px] left-[3750px] w-[900px] flex flex-wrap gap-10 justify-center items-center transition-opacity duration-1000 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ pointerEvents: 'auto' }}
    >
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-[52px] hover:brightness-150 transition duration-300 glow"
          style={{
            animation: 'float 3s ease-in-out infinite',
            animationDelay: `${index * 0.1}s`,
            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.4))'
          }}
        >
          {item.icon}
        </a>
      ))}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default SkillsEvent;
