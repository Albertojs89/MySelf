const AboutMe = () => {
  return (
    <div className="min-h-screen bg-black text-white px-8 py-12 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Sobre mí</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Presentación</h2>
        <p className="text-lg leading-relaxed">
          Soy Alberto, desarrollador frontend y diseñador creativo  con pasión por el arte, música y la experiencia interactiva.
          Este portfolio es una muestra de cómo combino lo técnico con lo visual para crear experiencias únicas.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Habilidades</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>HTML, CSS, JavaScript</li>
          <li>React + Vite</li>
          <li>PHP y MySQL</li>
          <li>Diseño UI/UX con Figma</li>
          <li>Edición gráfica e ilustración digital</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Proyectos destacados</h2>
        <p className="text-lg">tarjetas con proyectos</p>
      </section>

      
       {/* botón para volver a la home */}

      <div className="fixed bottom-4 flex items-center justify-center">
        <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300">
        Volver a la Home
        </a>
      </div>

    </div>
 
  );
};

export default AboutMe;
