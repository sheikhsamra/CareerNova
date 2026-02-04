import Navbar from "../components/Navbar";
import { FaFileAlt, FaPalette, FaLock } from "react-icons/fa";
import about from "../assets/about.avif"; 
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const About = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="about-main min-h-screen px-6 md:px-20 py-20 mx-auto max-w-425 transition-colors duration-300">
        
        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

          <div className="relative group">
            <div className="image-glow-effect"></div>
            <img
              src={about}
              alt="About CareerNova"
              className="relative rounded-xl w-full transform transition duration-500 hover:scale-[1.02]"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold heading">
              About CareerNova
            </h1>
            <p className="text-lg md:text-xl about-text leading-relaxed">
              CareerNova is a modern resume builder designed to help you create
              professional, <span className="highlight-text">ATS-friendly</span> resumes in minutes.
            </p>
            <p className="text-lg about-text leading-relaxed">
              Select a template, enter your details, preview live, and download
              your resume instantly as a PDF.
            </p>
            
            <div className="pt-4">
               <Link to={user ? "/Createresume" : "/signup"}>
                  <button className="btn">
                    {user ? "Create My Resume" : "Get Started Now"}
                  </button>
               </Link>
            </div>
          </div>
        </div>

        {/* FEATURES HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 about-title">
            Why Choose CareerNova?
          </h2>
          <div className="h-1 w-20 custom-line mx-auto rounded-full mb-6"></div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* CARD 1 */}
          <div className="about-card-theme group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-3 shadow-sm">
            <div className="w-14 h-14 icon-bg-teal rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#10b98c] transition-colors">
              <FaFileAlt className="text-3xl icon-teal group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 card-title">Easy Creation</h3>
            <p className="about-text">Build professional resumes with pre-designed templates in just a few clicks.</p>
          </div>

          {/* CARD 2 */}
          <div className="about-card-theme group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-3 shadow-sm">
            <div className="w-14 h-14 icon-bg-yellow rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#facc15] transition-colors">
              <FaPalette className="text-3xl icon-yellow group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 card-title">Modern Designs</h3>
            <p className="about-text">Clean, creative, and ATS-friendly resume designs for every profession.</p>
          </div>

          {/* CARD 3 */}
          <div className="about-card-theme group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-3 shadow-sm">
            <div className="w-14 h-14 icon-bg-cyan rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#48fad6] transition-colors">
              <FaLock className="text-3xl icon-cyan group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 card-title">Secure & Private</h3>
            <p className="about-text">Firebase Authentication & Firestore keep your data safe and secure.</p>
          </div>

        </div>
      </main>
    </>
  );
};

export default About;