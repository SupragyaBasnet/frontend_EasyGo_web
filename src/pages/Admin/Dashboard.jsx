import axios from "axios";
import {
  ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EasyGoLogo from "../../assets/EasyGo.png";
import Captains from "./Captains"; // ✅ Import Captains Component
import Passengers from "./Passengers"; // ✅ Import Passengers Component

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, // ✅ Ensure ArcElement is registered
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRides: 0,
    totalFare: 0,
    totalDistance: 0,
  });

  const [admin, setAdmin] = useState({ username: "Loading...", email: "Loading..." });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // ✅ Track which page is active
  const [selectedChart, setSelectedChart] = useState(null);
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // ✅ Check token in cookies
        const token = document.cookie
          .split("; ")
          .find(row => row.startsWith("token="))
          ?.split("=")[1];
  
        if (!token) {
          console.error("No admin token found. Please log in again.");
          return;
        }
  
        console.log("Fetching admin profile...");
        const response = await axios.get("http://localhost:4000/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
  
        console.log("Admin profile data:", response.data);
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error.response ? error.response.data : error.message);
      }
    };
  
    fetchAdmin();
  }, []);
  
  const fetchChartData = async (type) => {
    console.log(`Fetching ${type} data...`);
  
    let endpoint = "";
    switch (type) {
      case "totalRides":
        endpoint = "/admin/total-rides";
        break;
      case "totalFare":
        endpoint = "/admin/total-fare";
        break;
      case "totalDistance":
        endpoint = "/admin/total-distance"; // ✅ Ensure this is correct!
        break;
      default:
        return;
    }
  
    setSelectedChart(type);
    setChartData(null);
  
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found. Please log in again.");
        return;
      }
  
      const response = await axios.get(`http://localhost:4000${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
  
      console.log(`Fetched ${type} Data:`, response.data);
  
      if (response.data.length > 0) {
        setChartData(response.data);
      } else {
        setChartData([]); // Prevents rendering empty datasets
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
      setChartData([]);
    }
  };
  
  
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/admin/logout", { withCredentials: true });
      navigate("/admin_login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">EasyGo Admin</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <button 
                  onClick={() => setActivePage("dashboard")} 
                  className={`flex items-center space-x-2 p-3 rounded-lg w-full ${
                    activePage === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  📊 <span>Dashboard</span>
                </button>
              </li>
              <li className="mb-2">
                <button 
                  onClick={() => setActivePage("passengers")} 
                  className={`flex items-center space-x-2 p-3 rounded-lg w-full ${
                    activePage === "passengers" ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
                >
                  👥 <span>Passengers</span>
                </button>
              </li>
              <li className="mb-2">
  <button 
    onClick={() => {
      console.log("Switching to Captains Page"); // Debug log
      setActivePage("captains");
    }} 
    className={`flex items-center space-x-2 p-3 rounded-lg w-full ${
      activePage === "captains" ? "bg-gray-700" : "hover:bg-gray-700"
    }`}
  >
    🚖 <span>Captains</span>
  </button>
</li>

            </ul>
          </nav>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center space-x-2 p-3 rounded-lg w-full bg-red-500 hover:bg-red-600"
        >
          <LogOutIcon size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
          <div className="text-gray-700">
            <p className="text-sm font-semibold">{admin.username}</p>
            <p className="text-xs text-gray-500">{admin.email}</p>
          </div>
          <img src={EasyGoLogo} alt="EasyGo Logo" className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-lg" />
        </div>

        {/* Conditionally Render Content */}
        {activePage === "dashboard" && (
  <>
<div className="grid grid-cols-3 gap-4 mb-6">
  <div 
    className="bg-blue-500 text-white p-6 rounded-lg shadow cursor-pointer" 
    onClick={() => {
      console.log("Total Rides clicked!");
      fetchChartData("totalRides");
    }}
  >
    <h2 className="text-lg">Total Rides</h2>
    <p className="text-2xl font-bold">{stats.totalRides}</p>
  </div>
  
  <div 
    className="bg-green-500 text-white p-6 rounded-lg shadow cursor-pointer" 
    onClick={() => {
      console.log("Total Fare clicked!");
      fetchChartData("totalFare");
    }}
  >
    <h2 className="text-lg">Total Fare Earned</h2>
    <p className="text-2xl font-bold">Rs. {stats.totalFare}</p>
  </div>
  
  <div 
    className="bg-purple-500 text-white p-6 rounded-lg shadow cursor-pointer" 
    onClick={() => {
      console.log("Total Distance clicked!");
      fetchChartData("totalDistance");
    }}
  >
    <h2 className="text-lg">Total Distance Covered</h2>
    <p className="text-2xl font-bold">{stats.totalDistance} km</p>
  </div>
</div>

  </>
)}
{/* 📊 Render Charts - BELOW Total Rides, Fare, Distance */}
{activePage === "dashboard" && selectedChart && (
  <div className="w-full mt-6 bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Statistics Chart</h2>
    {chartData && chartData.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ✅ Total Rides Chart */}
        {selectedChart === "totalRides" && (
          <div className="w-full h-80 bg-white p-4 rounded-lg shadow">
            <Line
              data={{
                labels: chartData.map((d) => d._id || "Unknown Date"), // ✅ Handle missing labels
                datasets: [
                  {
                    label: "Total Rides",
                    data: chartData.map((d) => d.count || 0), // ✅ Handle missing values
                    borderColor: "blue",
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false, // ✅ Prevents chart from stretching
              }}
            />
          </div>
        )}

        {/* ✅ Total Fare Chart */}
        {selectedChart === "totalFare" && (
          <div className="w-full h-80 bg-white p-4 rounded-lg shadow">
            <Bar
              data={{
                labels: chartData.map((d) => d._id || "Unknown Date"), // ✅ Handle missing labels
                datasets: [
                  {
                    label: "Total Fare Earned",
                    data: chartData.map((d) => d.amount || 0), // ✅ Handle missing values
                    backgroundColor: "green",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false, // ✅ Prevents chart from stretching
              }}
            />
          </div>
        )}

        {/* ✅ Total Distance Chart (Pie) */}
        {selectedChart === "totalDistance" && (
          <div className="w-full h-80 bg-white p-4 rounded-lg shadow">
            <Pie
              data={{
                labels: chartData.map((d) => d._id || "Unknown Vehicle"), // ✅ Handle missing vehicle types
                datasets: [
                  {
                    label: "Total Distance Covered",
                    data: chartData.map((d) => d.distance || 0), // ✅ Handle missing distances
                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"], // ✅ More readable colors
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false, // ✅ Prevents chart from stretching
              }}
            />
          </div>
        )}
      </div>
    ) : (
      <div className="text-center text-gray-500 py-10 border-t border-gray-200">
        📉 No Data Available
      </div>
    )}
  </div>
)}


{activePage === "passengers" && <Passengers />}
{activePage === "captains" && <Captains />}

</div>


{showLogoutModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
      <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
      <div className="flex justify-between">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full mr-2"
          onClick={handleLogout}
        >
          Yes
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 w-full"
          onClick={() => setShowLogoutModal(false)}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
