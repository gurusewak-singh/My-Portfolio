import { motion } from 'framer-motion';
import SplitText from './SplitText';
import RotatingText from './RotatingText';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen bg-dark-100 text-white overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 z-10">
        <motion.div
          className="md:w-1/2 flex flex-col justify-center text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <SplitText
              text="Hi, I’m Gurusewak —"
              className="inline-block"
              delay={50}
              duration={0.1}
              ease="power2.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
            <br />
            {/* A_ The new rotating text effect */}
            <div className="text-2xl md:text-5xl font-semibold text-white mb-6 flex items-center pt-4 gap-3">
              {/* A_ WRAP RotatingText in a motion.div with the layout prop */}
              <motion.div
                layout // This is the magic prop that animates width changes
                transition={{ type: 'spring', stiffness: 350, damping: 35 }} // A spring transition feels natural
              >
                <RotatingText
                  texts={["Fullstack Developer", "Software Development Engg.", "Dev Ops", "Data Structures & Algos"]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                  staggerFrom={"last"}
                  splitBy={"characters"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.02}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </motion.div>
            </div>
          </h1>

          <p className="mb-8 text-lg text-gray-300">
            I architect and build robust MERN applications with a focus on user experience and peak performance.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="/Gurusewak_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary px-6 py-3 rounded text-white font-semibold hover:bg-primary-dark transition-colors duration-300"
            >
              View CV
            </a>
            <a href="#contact">
              <button className="border border-primary px-6 py-3 rounded text-primary font-semibold hover:bg-primary hover:text-white transition-colors duration-300">
                Contact Me
              </button>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
          <motion.img
            src="/image.png"
            alt="Gurusewak Singh"
            className="h-auto max-h-[70vh] object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 h-full w-1/2 bg-dark-200/30 skew-x-[-15deg] origin-top-left z-0" />
    </section>
  );
}