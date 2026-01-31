import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Template3 = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const [data, setData] = useState({
    fullName: "JULIANNE MARLOW",
    jobTitle: "Content Strategist & Copywriter",
    profile: "A storytelling enthusiast with over 6 years of experience in crafting compelling narratives for digital brands. Dedicated to bridging the gap between business goals and user needs through creative content.",
    email: "julianne.m@example.com",
    phone: "+1 234 567 890",
    location: "Austin, Texas",
    website: "www.jmarlow.com",
    linkedIn: "linkedin.com/in/jmarlow",
    skills: ["SEO Strategy", "Copywriting", "Email Marketing", "Brand Voice", "Social Media"],
    experience: [
      { role: "Senior Strategist", company: "Echo Media", year: "2021 - Present", desc: "Developing multi-channel content strategies for lifestyle and tech clients." },
      { role: "Content Writer", company: "The Daily Hub", year: "2018 - 2021", desc: "Produced over 200+ articles and improved site traffic by 50% through SEO optimization." }
    ],
    education: [
      { degree: "Bachelor of Arts in Journalism", school: "University of Texas", year: "2014 - 2018" }
    ],
    languages: ["English (Native)", "Italian (Fluent)"],
  });

  useEffect(() => {
    if (formData) {
      setData((prev) => ({ ...prev, ...formData }));
    }
  }, [formData]);

  const handleChange = (field, value, index = null, subField = null) => {
    if (index !== null && Array.isArray(data[field])) {
      const updated = [...data[field]];
      if (typeof updated[index] === 'object') {
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
    <div className="min-h-screen bg-[#F4F1EE] py-12 px-4 flex justify-center items-center font-serif mt-20">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl flex flex-col overflow-hidden">
        
        {/* --- TOP HEADER (Sophisticated Dark Strip) --- */}
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

        {/* --- MAIN BODY (Grid Layout) --- */}
        <div className="flex flex-1 p-12 gap-12">
          
          {/* LEFT COLUMN - Sidebar Style but inside */}
          <div className="w-1/3 flex flex-col gap-10 border-r border-gray-100 pr-8">
            
            {/* Contact */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-4">Contact</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <EditableItem value={data.email} onChange={(v) => handleChange("email", v)} />
                <EditableItem value={data.phone} onChange={(v) => handleChange("phone", v)} />
                <EditableItem value={data.location} onChange={(v) => handleChange("location", v)} />
                <EditableItem value={data.website} onChange={(v) => handleChange("website", v)} />
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-4">Core Skills</h3>
              <ul className="space-y-2">
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

          {/* RIGHT COLUMN - Main Content */}
          <div className="flex-1 flex flex-col gap-10">
            
            {/* Profile */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-4 pb-2 border-b border-[#EAE0D5]">About</h3>
              <textarea 
                value={data.profile} 
                onChange={(e) => handleChange("profile", e.target.value)} 
                className="w-full text-gray-600 leading-relaxed text-sm border-none focus:ring-0 resize-none h-24 italic"
              />
            </section>

            {/* Experience */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-6 pb-2 border-b border-[#EAE0D5]">Professional Experience</h3>
              <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between items-baseline mb-1">
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
                      className="text-xs text-gray-400 font-medium mb-2 block focus:outline-none uppercase tracking-widest"
                    />
                    <textarea 
                      value={exp.desc} 
                      onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} 
                      className="text-sm text-gray-600 w-full focus:outline-none resize-none bg-transparent leading-snug"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h3 className="text-[#4A3728] font-bold text-xs tracking-widest uppercase mb-6 pb-2 border-b border-[#EAE0D5]">Academic Background</h3>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-4">
                  <input 
                    value={edu.degree} 
                    onChange={(e) => handleChange("education", e.target.value, idx, "degree")} 
                    className="font-bold text-[#4A3728] text-sm focus:outline-none w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <input value={edu.school} onChange={(e) => handleChange("education", e.target.value, idx, "school")} className="bg-transparent focus:outline-none w-2/3" />
                    <input value={edu.year} onChange={(e) => handleChange("education", e.target.value, idx, "year")} className="bg-transparent focus:outline-none text-right w-1/3" />
                  </div>
                </div>
              ))}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified Editable Field
const EditableItem = ({ value, onChange }) => (
  <input 
    value={value} 
    onChange={(e) => onChange(e.target.value)} 
    className="bg-transparent focus:outline-none w-full hover:bg-gray-50 rounded px-1 transition-colors"
  />
);

export default Template3;