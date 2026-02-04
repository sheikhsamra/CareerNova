import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedResume, setSavedResume] = useState(null);

  useEffect(() => {
    // Load saved resume from localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem("savedResume");
      if (data) {
        try {
          setSavedResume(JSON.parse(data));
        } catch (error) {
          console.error('Error parsing saved resume:', error);
        }
      }
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Saved Resumes</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {savedResume ? (
          <div className="p-4 border rounded bg-white dark:bg-gray-800 shadow-lg">
            <h3 className="font-bold text-lg">{savedResume.fullName}</h3>
            <p className="text-sm text-gray-500">{savedResume.jobTitle}</p>
            <p className="text-xs text-gray-400 mt-1">Template: {savedResume.template || 'Unknown'}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem('loadedResume', JSON.stringify(savedResume));
                    navigate(`/template/${savedResume.template?.slice(-1) || '1'}`, { state: { formData: savedResume } });
                  } else {
                    alert('Unable to load resume. LocalStorage not available.');
                  }
                }}
                className="text-blue-500 underline text-sm hover:text-blue-700"
              >
                Edit Resume
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this resume?')) {
                    if (typeof window !== 'undefined' && window.localStorage) {
                      localStorage.removeItem('savedResume');
                      setSavedResume(null);
                    } else {
                      alert('Unable to delete resume. LocalStorage not available.');
                    }
                  }
                }}
                className="text-red-500 underline text-sm hover:text-red-700 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-3 p-10 border-dashed border-2 border-gray-300 text-center">
            <p className="text-gray-500">No resume saved yet.</p>
            <button
              onClick={() => navigate("/Createresume")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Create New Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;