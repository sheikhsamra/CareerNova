import React, { useState } from "react";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const CreateResume = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    experience: [""],
    education: [""],
  });

  // Generic input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic array change
  const handleArrayChange = (e, index, field) => {
    const values = [...formData[field]];
    values[index] = e.target.value;
    setFormData({ ...formData, [field]: values });
  };

  // Add / Remove dynamic field
  const addField = (field) =>
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  const removeField = (field, index) => {
    const values = [...formData[field]];
    values.splice(index, 1);
    setFormData({ ...formData, [field]: values });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center px-4 py-10 transition-colors duration-300 mt-20">
      <div className="w-full max-w-4xl bg-white dark:bg-[#0d312a] p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
          Create Your Resume
        </h1>

        <form className="space-y-5">
          {/* Personal Info */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Personal Info</h2>
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="input-theme" />
            <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} className="input-theme" />
            <select name="gender" onChange={handleChange} className="input-theme">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <div className="grid md:grid-cols-2 gap-4">
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-theme" />
<br />
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="input-theme" />
            </div>
<br />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} className="input-theme" />
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" name="website" placeholder="Website URL" onChange={handleChange} className="input-theme" />
              <br />
              <input type="text" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} className="input-theme" />
            </div>
          </div>

          {/* Profile */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Profile Summary</h2>
            <textarea name="profile" rows="4" placeholder="Professional summary..." onChange={handleChange} className="input-theme" />
          </div>

          {/* Dynamic Fields */}
          <DynamicField label="Languages" values={formData.languages} addField={() => addField("languages")} removeField={(idx) => removeField("languages", idx)} handleChange={(e, idx) => handleArrayChange(e, idx, "languages")} />
          <DynamicField label="Skills" values={formData.skills} addField={() => addField("skills")} removeField={(idx) => removeField("skills", idx)} handleChange={(e, idx) => handleArrayChange(e, idx, "skills")} />
          <DynamicField label="Experience" values={formData.experience} addField={() => addField("experience")} removeField={(idx) => removeField("experience", idx)} handleChange={(e, idx) => handleArrayChange(e, idx, "experience")} textarea />
          <DynamicField label="Education" values={formData.education} addField={() => addField("education")} removeField={(idx) => removeField("education", idx)} handleChange={(e, idx) => handleArrayChange(e, idx, "education")} textarea />

          {/* Choose Template Button */}
          <button
            type="button"
            onClick={() => navigate("/templates", { state: { formData } })}
            className="w-full py-3 rounded text-white font-semibold bg-linear-to-r from-[#10b98c] to-[#0d312a] hover:opacity-90 transition-all duration-300"
          >
            Choose Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateResume;

// -------------------- DynamicField --------------------
const DynamicField = ({ label, values, addField, removeField, handleChange, textarea }) => {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-2 flex justify-between items-center">
        {label}
        <button type="button" onClick={addField} className="text-sm text-[#10b98c] cursor-pointer">+ Add</button>
      </h2>
      {values.map((val, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          {textarea ? (
            <textarea rows="3" value={val} onChange={(e) => handleChange(e, idx)} className="input-theme flex-1" />
          ) : (
            <input type="text" value={val} onChange={(e) => handleChange(e, idx)} className="input-theme flex-1" />
          )}
          {idx > 0 && (
            <button type="button" onClick={() => removeField(idx)} className="text-[#ff2600] cursor-pointer"><ImBin /></button>
          )}
        </div>
      ))}
    </div>
  );
};
