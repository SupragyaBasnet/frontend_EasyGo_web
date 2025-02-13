import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EasyGoLogo from "../../assets/EasyGo.png"; // Import the logo
import { LogOutIcon } from "lucide-react"; // Import Logout icon

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRides: 0,
    totalFare: 0,
    totalDistance: 0,
    users: [],
    captains: [],
  });

  const [admin, setAdmin] = useState({ username: "Loading...", email: "Loading..." });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activePage, setActivePage] = useState("dashboard"); // Track active page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/dashboard", { withCredentials: true });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/profile", { withCredentials: true });
        if (response.data && response.data.username && response.data.email) {
          setAdmin(response.data);
        } else {
          setAdmin({ username: "Unknown", email: "Not Available" });
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setAdmin({ username: "Error", email: "Error fetching data" });
      }
    };

    fetchStats();
    fetchAdmin();
  }, []);

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
                  onClick={() => setActivePage("captains")} 
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

        {/* LOGOUT BUTTON - Shows Confirmation Modal */}
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

          {/* Just a Logo - No Logout on Click */}
          <img src={EasyGoLogo} alt="EasyGo Logo" className="h-12 w-12 rounded-full border-2 border-gray-300 shadow-lg" />
        </div>

        {/* Conditionally Render Dashboard Data */}
        {activePage === "dashboard" && (
          <div>
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow cursor-pointer" onClick={() => navigate("/total-rides")}>
        <h2 className="text-lg">Total Rides</h2>
        <p className="text-2xl font-bold">{stats.totalRides}</p>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-lg shadow cursor-pointer" onClick={() => navigate("/total-fare")}>
        <h2 className="text-lg">Total Fare Earned</h2>
        <p className="text-2xl font-bold">Rs. {stats.totalFare}</p>
      </div>

      <div className="bg-purple-500 text-white p-6 rounded-lg shadow cursor-pointer" onClick={() => navigate("/total-distance")}>
        <h2 className="text-lg">Total Distance Covered</h2>
        <p className="text-2xl font-bold">{stats.totalDistance} km</p>
      </div>
    </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
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
    </div>
  );
}
