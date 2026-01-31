import Navbar from "../components/Navbar";
import { FaFileAlt, FaPalette, FaLock } from "react-icons/fa";
import about from "../assets/about.avif"; // resume / workspace image

const About = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 md:px-20 py-20 
        bg-white dark:bg-black 
        text-gray-900 dark:text-gray-100 
        transition-colors duration-300"
      >
        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          
          {/* TEXT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 
              bg-clip-text text-transparent 
              bg-linear-to-r from-[#10b98c] via-[#facc15] to-[#10b98c]">
              About CareerNova
            </h1>

            <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
              CareerNova is a modern resume builder designed to help you create
              professional, ATS-friendly resumes in minutes — no design skills
              required.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Select a template, enter your details, preview live, and download
              your resume instantly as a PDF.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <img
              src={about}
              alt="About CareerNova"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>

        {/* FEATURES */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose CareerNova?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to build a powerful resume — simple, fast, and secure.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* CARD 1 */}
          <div className="p-6 rounded-xl shadow-md 
            bg-gray-50 dark:bg-[#0d312a] 
            hover:-translate-y-2 transition-all duration-300"
          >
            <FaFileAlt className="text-4xl mb-4 text-[#10b98c]" />
            <h3 className="text-xl font-semibold mb-2">
              Easy Resume Creation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Build professional resumes with pre-designed templates in just a few clicks.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-6 rounded-xl shadow-md 
            bg-gray-50 dark:bg-[#0d312a] 
            hover:-translate-y-2 transition-all duration-300"
          >
            <FaPalette className="text-4xl mb-4 text-[#facc15]" />
            <h3 className="text-xl font-semibold mb-2">
              Modern Templates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Clean, creative, and ATS-friendly resume designs for every profession.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-6 rounded-xl shadow-md 
            bg-gray-50 dark:bg-[#0d312a] 
            hover:-translate-y-2 transition-all duration-300"
          >
            <FaLock className="text-4xl mb-4 text-[#48fad6]" />
            <h3 className="text-xl font-semibold mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Firebase Authentication & Firestore keep your data safe and secure.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
