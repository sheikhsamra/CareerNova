import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Template1 = () => {
  const location = useLocation();
  const formData = location.state?.formData;
  const cvRef = useRef(null);
  const [scale, setScale] = useState(1);

  const [data, setData] = useState({
    fullName: "ARIANA WELLS",
    jobTitle: "Senior Brand Architect",
    profile: "Dynamic and innovative Brand Architect with over 10 years of experience in creating cohesive brand identities. Expert in translating complex business goals into high-impact visual narratives.",
    email: "hello@reallygreatsite.com",
    phone: "+123-456-7890",
    location: "London, UK",
    website: "www.arianawells.com",
    linkedIn: "linkedin.com/in/arianawells",
    skills: ["Brand Strategy", "Visual Identity", "Adobe Suite", "UI/UX Design", "Team Leadership"],
    experience: [
      { role: "Creative Director", company: "Studio Minimal", year: "2020 - Present", desc: "Leading a team of 15 designers to deliver premium branding solutions for Fortune 500 companies." },
      { role: "Brand Designer", company: "Vogue Agency", year: "2017 - 2020", desc: "Developed visual systems for lifestyle brands and increased client retention by 25%." }
    ],
    education: [
      { degree: "MA in Communication Design", school: "Royal College of Art", year: "2015 - 2017" },
      { degree: "BA in Fine Arts", school: "University of Arts", year: "2011 - 2015" }
    ],
    languages: ["English (Native)", "German (Fluent)"],
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

  // Function to save resume data
  const saveResume = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const resumeData = {
          ...data,
          timestamp: new Date().toISOString(),
          template: 'template1'
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

  // Internal SVG Icons
  const Icons = {
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
    Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>,
    Map: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  };

  return (
    <div className="min-h-screen bg-gray-300 py-10 flex justify-center items-start mt-20 overflow-x-hidden">
      <div className="flex justify-center w-full">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <div
            ref={cvRef}
            className="w-[210mm] min-h-[297mm] bg-white shadow-2xl flex overflow-hidden border border-gray-400"
          >
        
        {/* LEFT BAR - Navy Blue Premium */}
        <div className="w-[35%] bg-[#0A1D37] text-white p-10 flex flex-col">
          <div className="mb-12">
            <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Contact</h3>
            <div className="space-y-5">
              <ContactRow icon={<Icons.Phone />} value={data.phone} onChange={(v) => handleChange("phone", v)} />
              <ContactRow icon={<Icons.Mail />} value={data.email} onChange={(v) => handleChange("email", v)} />
              <ContactRow icon={<Icons.Map />} value={data.location} onChange={(v) => handleChange("location", v)} />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Education</h3>
            {data.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <input value={edu.year} onChange={(e) => handleChange("education", e.target.value, idx, "year")} className="bg-transparent text-[10px] text-blue-300 w-full focus:outline-none font-bold" />
                <input value={edu.degree} onChange={(e) => handleChange("education", e.target.value, idx, "degree")} className="bg-transparent text-sm text-white w-full focus:outline-none font-semibold mt-1" />
                <input value={edu.school} onChange={(e) => handleChange("education", e.target.value, idx, "school")} className="bg-transparent text-xs text-gray-400 w-full focus:outline-none italic" />
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs tracking-[4px] font-bold text-blue-400 mb-6 uppercase">Key Skills</h3>
            <div className="space-y-3">
              {data.skills.map((skill, idx) => (
                <input key={idx} value={skill} onChange={(e) => handleChange("skills", e.target.value, idx)} className="bg-transparent text-sm text-gray-200 border-l border-blue-500 pl-3 w-full focus:outline-none" />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - Clean White & Blue */}
        <div className="flex-1 p-16">
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

          <section className="mb-16">
            <h2 className="text-sm font-bold text-[#0A1D37] uppercase tracking-widest mb-4 border-b pb-2">Profile</h2>
            <textarea 
              value={data.profile} 
              onChange={(e) => handleChange("profile", e.target.value)} 
              className="w-full text-gray-600 leading-relaxed text-sm border-none focus:ring-0 resize-none h-24"
            />
          </section>

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
                  <textarea 
                    value={exp.desc} 
                    onChange={(e) => handleChange("experience", e.target.value, idx, "desc")} 
                    className="text-sm text-gray-600 w-full focus:outline-none resize-none bg-transparent"
                  />
                </div>
              ))}
            </div>
          </section>
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
          className="px-6 py-3 bg-[#0A1D37] text-white rounded-lg hover:bg-[#1a3a5f] transition-colors font-semibold shadow-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

const ContactRow = ({ icon, value, onChange }) => (
  <div className="flex items-center gap-4">
    <span className="text-blue-400">{icon}</span>
    <input value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-xs text-gray-300 focus:outline-none w-full" />
  </div>
);

export default Template1;