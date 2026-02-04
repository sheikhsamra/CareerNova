import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate add kiya
import { jsPDF } from "jspdf";

const Template2 = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Navigation ke liye
  const formData = location.state?.formData;
  const cvRef = useRef(null);
  const [scale, setScale] = useState(1);

  const [data, setData] = useState({
    fullName: "SOPHIA ANDERSON",
    jobTitle: "UI/UX Designer & Researcher",
    profile: "Creative and user-focused designer with a passion for building seamless digital experiences.",
    email: "sophia.design@example.com",
    phone: "+44 20 7946 0958",
    location: "London, UK",
    skills: ["Figma", "UI Design", "User Research"],
    experience: [
      { role: "Lead UI Designer", company: "Pixel Studio", year: "2021 - Present", desc: "Crafting intuitive interfaces for high-traffic mobile apps." }
    ],
    education: [
      { degree: "Bachelor of Design", school: "UAL London", year: "2015 - 2019" }
    ],
    languages: ["English", "French"],
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

  // --- SAVE & DOWNLOAD LOGIC ---
  const handleSaveAndDownload = () => {
    // Pehle aapka download wala function chalega
    downloadPDF(); 

    // Phir Dashboard ke liye save hoga
    const existingResumes = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    const resumeToSave = {
      id: location.state?.resumeId || Date.now(),
      templateId: "Template2",
      updatedAt: new Date().toLocaleString(),
      data: data
    };

    const updatedList = existingResumes.filter(r => r.id !== resumeToSave.id);
    localStorage.setItem("savedResumes", JSON.stringify([...updatedList, resumeToSave]));

    alert("Resume Saved to Dashboard & Downloaded! ✅");
  };

  // --- Aapkka Purana Download Logic (Untouched) ---
  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFillColor(19, 78, 74); doc.rect(0, 0, 210, 55, "F");
    doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(32);
    doc.text(data.fullName, 20, 30);
    doc.setTextColor(94, 234, 212); doc.setFontSize(14); doc.setFont("helvetica", "normal");
    doc.text(data.jobTitle, 20, 42);
    doc.setFillColor(248, 250, 252); doc.rect(140, 55, 70, 242, "F");
    doc.setTextColor(20, 20, 20); doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.setTextColor(19, 78, 74);
    doc.text("EXPERIENCE", 20, 75);
    let currentY = 85;
    data.experience.forEach((exp) => {
      doc.setTextColor(40, 40, 40); doc.setFontSize(11); doc.setFont("helvetica", "bold");
      doc.text(exp.role, 20, currentY);
      doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(100, 100, 100);
      doc.text(`${exp.company} | ${exp.year}`, 20, currentY + 5);
      const splitDesc = doc.splitTextToSize(exp.desc, 100);
      doc.text(splitDesc, 20, currentY + 12);
      currentY += 30;
    });
    doc.setTextColor(19, 78, 74); doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text("CONTACT", 145, 75);
    doc.setFontSize(9); doc.setTextColor(60, 60, 60); doc.setFont("helvetica", "normal");
    doc.text(`Email: ${data.email}`, 145, 85);
    doc.text(`Phone: ${data.phone}`, 145, 92);
    doc.text(`Loc: ${data.location}`, 145, 99);
    doc.save(`${data.fullName}_Professional_CV.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-200 py-10 flex flex-col items-center mt-20">
      
      {/* Control Buttons */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-all"
        >
          ← Back
        </button>
        
        <button 
          onClick={handleSaveAndDownload} 
          className="px-10 py-4 bg-teal-800 text-white font-bold rounded-lg shadow-xl hover:bg-teal-900 transition-all"
        >
          Save & Download 💾
        </button>
      </div>

      <div style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
        <div ref={cvRef} className="w-[210mm] min-h-[297mm] h-auto bg-white shadow-2xl flex flex-col overflow-hidden rounded-lg text-left">
          {/* Header */}
          <div className="bg-[#134e4a] text-white p-12">
            <input value={data.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className="text-5xl font-extrabold w-full bg-transparent focus:outline-none border-b border-transparent hover:border-teal-400" />
            <input value={data.jobTitle} onChange={(e) => handleChange("jobTitle", e.target.value)} className="text-xl text-teal-300 mt-2 w-full bg-transparent focus:outline-none border-b border-transparent hover:border-teal-400" />
          </div>

          {/* Main Body */}
          <div className="flex flex-1">
            <div className="w-[65%] p-10 border-r border-gray-100">
              <section className="mb-10">
                <h2 className="text-teal-900 font-black text-xs uppercase mb-6 tracking-widest border-b pb-2">Experience</h2>
                <div className="space-y-8">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="group">
                      <input value={exp.role} onChange={(e) => handleChange("experience", e.target.value, idx, "role")} className="font-bold text-gray-800 w-full focus:outline-none" />
                      <textarea value={exp.desc} onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} className="text-sm text-gray-500 w-full resize-none h-auto bg-transparent mt-2 focus:outline-none" rows="3" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="w-[35%] bg-slate-50 p-10">
              <section className="mb-10">
                <h3 className="text-teal-900 font-bold text-xs uppercase mb-6 tracking-widest">Contact</h3>
                <input value={data.email} onChange={(e) => handleChange("email", e.target.value)} className="text-sm text-gray-600 w-full bg-transparent mb-4 focus:outline-none border-b border-gray-200" />
                <input value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} className="text-sm text-gray-600 w-full bg-transparent mb-4 focus:outline-none border-b border-gray-200" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;