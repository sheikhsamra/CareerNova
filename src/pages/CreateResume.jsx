import React, { useState, useEffect } from "react";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

const CreateResume = () => {
  const navigate = useNavigate();

  // Initial State Helper
  const initialState = {
    fullName: "",
    jobTitle: "",
    gender: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedIn: "",
    profile: "",
    languages: [""],
    skills: [""],
    experience: [{ role: "", company: "", year: "", desc: "" }],
    education: [{ degree: "", school: "", year: "" }],
  };

  // 1. Initialize State from LocalStorage or Default
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("resumeFormData");
    return saved ? JSON.parse(saved) : initialState;
  });

  // 2. Save to LocalStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, field, subField = null) => {
    const values = [...formData[field]];
    if (subField) {
      values[index] = { ...values[index], [subField]: e.target.value };
    } else {
      values[index] = e.target.value;
    }
    setFormData({ ...formData, [field]: values });
  };

  const addField = (field) => {
    if (field === 'experience') {
      setFormData({
        ...formData,
        [field]: [...formData[field], { role: "", company: "", year: "", desc: "" }]
      });
    } else if (field === 'education') {
      setFormData({
        ...formData,
        [field]: [...formData[field], { degree: "", school: "", year: "" }]
      });
    } else {
      setFormData({ ...formData, [field]: [...formData[field], ""] });
    }
  };

  const removeField = (field, index) => {
    const values = [...formData[field]];
    values.splice(index, 1);
    setFormData({ ...formData, [field]: values });
  };

  // Clear Form Function
  const clearForm = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      setFormData(initialState);
      localStorage.removeItem("resumeFormData");
    }
  };

  return (
    <>
      <Navbar />
      <div className="resume-container min-h-screen flex flex-col items-center px-4 py-10 transition-colors duration-300 mt-20">
        <div className="w-full max-w-4xl resume-card-theme p-6 md:p-10 rounded-xl shadow-2xl border">
          
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold heading">Create Your Resume</h1>
            <button 
              onClick={clearForm}
              className="px-4 py-2 text-sm bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
              Clear Form
            </button>
          </div>

          <form className="space-y-8 resume-form">
            {/* Personal Info Section */}
            <section>
              <h2 className="font-semibold text-xl mb-4 section-heading pb-2 text-[#10b98c]">
                Personal Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="fullName" value={formData.fullName} placeholder="Full Name" onChange={handleChange} className="input-theme" />
                <input type="text" name="jobTitle" value={formData.jobTitle} placeholder="Job Title" onChange={handleChange} className="input-theme" />
                
                <select name="gender" value={formData.gender} onChange={handleChange} className="input-theme md:col-span-2">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="input-theme" />
                <input type="text" name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} className="input-theme" />
                <input type="text" name="location" value={formData.location} placeholder="Location" onChange={handleChange} className="input-theme md:col-span-2" />
                <input type="text" name="website" value={formData.website} placeholder="Website URL" onChange={handleChange} className="input-theme" />
                <input type="text" name="linkedIn" value={formData.linkedIn} placeholder="LinkedIn URL" onChange={handleChange} className="input-theme" />
              </div>
            </section>

            {/* Profile Summary */}
            <section>
              <h2 className="font-semibold text-xl mb-4 section-heading pb-2 text-[#10b98c]">
                Profile Summary
              </h2>
              <textarea name="profile" value={formData.profile} rows="4" placeholder="Describe yourself professionally..." onChange={handleChange} className="input-theme w-full" />
            </section>

            {/* Dynamic Fields Section */}
            <div className="space-y-6">
              <DynamicField label="Languages" values={formData.languages} addField={() => addField("languages")} removeField={(idx) => removeField("languages", idx)} handleChange={(e, idx) => handleArrayChange(e, idx, "languages")} />
              <DynamicField label="Skills" values={formData.skills} addField={() => addField("skills")} removeField={(idx) => removeField("skills", idx)} handleChange={(e, idx) => handleArrayChange(e, idx, "skills")} />
              <DynamicField label="Experience" values={formData.experience} addField={() => addField("experience")} removeField={(idx) => removeField("experience", idx)} handleChange={(e, idx, subField) => handleArrayChange(e, idx, "experience", subField)} />
              <DynamicField label="Education" values={formData.education} addField={() => addField("education")} removeField={(idx) => removeField("education", idx)} handleChange={(e, idx, subField) => handleArrayChange(e, idx, "education", subField)} />
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => navigate("/templates", { state: { formData } })}
              className="btn w-full py-4 mt-6 text-lg font-bold"
            >
              Proceed to Choose Template
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// -------------------- DynamicField Component --------------------
const DynamicField = ({ label, values, addField, removeField, handleChange }) => {
  const getFieldsForLabel = (labelName) => {
    if (labelName === 'Experience') return ['role', 'company', 'year', 'desc'];
    if (labelName === 'Education') return ['degree', 'school', 'year'];
    return [];
  };

  const isComplexObject = ['Experience', 'Education'].includes(label);

  return (
    <div className="dynamic-box-theme p-4 rounded-lg transition-all border border-gray-100 dark:border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg dynamic-title">{label}</h2>
        <button
          type="button"
          onClick={addField}
          className="px-4 py-1.5 text-sm btn-small rounded-md transition-all bg-[#10b98c] text-white"
        >
          + Add More
        </button>
      </div>

      <div className="space-y-4">
        {values.map((val, idx) => (
          <div key={idx} className="dynamic-item-border rounded p-4 relative border border-dashed border-gray-300 dark:border-gray-700">
            {values.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(idx)}
                className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
              >
                <ImBin size={16} />
              </button>
            )}

            {isComplexObject ? (
              getFieldsForLabel(label).map((field, fieldIdx) => (
                <div key={fieldIdx} className="mb-3 last:mb-0">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    {field}
                  </label>
                  {field === 'desc' ? (
                    <textarea rows="2" value={val[field] || ''} onChange={(e) => handleChange(e, idx, field)} className="input-theme w-full" placeholder={`Enter ${field}`} />
                  ) : (
                    <input type="text" value={val[field] || ''} onChange={(e) => handleChange(e, idx, field)} className="input-theme w-full" placeholder={`Enter ${field}`} />
                  )}
                </div>
              ))
            ) : (
              <div className="flex gap-3 items-center">
                <input type="text" value={val} onChange={(e) => handleChange(e, idx)} className="input-theme flex-1" placeholder={`Enter ${label}...`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateResume;