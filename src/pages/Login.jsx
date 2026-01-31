import { useState } from "react";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../utils/firebase"; 
import { useNavigate , Link} from "react-router-dom";
import Swal from "sweetalert2";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() =>{
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
              });
        }
    };
    
    
return(
    <>
     <div className="h-screen flex items-center justify-center bg-gradient">
      <div className="w-80 p-6 shadow-lg rounded bg-white dark:bg-gray-800">
        <h2 className="heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded border-[#11765d]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded border-[#11765d]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="btn w-full transition"
        >
          Login
        </button>
        <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
          Don't have an account? <Link to="/signup" className="text-[#018e63] hover:underline">Signup</Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;