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
    experience: [{ role: "", company: "", year: "", desc: "" }], 
    education: [{ degree: "", school: "", year: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, field, subField = null) => {
    const values = [...formData[field]];
    if (subField) {
      // Handle complex object fields (experience, education)
      values[index] = { ...values[index], [subField]: e.target.value };
    } else {
      // Handle simple array fields (skills, languages)
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center px-4 py-10 transition-colors duration-300 mt-20">
      <div className="w-full max-w-4xl bg-white dark:bg-[#0d312a] p-6 md:p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Create Your Resume
        </h1>

        <form className="space-y-8">
          {/* Personal Info Section */}
          <section>
            <h2 className="font-semibold text-xl mb-4 text-[#10b98c] border-b border-gray-200 dark:border-gray-700 pb-2">
              Personal Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="input-theme" />
              <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} className="input-theme" />
              
              <select name="gender" onChange={handleChange} className="input-theme md:col-span-2">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-theme" />
              <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="input-theme" />
              
              <input type="text" name="location" placeholder="Location" onChange={handleChange} className="input-theme md:col-span-2" />
              
              <input type="text" name="website" placeholder="Website URL" onChange={handleChange} className="input-theme" />
              <input type="text" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} className="input-theme" />
            </div>
          </section>

          {/* Profile Summary */}
          <section>
            <h2 className="font-semibold text-xl mb-4 text-[#10b98c] border-b border-gray-200 dark:border-gray-700 pb-2">
              Profile Summary
            </h2>
            <textarea name="profile" rows="4" placeholder="Describe yourself professionally..." onChange={handleChange} className="input-theme w-full" />
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
            className="w-full py-4 mt-6 rounded-lg text-white font-bold bg-linear-to-r from-[#10b98c] to-[#0d312a] hover:scale-[1.01] transition-all duration-300 shadow-md"
          >
            Proceed to Choose Template
          </button>
        </form>
      </div>
    </div>
  );
};

// -------------------- DynamicField Component --------------------
const DynamicField = ({ label, values, addField, removeField, handleChange, textarea }) => {
  // Define fields for complex objects (experience, education)
  const getFieldsForLabel = (labelName) => {
    if (labelName === 'Experience') {
      return ['role', 'company', 'year', 'desc'];
    } else if (labelName === 'Education') {
      return ['degree', 'school', 'year'];
    }
    return [];
  };

  const isComplexObject = ['Experience', 'Education'].includes(label);

  return (
    <div className="bg-gray-50 dark:bg-[#0a2520] p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{label}</h2>
        <button
          type="button"
          onClick={addField}
          className="px-3 py-1 text-sm bg-[#10b98c] text-white rounded-md hover:bg-[#0e9e78] transition-colors"
        >
          + Add More
        </button>
      </div>

      <div className="space-y-3">
        {values.map((val, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-600 rounded p-3">
            {isComplexObject ? (
              // Render multiple inputs for complex objects
              getFieldsForLabel(label).map((field, fieldIdx) => (
                <div key={fieldIdx} className="mb-2 last:mb-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {field === 'desc' ? (
                    <textarea
                      rows="2"
                      value={val[field] || ''}
                      onChange={(e) => handleChange(e, idx, field)}
                      className="input-theme w-full"
                      placeholder={`Enter ${field}`}
                    />
                  ) : (
                    <input
                      type="text"
                      value={val[field] || ''}
                      onChange={(e) => handleChange(e, idx, field)}
                      className="input-theme w-full"
                      placeholder={`Enter ${field}`}
                    />
                  )}
                </div>
              ))
            ) : (
              // Render single input for simple arrays
              <div className="flex gap-3 items-start">
                {textarea ? (
                  <textarea rows="3" value={val} onChange={(e) => handleChange(e, idx)} className="input-theme flex-1" placeholder={`Enter ${label}...`} />
                ) : (
                  <input type="text" value={val} onChange={(e) => handleChange(e, idx)} className="input-theme flex-1" placeholder={`Enter ${label}...`} />
                )}

                {values.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField(idx)}
                    className="mt-3 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                  >
                    <ImBin size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateResume;