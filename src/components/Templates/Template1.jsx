import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Template1 = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Back jaane ke liye
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

  // --- SAVE & DOWNLOAD LOGIC ---
  const handleSaveAndDownload = () => {
    // 1. PDF Generate Karein
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFillColor(10, 29, 55); 
    doc.rect(0, 0, 75, 297, "F");
    doc.setTextColor(10, 29, 55);
    doc.setFontSize(26);
    doc.text(data.fullName.toUpperCase(), 85, 30);
    // ... (Aapki baki PDF logic yahan)
    doc.save(`${data.fullName}_Resume.pdf`);

    // 2. Dashboard mein save karein (LocalStorage)
    const existingResumes = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    
    // Check karein agar hum purana resume edit kar rahe hain ya naya save kar rahe hain
    const resumeToSave = {
      id: location.state?.resumeId || Date.now(), // Purani ID ya nayi
      templateId: "Template1",
      updatedAt: new Date().toLocaleString(),
      data: data
    };

    // Agar pehle se hai toh update karein, warna naya add karein
    const updatedList = existingResumes.filter(r => r.id !== resumeToSave.id);
    localStorage.setItem("savedResumes", JSON.stringify([...updatedList, resumeToSave]));

    alert("Resume saved to dashboard successfully! ✅");
  };

  return (
    <div className="min-h-screen bg-gray-300 py-10 flex flex-col items-center mt-20">
      
      {/* Control Buttons Container */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          ← Back
        </button>
        
        <button 
          onClick={handleSaveAndDownload} 
          className="px-8 py-2 bg-[#0A1D37] text-white font-bold rounded-lg shadow-xl hover:scale-105 transition-transform"
        >
          Save & Download 💾
        </button>
      </div>

      {/* CV Preview */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
        <div ref={cvRef} className="w-[210mm] min-h-[297mm] h-auto bg-white shadow-2xl flex overflow-hidden text-left">
          
          {/* Sidebar */}
          <div className="w-[35%] bg-[#0A1D37] text-white p-10 flex flex-col">
            <div className="mb-12">
              <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Contact</h3>
              <div className="space-y-4">
                <input value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-b border-gray-700" />
                <input value={data.email} onChange={(e) => handleChange("email", e.target.value)} className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-b border-gray-700" />
                <input value={data.location} onChange={(e) => handleChange("location", e.target.value)} className="bg-transparent text-xs text-gray-300 w-full focus:outline-none border-b border-gray-700" />
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
              <input value={data.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className="text-5xl font-light tracking-[10px] text-[#0A1D37] w-full focus:outline-none bg-transparent mb-2 uppercase" />
              <input value={data.jobTitle} onChange={(e) => handleChange("jobTitle", e.target.value)} className="text-lg tracking-[3px] font-semibold text-gray-500 w-full focus:outline-none bg-transparent uppercase" />
            </header>

            <section className="mb-16">
              <h2 className="text-sm font-bold text-[#0A1D37] uppercase tracking-widest mb-4 border-b pb-2">Experience</h2>
              <div className="space-y-10">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <input value={exp.role} onChange={(e) => handleChange("experience", e.target.value, idx, "role")} className="text-lg font-bold text-[#0A1D37] focus:outline-none w-2/3" />
                      <input value={exp.year} onChange={(e) => handleChange("experience", e.target.value, idx, "year")} className="text-xs font-bold text-blue-600 focus:outline-none text-right w-1/3" />
                    </div>
                    <textarea value={exp.desc} onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} className="text-sm text-gray-600 w-full focus:outline-none resize-none bg-transparent" rows="3" />
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