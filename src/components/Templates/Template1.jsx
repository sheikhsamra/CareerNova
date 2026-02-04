import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const Template1 = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const cvRef = useRef(null);
  const [scale, setScale] = useState(1);

  const [data, setData] = useState({
    fullName: "ARIANA WELLS",
    jobTitle: "Senior Brand Architect",
    profile: "Dynamic and innovative Brand Architect with over 10 years of experience.",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "London, UK",
    skills: ["Brand Strategy", "Visual Identity", "Adobe Suite"],
    experience: [
      { role: "Creative Director", company: "Studio Minimal", year: "2020 - Present", desc: "Leading a team of 15 designers to deliver premium branding solutions." },
      { role: "Brand Designer", company: "Vogue Agency", year: "2017 - 2020", desc: "Developed visual systems for lifestyle brands." }
    ],
    education: [
      { degree: "MA in Communication Design", school: "Royal College of Art", year: "2015 - 2017" }
    ],
  });

  useEffect(() => {
    if (formData) setData((prev) => ({ ...prev, ...formData }));
  }, [formData]);

  useEffect(() => {
    const resize = () => {
      const screenWidth = window.innerWidth;
      const cvWidth = 794; 
      setScale(screenWidth < cvWidth ? (screenWidth - 20) / cvWidth : 1);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null && Array.isArray(data[field])) {
      const updated = [...data[field]];
      if (typeof updated[index] === 'object') {
        updated[index] = { ...updated[index], [subField]: value };
      } else {
        updated[index] = value;
      }
      setData({ ...data, [field]: updated });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  // --- STABLE NATIVE PDF LOGIC ---
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // 1. Sidebar Background (Dark Blue)
    doc.setFillColor(10, 29, 55); // #0A1D37
    doc.rect(0, 0, 75, 297, "F");

    // 2. Sidebar Content (Contact & Education)
    doc.setTextColor(96, 165, 250); // blue-400
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("CONTACT", 10, 25);

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Phone: ${data.phone}`, 10, 35);
    doc.text(`Email: ${data.email}`, 10, 42);
    doc.text(`Loc: ${data.location}`, 10, 49);

    doc.setTextColor(96, 165, 250);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", 10, 70);

    doc.setTextColor(255, 255, 255);
    data.education.forEach((edu, i) => {
      const y = 80 + (i * 20);
      doc.setFontSize(8);
      doc.setTextColor(147, 197, 253); // blue-300
      doc.text(edu.year, 10, y);
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(edu.degree, 10, y + 5);
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text(edu.school, 10, y + 10);
    });

    // 3. Main Content (Name & Experience)
    doc.setTextColor(10, 29, 55);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text(data.fullName.toUpperCase(), 85, 30);

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(data.jobTitle.toUpperCase(), 85, 40);

    doc.setDrawColor(200, 200, 200);
    doc.line(85, 50, 200, 50);

    doc.setTextColor(10, 29, 55);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EXPERIENCE", 85, 65);

    let currentY = 75;
    data.experience.forEach((exp) => {
      doc.setTextColor(10, 29, 55);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(exp.role, 85, currentY);
      
      doc.setTextColor(37, 99, 235); // blue-600
      doc.setFontSize(9);
      doc.text(exp.year, 170, currentY);

      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitDesc = doc.splitTextToSize(exp.desc, 110);
      doc.text(splitDesc, 85, currentY + 7);
      
      currentY += 30;
    });

    doc.save(`${data.fullName}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-300 py-10 flex flex-col items-center mt-20">
      
      <button 
        onClick={downloadPDF} 
        className="mb-8 px-10 py-4 bg-[#0A1D37] text-white font-bold rounded-lg shadow-xl hover:scale-105 transition-transform"
      >
        Download Clean PDF 📄
      </button>

      <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
        <div ref={cvRef} className="w-[210mm] min-h-[297mm] h-auto bg-white shadow-2xl flex overflow-hidden text-left">
          
          {/* Sidebar */}
          <div className="w-[35%] bg-[#0A1D37] text-white p-10 flex flex-col">
            <div className="mb-12">
              <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Contact</h3>
              <div className="space-y-4">
                <input value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-b border-transparent hover:border-blue-900" />
                <input value={data.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-b border-transparent hover:border-blue-900" />
                <input value={data.location} onChange={(e) => handleChange("location", e.target.value)} className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-b border-transparent hover:border-blue-900" />
              </div>
            </div>
            
            <div className="mb-12 text-left">
              <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Education</h3>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-6">
                  <input value={edu.year} onChange={(e) => handleChange("education", e.target.value, idx, "year")} className="bg-transparent text-[10px] text-blue-300 w-full focus:outline-none font-bold" />
                  <input value={edu.degree} onChange={(e) => handleChange("education", e.target.value, idx, "degree")} className="bg-transparent text-sm text-white w-full focus:outline-none font-semibold mt-1" />
                  <input value={edu.school} onChange={(e) => handleChange("education", e.target.value, idx, "school")} className="bg-transparent text-xs text-gray-400 w-full focus:outline-none italic mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-16">
            <header className="mb-16">
              <input 
                value={data.fullName} 
                onChange={(e) => handleChange("fullName", e.target.value)} 
                className="text-5xl font-light tracking-[10px] text-[#0A1D37] w-full focus:outline-none bg-transparent mb-2 uppercase" 
              />
              <input 
                value={data.jobTitle} 
                onChange={(e) => handleChange("jobTitle", e.target.value)} 
                className="text-lg tracking-[3px] font-semibold text-gray-500 w-full focus:outline-none bg-transparent uppercase" 
              />
            </header>

            <section className="mb-16">
              <h2 className="text-sm font-bold text-[#0A1D37] uppercase tracking-widest mb-4 border-b pb-2">Experience</h2>
              <div className="space-y-10">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <input 
                        value={exp.role} 
                        onChange={(e) => handleChange("experience", e.target.value, idx, "role")} 
                        className="text-lg font-bold text-[#0A1D37] focus:outline-none w-2/3 border-b border-transparent group-hover:border-gray-100" 
                      />
                      <input 
                        value={exp.year} 
                        onChange={(e) => handleChange("experience", e.target.value, idx, "year")} 
                        className="text-xs font-bold text-blue-600 focus:outline-none text-right w-1/3" 
                      />
                    </div>
                    <textarea 
                      value={exp.desc} 
                      onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} 
                      className="text-sm text-gray-600 w-full focus:outline-none resize-none bg-transparent h-auto"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Template1;