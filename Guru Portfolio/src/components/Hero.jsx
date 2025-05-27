export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen bg-[#1E1E1E] text-white">
      <div className="w-1/2 flex flex-col justify-center px-10 z-10">
        <h1 className="text-4xl font-bold mb-4">
          Hi, I’m Gurusewak — <span className="text-orange-500">Full Stack Developer</span>
        </h1>
        <p className="mb-6">
          I build high-quality MERN applications with a focus on UX and performance.
        </p>
        <div className="flex gap-4">
          <a
  href="/Gurusewak_Resume.pdf"
  download
  className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600 transition"
>
  Download CV
</a>

          <a href="#contact">
  <button className="border border-orange-500 px-4 py-2 rounded text-orange-500 hover:bg-orange-500 hover:text-white transition">
    Contact Me
  </button>
</a>
        </div>
      </div>

      <div className="w-1/2 relative z-10 flex items-center justify-center">
        <img src="/image.png" alt="Gurusewak" className="h-160 object-contain" />
      </div>

      <div className="absolute left-1/2 top-0 h-full w-0 border-l-[5px] border-orange-500 skew-x-[-20deg] z-0"></div>
    </section>
  );
}
