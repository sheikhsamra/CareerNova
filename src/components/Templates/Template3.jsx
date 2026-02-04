import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate add kiya
import { jsPDF } from "jspdf";

const Template3 = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Navigation ke liye
  const formData = location.state?.formData;
  const cvRef = useRef(null);
  const [scale, setScale] = useState(1);

  const [data, setData] = useState({
    fullName: "SAMRA MOINUDDIN",
    jobTitle: "FRONTEND DEVELOPER",
    email: "shaikhsamra855@mail.com",
    phone: "03168596692",
    location: "Karachi, Pakistan",
    skills: ["React JS", "Tailwind CSS", "JavaScript"],
    experience: [{ role: "Senior Developer", company: "Tech Solutions", year: "2023 - Present", desc: "Developing frontend projects." }],
    education: [{ degree: "BS Computer Science", school: "University of Karachi", year: "2021" }],
    languages: ["Urdu", "English"],
  });

  useEffect(() => {
    if (formData) setData((prev) => ({ ...prev, ...formData }));
  }, [formData]);

  useEffect(() => {
    const resize = () => {
      const screenWidth = window.innerWidth;
      const cvWidth = 800;
      setScale(screenWidth < cvWidth ? (screenWidth - 40) / cvWidth : 1);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null && Array.isArray(data[field])) {
      const updated = [...data[field]];
      if (typeof updated[index] === "object") {
        updated[index] = { ...updated[index], [subField]: value };
      } else {
        updated[index] = value;
      }
      setData({ ...data, [field]: updated });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  // --- NEW SAVE & DOWNLOAD LOGIC ---
  const handleSaveAndDownload = () => {
    // 1. Pehle download wala function call hoga
    downloadPDF(); 

    // 2. Phir Dashboard ke liye data save hoga
    const existingResumes = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    const resumeToSave = {
      id: location.state?.resumeId || Date.now(),
      templateId: "Template3",
      updatedAt: new Date().toLocaleString(),
      data: data
    };

    // Purana wala hata kar naya save karein (Edit mode ke liye)
    const updatedList = existingResumes.filter(r => r.id !== resumeToSave.id);
    localStorage.setItem("savedResumes", JSON.stringify([...updatedList, resumeToSave]));

    alert("Resume Saved to Dashboard & Downloaded! ✅");
  };

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFillColor(74, 55, 40);
    doc.rect(0, 0, 210, 50, "F");
    doc.setTextColor(234, 224, 213);
    doc.setFontSize(26);
    doc.text(data.fullName, 105, 25, { align: "center" });
    doc.setTextColor(198, 172, 143);
    doc.setFontSize(14);
    doc.text(data.jobTitle, 105, 38, { align: "center" });
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(12);
    doc.text("CONTACT", 20, 70);
    doc.setFontSize(10);
    doc.text(`Email: ${data.email}`, 20, 80);
    doc.text(`Phone: ${data.phone}`, 20, 88);
    doc.setFontSize(12);
    doc.text("EXPERIENCE", 100, 70);
    doc.setFontSize(10);
    let y = 80;
    data.experience.forEach(exp => {
        doc.text(`${exp.role} (${exp.year})`, 100, y);
        const splitDesc = doc.splitTextToSize(exp.desc, 90);
        doc.text(splitDesc, 100, y + 6);
        y += 25;
    });
    doc.save(`${data.fullName}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex flex-col items-center mt-20">
      
      {/* Control Buttons Container */}
      <div className="flex gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          ← Back
        </button>
        
        <button 
          onClick={handleSaveAndDownload} 
          className="px-8 py-3 bg-[#4A3728] text-white font-bold rounded-lg shadow-lg hover:brightness-110"
        >
          Save & Download 💾
        </button>
      </div>

      <div style={{ transform: `scale(${scale})`, transformOrigin: "top center", transition: "transform 0.3s ease" }}>
        <div 
          ref={cvRef} 
          className="w-[210mm] min-h-[297mm] h-auto bg-white shadow-2xl flex flex-col mb-20"
        >
          {/* HEADER */}
          <div className="bg-[#4A3728] p-12 text-center">
            <input 
              className="bg-transparent text-4xl font-bold uppercase text-[#EAE0D5] text-center w-full focus:outline-none border-b border-transparent hover:border-[#C6AC8F]"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <input 
              className="bg-transparent text-lg text-[#C6AC8F] mt-4 uppercase text-center w-full focus:outline-none border-b border-transparent hover:border-[#C6AC8F] tracking-widest"
              value={data.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
            />
          </div>

          <div className="flex flex-1 p-12 gap-10">
            {/* LEFT COLUMN */}
            <div className="w-1/3 border-r pr-8 space-y-8 text-left">
              <section>
                <h3 className="font-bold text-[#4A3728] mb-4 text-sm tracking-tighter uppercase">Contact</h3>
                <input className="w-full text-sm mb-2 focus:outline-none border-b border-gray-100" value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
                <input className="w-full text-sm focus:outline-none border-b border-gray-100" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              </section>

              <section>
                <h3 className="font-bold text-[#4A3728] mb-4 text-sm tracking-tighter uppercase">Skills</h3>
                <div className="space-y-2">
                  {data.skills.map((s, i) => (
                    <input key={i} className="w-full text-sm focus:outline-none border-b border-gray-50" value={s} onChange={(e) => handleChange("skills", e.target.value, i)} />
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex-1 text-left">
              <h3 className="font-bold text-[#4A3728] border-b pb-2 mb-6 text-sm tracking-tighter uppercase">Experience</h3>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-8">
                  <div className="flex justify-between items-center">
                    <input className="font-bold text-gray-800 focus:outline-none" value={exp.role} onChange={(e) => handleChange("experience", e.target.value, i, "role")} />
                    <input className="text-[#A75D5D] text-xs font-bold text-right focus:outline-none" value={exp.year} onChange={(e) => handleChange("experience", e.target.value, i, "year")} />
                  </div>
                  <textarea className="w-full text-gray-600 text-sm mt-3 focus:outline-none resize-none overflow-hidden h-auto" rows="3" value={exp.desc} onChange={(e) => handleChange("experience", e.target.value, i, "desc")} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;