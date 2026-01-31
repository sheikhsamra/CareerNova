import { useState } from "react";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState(""); // setter added
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Welcome to your dashboard",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient">
      <div className="w-80 p-6 shadow-lg rounded bg-white dark:bg-gray-800">
        <h2 className="heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Signup
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-[#11765d] w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-[#11765d] w-full p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="btn w-full transition"
        >
          Signup
        </button>
        <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-[#018e63] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
