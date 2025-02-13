// Email (Admin Types) → admin@easygo.com
// Username (Auto-filled) → admin
// Password (Admin Types) → EasyGo@123


import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import icons
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EasyGoLogo from "../../assets/EasyGo.png"; // Import the logo




export default function AdminLogin() {
  const [email, setEmail] = useState(""); // Admin should type this
  const [username, setUsername] = useState(""); // Auto-filled
  const [password, setPassword] = useState(""); // Must be manually entered
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/admin/login", { 
        email, 
        username, 
        password 
      }, { withCredentials: true });
  
      // ✅ Store token in localStorage
      localStorage.setItem("adminToken", response.data.token);
  
      navigate("/dashboard"); // Redirect to Dashboard after login
    } catch (error) {
      alert("Invalid credentials");
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 shadow-lg rounded-lg w-96" onSubmit={handleLogin}>
        
        {/* Logo */}
       <div className="flex justify-center mb-4">
          <img src={EasyGoLogo} alt="EasyGo Logo" className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-lg" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>

        {/* Email Field (Admin must type) */}
        <input 
          type="email" 
          placeholder="Email" 
          className="p-2 border w-full mb-2" 
          value={email}  
          onChange={(e) => setEmail(e.target.value)}
          required 
        />

        {/* Username Field (Fixed) */}
        <input 
          type="text" 
          placeholder="Username" 
          className="p-2 border w-full mb-2 " 
          value={username}  
          onChange={(e) => setUsername(e.target.value)}
          required 
        />

        {/* Password Field (Admin must type) */}
        <div className="relative mb-4">
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password" 
          className="p-2 border w-full mb-4" 
          value={password}  
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button 
            type="button" 
            className="absolute right-3 top-3 text-gray-600" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}
