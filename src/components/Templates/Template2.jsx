import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Template2 = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  // Initial State with Placeholder Data
  const [data, setData] = useState({
    fullName: "SOPHIA ANDERSON",
    jobTitle: "UI/UX Designer & Researcher",
    profile: "Creative and user-focused designer with a passion for building seamless digital experiences. Expertise in wireframing, prototyping, and conducting user research to drive product success.",
    email: "sophia.design@example.com",
    phone: "+44 20 7946 0958",
    location: "London, United Kingdom",
    website: "www.sophiadesigns.com",
    linkedIn: "linkedin.com/in/sophia-a",
    skills: ["User Interface Design", "Interaction Design", "Figma", "User Research", "Visual Communication"],
    experience: [
      { role: "Lead UI Designer", company: "Pixel Studio", year: "2021 - Present", desc: "Crafting intuitive interfaces for high-traffic mobile apps and leading a team of junior designers." },
      { role: "Junior Designer", company: "WebFlow Agency", year: "2019 - 2021", desc: "Collaborated with developers to create responsive web layouts and brand assets." }
    ],
    education: [
      { degree: "Bachelor of Design", school: "University of the Arts London", year: "2015 - 2019" }
    ],
    languages: ["English (Native)", "French (Professional)"],
  });

  // Sync with Form Data if available
  useEffect(() => {
    if (formData) {
      setData((prev) => ({
        ...prev,
        ...formData,
        // Handling arrays specifically to ensure they don't break
        skills: formData.skills?.length ? formData.skills : prev.skills,
        experience: formData.experience?.length ? formData.experience : prev.experience,
        education: formData.education?.length ? formData.education : prev.education,
      }));
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

  // Inline SVG Icons for better UI without libraries
  const Icons = {
    Mail: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    Phone: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
    Location: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
  };

  return (
    <div className="min-h-screen bg-slate-200 py-12 px-4 flex justify-center items-center font-sans mt-20">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl flex flex-col overflow-hidden rounded-lg">
        
        {/* --- TOP HEADER (Creative Geometric Design) --- */}
        <div className="bg-[#134e4a] text-white p-12 relative overflow-hidden">
          <div className="relative z-10">
            <input 
              value={data.fullName} 
              onChange={(e) => handleChange("fullName", e.target.value)} 
              className="text-5xl font-extrabold tracking-tight w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-300 rounded"
            />
            <input 
              value={data.jobTitle} 
              onChange={(e) => handleChange("jobTitle", e.target.value)} 
              className="text-xl text-teal-300 font-medium mt-2 w-full bg-transparent focus:outline-none"
            />
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-12.5 -right-12.5 w-64 h-64 bg-teal-800 rounded-full opacity-50"></div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex flex-1">
          
          {/* LEFT COLUMN (Wider - Main Info) */}
          <div className="w-[65%] p-10 border-r border-gray-100">
            {/* Profile */}
            <section className="mb-10">
              <h2 className="text-teal-900 font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-teal-600"></span> About Me
              </h2>
              <textarea 
                value={data.profile} 
                onChange={(e) => handleChange("profile", e.target.value)} 
                className="w-full text-gray-600 leading-relaxed text-sm border-none focus:ring-0 resize-none h-24 bg-teal-50/30 p-2 rounded"
              />
            </section>

            {/* Experience */}
            <section className="mb-10">
              <h2 className="text-teal-900 font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-teal-600"></span> Experience
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-start mb-1">
                      <input 
                        value={exp.role} 
                        onChange={(e) => handleChange("experience", e.target.value, idx, "role")} 
                        className="font-bold text-gray-800 text-base focus:outline-none w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <input value={exp.company} onChange={(e) => handleChange("experience", e.target.value, idx, "company")} className="text-teal-700 text-xs font-bold focus:outline-none w-fit" />
                      <span className="text-gray-300">|</span>
                      <input value={exp.year} onChange={(e) => handleChange("experience", e.target.value, idx, "year")} className="text-gray-400 text-xs focus:outline-none w-fit" />
                    </div>
                    <textarea 
                      value={exp.desc} 
                      onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} 
                      className="text-xs text-gray-500 w-full focus:outline-none resize-none bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-teal-900 font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-teal-600"></span> Education
              </h2>
              <div className="space-y-6">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <input value={edu.degree} onChange={(e) => handleChange("education", e.target.value, idx, "degree")} className="font-bold text-gray-800 text-sm focus:outline-none w-full" />
                    <div className="flex justify-between mt-1">
                      <input value={edu.school} onChange={(e) => handleChange("education", e.target.value, idx, "school")} className="text-gray-500 text-xs focus:outline-none w-2/3" />
                      <input value={edu.year} onChange={(e) => handleChange("education", e.target.value, idx, "year")} className="text-gray-400 text-xs focus:outline-none text-right w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Narrower - Contact & Skills) */}
          <div className="w-[35%] bg-slate-50 p-10 flex flex-col gap-10">
            {/* Contact Info */}
            <div>
              <h3 className="text-teal-900 font-black text-xs uppercase tracking-[0.2em] mb-6">Contact Details</h3>
              <div className="space-y-4">
                <ContactItem icon={<Icons.Phone />} value={data.phone} onChange={(v) => handleChange("phone", v)} />
                <ContactItem icon={<Icons.Mail />} value={data.email} onChange={(v) => handleChange("email", v)} />
                <ContactItem icon={<Icons.Location />} value={data.location} onChange={(v) => handleChange("location", v)} />
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="text-teal-900 font-black text-xs uppercase tracking-[0.2em] mb-6">Expertise</h3>
              <div className="flex flex-col gap-3">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col">
                    <input 
                      value={skill} 
                      onChange={(e) => handleChange("skills", e.target.value, idx)} 
                      className="text-xs font-semibold text-gray-700 bg-transparent focus:outline-none mb-1"
                    />
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-teal-600"></div> {/* Visual Progress Bar */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-teal-900 font-black text-xs uppercase tracking-[0.2em] mb-4">Languages</h3>
              {data.languages.map((lang, idx) => (
                <input 
                  key={idx} 
                  value={lang} 
                  onChange={(e) => handleChange("languages", e.target.value, idx)} 
                  className="bg-transparent text-sm text-gray-600 w-full focus:outline-none mb-1 block italic"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper Contact Item
const ContactItem = ({ icon, value, onChange }) => (
  <div className="flex items-start gap-3">
    <span className="text-teal-600 mt-0.5">{icon}</span>
    <input 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="bg-transparent text-[11px] text-gray-600 focus:outline-none w-full leading-tight"
    />
  </div>
);

export default Template2;