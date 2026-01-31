import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import template1 from "../assets/template1.jpg";
import template2 from "../assets/template2.png";
import template3 from "../assets/template3.png";

const templates = [
  { id: 1, title: "Modern Resume", desc: "Clean & professional layout.", image: template1 },
  { id: 2, title: "Creative Resume", desc: "Perfect for designers.", image: template2 },
  { id: 3, title: "Minimal Resume", desc: "Simple & ATS-friendly.", image: template3 },
];

const Templates = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData; // get data from previous page

  const handleUseTemplate = (templateId) => {
    // send formData to template page only when user clicks
    navigate(`/template/${templateId}`, { state: { formData } });
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 bg-white dark:bg-black transition-colors duration-300">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Choose Your Resume Template
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Pick a professionally designed resume template and start building your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((item) => (
          <div
            key={item.id}
            className="rounded-xl shadow-lg bg-gray-50 dark:bg-[#0d312a] overflow-hidden transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-contain bg-white p-4 transition-transform duration-300 hover:scale-105"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4">{item.desc}</p>

              <button
                onClick={() => handleUseTemplate(item.id)}
                className="inline-block w-full text-center px-6 py-3 rounded 
                  text-white font-semibold 
                  bg-linear-to-r from-[#10b98c] to-[#0d312a]
                  hover:opacity-90 transition-all duration-300"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
