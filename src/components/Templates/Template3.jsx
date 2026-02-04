import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Template3 = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const cvRef = useRef(null);
  const [scale, setScale] = useState(1);

  const [data, setData] = useState({
    fullName: "JULIANNE MARLOW",
    jobTitle: "Content Strategist & Copywriter",
    profile:
      "A storytelling enthusiast with over 6 years of experience in crafting compelling narratives for digital brands. Dedicated to bridging the gap between business goals and user needs through creative content.",
    email: "julianne.m@example.com",
    phone: "+1 234 567 890",
    location: "Austin, Texas",
    website: "www.jmarlow.com",
    linkedIn: "linkedin.com/in/jmarlow",
    skills: ["SEO Strategy", "Copywriting", "Email Marketing", "Brand Voice", "Social Media"],
    experience: [
      {
        role: "Senior Strategist",
        company: "Echo Media",
        year: "2021 - Present",
        desc: "Developing multi-channel content strategies for lifestyle and tech clients.",
      },
      {
        role: "Content Writer",
        company: "The Daily Hub",
        year: "2018 - 2021",
        desc: "Produced over 200+ articles and improved site traffic by 50% through SEO optimization.",
      },
    ],
    education: [{ degree: "Bachelor of Arts in Journalism", school: "University of Texas", year: "2014 - 2018" }],
    languages: ["English (Native)", "Italian (Fluent)"],
  });

  useEffect(() => {
    // Check if there's loaded resume data in localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const loadedResume = localStorage.getItem('loadedResume');
      if (loadedResume) {
        try {
          const resumeData = JSON.parse(loadedResume);
          setData(prev => ({ ...prev, ...resumeData }));
          localStorage.removeItem('loadedResume'); // Clear after loading
        } catch (error) {
          console.error('Error loading resume data:', error);
        }
      } else if (formData) {
        setData((prev) => ({ ...prev, ...formData }));
      }
    } else if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, [formData]);

  // Handle mobile scaling
  useEffect(() => {
    const resize = () => {
      const screenWidth = window.innerWidth;
      const cvWidth = 794; // 210mm in px
      setScale(screenWidth < cvWidth ? screenWidth / cvWidth : 1);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null && Array.isArray(data[field])) {
      const updated = [...data[field]];
      if (typeof updated[index] === "object") {
        updated[index][subField] = value;
      } else {
        updated[index] = value;
      }
      setData({ ...data, [field]: updated });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  // Function to save resume data
  const saveResume = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const resumeData = {
          ...data,
          timestamp: new Date().toISOString(),
          template: 'template3'
        };
        localStorage.setItem('savedResume', JSON.stringify(resumeData));
        alert('Resume saved successfully!');
      } catch (error) {
        console.error('Error saving resume:', error);
        alert('Failed to save resume. Please try again.');
      }
    } else {
      alert('Unable to save resume. LocalStorage not available.');
    }
  };

  const downloadPDF = async () => {
    const element = cvRef.current;
    if (!element) {
      alert('Resume element not found. Please try again.');
      return;
    }

    try {
      // Create a clone of the element for PDF generation without transforms
      const clone = element.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.left = '-9999px';
      clone.style.top = '0';
      clone.style.transform = 'scale(1)';
      clone.style.transformOrigin = 'top left';
      clone.style.width = '210mm'; // A4 width
      clone.style.height = '297mm'; // A4 height

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: clone.scrollWidth,
        height: clone.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Handle content that spans multiple pages
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resume.pdf');

      // Remove the clone from the DOM
      document.body.removeChild(clone);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');

      // Ensure clone is removed in case of error
      const existingClone = document.querySelector('[style*="position: fixed"][style*="left: -9999px"]');
      if (existingClone) {
        document.body.removeChild(existingClone);
      }
    }
  };


  return (
    <div className="min-h-screen bg-[#F4F1EE] py-12 flex justify-center items-start font-serif mt-20 overflow-x-hidden">
      <div className="flex justify-center w-full">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <div
            ref={cvRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-2xl flex flex-col overflow-hidden"
          >
        {/* HEADER */}
        <div className="bg-[#4A3728] text-[#EAE0D5] p-12 text-center">
          <input
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="text-5xl font-normal tracking-[0.15em] w-full bg-transparent focus:outline-none text-center uppercase"
          />
          <div className="h-px w-24 bg-[#C6AC8F] mx-auto my-4"></div>
          <input
            value={data.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            className="text-lg tracking-[0.2em] font-light text-[#C6AC8F] w-full bg-transparent focus:outline-none text-center uppercase"
          />
        </div>

        {/* BODY */}
        <div className="flex flex-1 flex-row p-12 gap-12">
          {/* LEFT */}
          <div className="w-1/3 flex flex-col gap-8 border-r border-gray-100 pr-8">
            {/* Contact */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-600">
                {["email", "phone", "location", "website"].map((f) => (
                  <EditableItem key={f} value={data[f]} onChange={(v) => handleChange(f, v)} />
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-4">Core Skills</h3>
              <ul className="space-y-1">
                {data.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#A75D5D] rounded-full"></span>
                    <input
                      value={skill}
                      onChange={(e) => handleChange("skills", e.target.value, idx)}
                      className="text-sm text-gray-600 focus:outline-none w-full bg-transparent"
                    />
                  </li>
                ))}
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-4">Languages</h3>
              <div className="space-y-2">
                {data.languages.map((lang, idx) => (
                  <input
                    key={idx}
                    value={lang}
                    onChange={(e) => handleChange("languages", e.target.value, idx)}
                    className="text-sm text-gray-600 italic focus:outline-none w-full bg-transparent"
                  />
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Profile */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-2 pb-1 border-b border-[#EAE0D5]">
                About
              </h3>
              <textarea
                value={data.profile}
                onChange={(e) => handleChange("profile", e.target.value)}
                className="w-full text-gray-600 leading-relaxed text-sm border-none focus:ring-0 resize-none h-24 italic"
              />
            </section>

            {/* Experience */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-2 pb-1 border-b border-[#EAE0D5]">
                Professional Experience
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <input
                        value={exp.role}
                        onChange={(e) => handleChange("experience", e.target.value, idx, "role")}
                        className="font-bold text-[#4A3728] text-base focus:outline-none w-2/3"
                      />
                      <input
                        value={exp.year}
                        onChange={(e) => handleChange("experience", e.target.value, idx, "year")}
                        className="text-[10px] text-[#A75D5D] font-bold focus:outline-none text-right w-1/3 uppercase tracking-tighter"
                      />
                    </div>
                    <input
                      value={exp.company}
                      onChange={(e) => handleChange("experience", e.target.value, idx, "company")}
                      className="text-xs text-gray-400 font-medium mb-1 block focus:outline-none uppercase tracking-widest w-full"
                    />
                    <textarea
                      value={exp.desc}
                      onChange={(e) => handleChange("experience", e.target.value, idx, "desc")}
                      className="text-sm text-gray-600 w-full focus:outline-none resize-none leading-snug"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-2 pb-1 border-b border-[#EAE0D5]">
                Academic Background
              </h3>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <input
                    value={edu.degree}
                    onChange={(e) => handleChange("education", e.target.value, idx, "degree")}
                    className="font-bold text-[#4A3728] text-sm focus:outline-none w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <input
                      value={edu.school}
                      onChange={(e) => handleChange("education", e.target.value, idx, "school")}
                      className="bg-transparent focus:outline-none w-2/3"
                    />
                    <input
                      value={edu.year}
                      onChange={(e) => handleChange("education", e.target.value, idx, "year")}
                      className="bg-transparent focus:outline-none text-right w-1/3"
                    />
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
          </div>
        </div>
      </div>
      {/* Download and Save Buttons */}
      <div className="mt-6 text-center flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={saveResume}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg"
        >
          Save Resume
        </button>
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-[#4A3728] text-white rounded-lg hover:bg-[#3a2b1e] transition-colors font-semibold shadow-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

const EditableItem = ({ value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-transparent focus:outline-none w-full hover:bg-gray-50 rounded px-1 transition-colors"
  />
);

export default Template3;
