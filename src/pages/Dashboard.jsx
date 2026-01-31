import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savedCV, setSavedCV] = useState(null);

  useEffect(() => {
    // LocalStorage se data uthana
    const data = localStorage.getItem("savedCV");
    if (data) {
      setSavedCV(JSON.parse(data));
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
        {savedCV ? (
          <div className="p-4 border rounded bg-white dark:bg-gray-800 shadow-lg">
            <h3 className="font-bold text-lg">{savedCV.fullName}</h3>
            <p className="text-sm text-gray-500">{savedCV.jobTitle}</p>
            <div className="mt-4 flex gap-2">
              <Link to="/template1" state={{ formData: savedCV }} className="text-blue-500 underline text-sm">
                Edit Resume
              </Link>
            </div>
          </div>
        ) : (
          <div className="col-span-3 p-10 border-dashed border-2 border-gray-300 text-center">
            <p className="text-gray-500">Abhi tak koi CV save nahi ki gayi.</p>
            <button 
              onClick={() => navigate("/form")} // فرض کریں آپ کا فارم اس روٹ پر ہے
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
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