import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Template1 = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const [data, setData] = useState({
    fullName: "ARIANA WELLS",
    jobTitle: "Senior Brand Architect",
    profile: "Dynamic and innovative Brand Architect with over 10 years of experience...",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "London, UK",
    skills: ["Brand Strategy", "Visual Identity", "Adobe Suite", "UI/UX Design", "Team Leadership"],
    experience: [
      { role: "Creative Director", company: "Studio Minimal", year: "2020 - Present", desc: "Leading a team of designers..." },
      { role: "Brand Designer", company: "Vogue Agency", year: "2017 - 2020", desc: "Developed visual systems..." }
    ],
    education: [
      { degree: "MA in Communication Design", school: "Royal College of Art", year: "2015 - 2017" },
      { degree: "BA in Fine Arts", school: "University of Arts", year: "2011 - 2015" }
    ],
  });

  const templateRef = useRef();

  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }

    const saved = localStorage.getItem("template1Data");
    if (saved) setData(JSON.parse(saved));
  }, [formData]);

  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null && Array.isArray(data[field])) {
      const updated = [...data[field]];
      if (subField) updated[index][subField] = value;
      else updated[index] = value;
      setData({ ...data, [field]: updated });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  // Save to localStorage
  const saveResume = () => {
    localStorage.setItem("template1Data", JSON.stringify(data));
    alert("Resume saved successfully!");
  };

  // Download as PDF
  const downloadResume = async () => {
    const element = templateRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${data.fullName}_Resume.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-300 py-10 flex flex-col items-center gap-6">
      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <button onClick={saveResume} className="px-6 py-2 bg-green-600 text-white rounded hover:opacity-90 transition">
          Save Resume
        </button>
        <button onClick={downloadResume} className="px-6 py-2 bg-blue-600 text-white rounded hover:opacity-90 transition">
          Download Resume
        </button>
      </div>

      {/* Template UI */}
      <div ref={templateRef} className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-10">
        <h1 className="text-3xl font-bold mb-2">
          <input value={data.fullName} onChange={(e) => handleChange("fullName", e.target.value)} className="w-full text-3xl font-bold focus:outline-none" />
        </h1>
        <h2 className="text-xl font-semibold mb-4">
          <input value={data.jobTitle} onChange={(e) => handleChange("jobTitle", e.target.value)} className="w-full text-xl font-semibold focus:outline-none" />
        </h2>

        <section className="mb-4">
          <h3 className="font-semibold">Profile</h3>
          <textarea value={data.profile} onChange={(e) => handleChange("profile", e.target.value)} className="w-full text-gray-700 focus:outline-none" />
        </section>

        <section className="mb-4">
          <h3 className="font-semibold">Contact</h3>
          <input value={data.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full focus:outline-none" />
          <input value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full focus:outline-none" />
          <input value={data.location} onChange={(e) => handleChange("location", e.target.value)} className="w-full focus:outline-none" />
        </section>

        <section className="mb-4">
          <h3 className="font-semibold">Skills</h3>
          {data.skills.map((skill, idx) => (
            <input key={idx} value={skill} onChange={(e) => handleChange("skills", e.target.value, idx)} className="w-full focus:outline-none mb-1" />
          ))}
        </section>

        <section className="mb-4">
          <h3 className="font-semibold">Experience</h3>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <input value={exp.role} onChange={(e) => handleChange("experience", e.target.value, idx, "role")} className="w-full focus:outline-none" />
              <input value={exp.company} onChange={(e) => handleChange("experience", e.target.value, idx, "company")} className="w-full focus:outline-none" />
              <input value={exp.year} onChange={(e) => handleChange("experience", e.target.value, idx, "year")} className="w-full focus:outline-none" />
              <textarea value={exp.desc} onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} className="w-full focus:outline-none" />
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h3 className="font-semibold">Education</h3>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <input value={edu.degree} onChange={(e) => handleChange("education", e.target.value, idx, "degree")} className="w-full focus:outline-none" />
              <input value={edu.school} onChange={(e) => handleChange("education", e.target.value, idx, "school")} className="w-full focus:outline-none" />
              <input value={edu.year} onChange={(e) => handleChange("education", e.target.value, idx, "year")} className="w-full focus:outline-none" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Template1;
