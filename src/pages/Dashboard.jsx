import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
  

      {/* Yahan Resume Form aur Templates load karenge */}
      <div className="mt-6 p-4 border rounded bg-white dark:bg-gray-800">
        <p>Dashboard content will go here…</p>
      </div>
    </div>
  );
};

export default Dashboard;
