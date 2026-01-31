import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Template1 = () => {
  const location = useLocation();
  const formData = location.state?.formData; // form se aaya data

  const [data, setData] = useState({
    fullName: "ARIANA WELLS",
    jobTitle: "Senior Brand Architect",
    profile: "Dynamic and innovative Brand Architect with over 10 years of experience...",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "London, UK",
    website: "www.arianawells.com",
    linkedIn: "linkedin.com/in/arianawells",
    skills: ["Brand Strategy", "Visual Identity", "Adobe Suite", "UI/UX Design", "Team Leadership"],
    experience: [
      { role: "Creative Director", company: "Studio Minimal", year: "2020 - Present", desc: "Leading a team of 15 designers..." },
      { role: "Brand Designer", company: "Vogue Agency", year: "2017 - 2020", desc: "Developed visual systems..." }
    ],
    education: [
      { degree: "MA in Communication Design", school: "Royal College of Art", year: "2015 - 2017" },
      { degree: "BA in Fine Arts", school: "University of Arts", year: "2011 - 2015" }
    ],
    languages: ["English (Native)", "German (Fluent)"],
  });

  // Update placeholder data with formData if exists
  useEffect(() => {
    if (formData) {
      setData((prev) => ({
        ...prev,
        fullName: formData.fullName || prev.fullName,
        jobTitle: formData.jobTitle || prev.jobTitle,
        profile: formData.profile || prev.profile,
        email: formData.email || prev.email,
        phone: formData.phone || prev.phone,
        location: formData.location || prev.location,
        website: formData.website || prev.website,
        linkedIn: formData.linkedIn || prev.linkedIn,
        skills: formData.skills.length ? formData.skills : prev.skills,
        experience: formData.experience.length ? formData.experience : prev.experience,
        education: formData.education.length ? formData.education : prev.education,
        languages: formData.languages.length ? formData.languages : prev.languages,
      }));
    }
  }, [formData]);

  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null && Array.isArray(data[field])) {
      const updated = [...data[field]];
      if (subField) {
        updated[index][subField] = value;
      } else {
        updated[index] = value;
      }
      setData({ ...data, [field]: updated });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 py-10 flex justify-center items-start mt-20">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl flex overflow-hidden border border-gray-400">
        {/* LEFT BAR */}
        <div className="w-[35%] bg-[#0A1D37] text-white p-10 flex flex-col">
          <ContactSection data={data} handleChange={handleChange} />
          <EducationSection data={data} handleChange={handleChange} />
          <SkillsSection data={data} handleChange={handleChange} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-16">
          <HeaderSection data={data} handleChange={handleChange} />
          <ProfileSection data={data} handleChange={handleChange} />
          <ExperienceSection data={data} handleChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

// --------- Sections ---------
const ContactSection = ({ data, handleChange }) => (
  <div className="mb-12">
    <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Contact</h3>
    {["phone","email","location","website","linkedIn"].map((field, idx) => (
      <input
        key={idx}
        value={data[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className="bg-transparent text-xs text-gray-300 w-full focus:outline-none mb-2"
      />
    ))}
  </div>
);

const EducationSection = ({ data, handleChange }) => (
  <div className="mb-12">
    <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Education</h3>
    {data.education.map((edu, idx) => (
      <div key={idx} className="mb-4">
        <input value={edu.year} onChange={(e) => handleChange("education", e.target.value, idx, "year")} className="bg-transparent text-xs text-blue-300 w-full focus:outline-none font-bold" />
        <input value={edu.degree} onChange={(e) => handleChange("education", e.target.value, idx, "degree")} className="bg-transparent text-sm text-white w-full focus:outline-none font-semibold mt-1" />
        <input value={edu.school} onChange={(e) => handleChange("education", e.target.value, idx, "school")} className="bg-transparent text-xs text-gray-400 w-full focus:outline-none italic" />
      </div>
    ))}
  </div>
);

const SkillsSection = ({ data, handleChange }) => (
  <div>
    <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Key Skills</h3>
    <div className="space-y-3">
      {data.skills.map((skill, idx) => (
        <input key={idx} value={skill} onChange={(e) => handleChange("skills", e.target.value, idx)} className="bg-transparent text-sm text-gray-200 border-l border-blue-500 pl-3 w-full focus:outline-none" />
      ))}
    </div>
  </div>
);

const HeaderSection = ({ data, handleChange }) => (
  <header className="mb-16">
    <input 
      value={data.fullName} 
      onChange={(e) => handleChange("fullName", e.target.value)} 
      className="text-5xl font-light tracking-[10px] text-[#0A1D37] w-full focus:outline-none bg-transparent mb-2 uppercase"
    />
    <div className="h-1 w-20 bg-blue-500 mb-4"></div>
    <input 
      value={data.jobTitle} 
      onChange={(e) => handleChange("jobTitle", e.target.value)} 
      className="text-lg tracking-[3px] font-semibold text-gray-500 w-full focus:outline-none bg-transparent uppercase"
    />
  </header>
);

const ProfileSection = ({ data, handleChange }) => (
  <section className="mb-16">
    <h2 className="text-sm font-bold text-[#0A1D37] uppercase tracking-widest mb-4 border-b pb-2">Profile</h2>
    <textarea 
      value={data.profile} 
      onChange={(e) => handleChange("profile", e.target.value)} 
      className="w-full text-gray-600 leading-relaxed text-sm border-none focus:ring-0 resize-none h-24"
    />
  </section>
);

const ExperienceSection = ({ data, handleChange }) => (
  <section>
    <h2 className="text-sm font-bold text-[#0A1D37] uppercase tracking-widest mb-6 border-b pb-2">Experience</h2>
    <div className="space-y-10">
      {data.experience.map((exp, idx) => (
        <div key={idx}>
          <div className="flex justify-between items-baseline mb-2">
            <input value={exp.role} onChange={(e) => handleChange("experience", e.target.value, idx, "role")} className="text-lg font-bold text-[#0A1D37] focus:outline-none w-2/3" />
            <input value={exp.year} onChange={(e) => handleChange("experience", e.target.value, idx, "year")} className="text-xs font-bold text-blue-600 focus:outline-none text-right w-1/3" />
          </div>
          <input value={exp.company} onChange={(e) => handleChange("experience", e.target.value, idx, "company")} className="text-sm text-gray-400 block mb-3 focus:outline-none w-full font-medium" />
          <textarea value={exp.desc} onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} className="text-sm text-gray-600 w-full focus:outline-none resize-none bg-transparent" />
        </div>
      ))}
    </div>
  </section>
);

export default Template1;
