import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import temp1 from "../assets/temp1.png";
import temp2 from "../assets/temp2.png";
import temp3 from "../assets/temp3.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEdit, FaMagic, FaDownload } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const templates = [
  { id: 1, title: "Modern Resume", desc: "Clean & professional layout.", image: temp1 },
  { id: 2, title: "Creative Resume", desc: "Perfect for designers.", image: temp2 },
  { id: 3, title: "Minimal Resume", desc: "Simple & ATS-friendly.", image: temp3 },
];

const Templates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const sectionRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger refresh zaroori hota hai React mein
    ScrollTrigger.refresh();

    let ctx = gsap.context(() => {
      // FromTo use karne se "Gayab" hone wala masla hal ho jata hai
      gsap.fromTo(".step-card", 
        { y: 100, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".steps-container",
            start: "top 85%", // Jab section 85% screen par aaye tab start ho
            toggleActions: "play none none none", // Ek hi baar chale
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleUseTemplate = (templateId) => {
    navigate(`/template/${templateId}`, { state: { formData } });
  };

  return (
    <>
      <Navbar />
      <div className="template-main min-h-screen transition-colors duration-300">
        
        {/* TEMPLATES SECTION */}
        <section className="px-6 md:px-16 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 template-title">
              Choose Your Resume Template
            </h1>
            <p className="text-lg template-desc max-w-2xl mx-auto">
              Pick a professionally designed resume template and start building your resume.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-425 mx-auto">
            {templates.map((item) => (
              <div key={item.id} className="template-card-theme group rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 border">
                <div className="relative overflow-hidden bg-white p-4 h-64 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 card-title-text">{item.title}</h3>
                  <p className="template-card-p mb-4">{item.desc}</p>
                  <button onClick={() => handleUseTemplate(item.id)} className="btn w-full py-3">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- RE-STYLED STEPS SECTION --- */}
        <section ref={sectionRef} className="steps-container py-24 px-6 md:px-20 transition-all duration-500 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 step-heading">Get Hired in 3 Easy Steps</h2>
              <div className="h-1.5 w-24 step-line mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center">
              {/* Step 1 */}
              <div className="step-card group">
                <div className="icon-wrapper border-teal">
                  <FaEdit className="text-3xl icon-teal" />
                </div>
                <h3 className="text-2xl font-bold mb-3 step-card-title">1. Fill Details</h3>
                <p className="template-card-p">Add your experience, skills, and education in our simple form.</p>
              </div>

              {/* Step 2 */}
              <div className="step-card group">
                <div className="icon-wrapper border-yellow">
                  <FaMagic className="text-3xl icon-yellow" />
                </div>
                <h3 className="text-2xl font-bold mb-3 step-card-title">2. Choose Template</h3>
                <p className="template-card-p">Select a design that matches your style and profession.</p>
              </div>

              {/* Step 3 */}
              <div className="step-card group">
                <div className="icon-wrapper border-cyan">
                  <FaDownload className="text-3xl icon-cyan" />
                </div>
                <h3 className="text-2xl font-bold mb-3 step-card-title">3. Download PDF</h3>
                <p className="template-card-p">Instant preview and one-click download. Ready for your next job!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Templates;