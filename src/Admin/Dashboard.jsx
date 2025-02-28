import axios from "axios";
import {
  ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement,
  PointElement, Title, Tooltip
} from "chart.js";
import { LogOut, Menu as MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import EasyGoLogo from "../assets/EasyGo.png";
import Captains from "./Captains";
import Passengers from "./Passengers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [stats, setStats] = useState({ totalRides: 0, totalFare: 0, totalDistance: 0 });
  const [admin, setAdmin] = useState({ username: "Loading...", email: "Loading..." });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [chartData, setChartData] = useState({ rides: [], fare: [], distance: [] });
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear the token
    navigate("/admin_login"); // Redirect to the login page or home
  };
  

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("No admin token found.");
          return;
        }

        const response = await axios.get("http://localhost:4000/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin profile:", error.message);
      }
    };

    fetchAdmin();
  }, []);

  const fetchChartData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found.");
        return;
      }

      const [ridesRes, fareRes, distanceRes] = await Promise.all([
        axios.get("http://localhost:4000/admin/total-rides", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:4000/admin/total-fare", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:4000/admin/total-distance", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const totalRides = ridesRes.data.reduce((sum, ride) => sum + (ride.count || 0), 0);
      const totalFare = fareRes.data.reduce((sum, fare) => sum + (fare.amount || 0), 0);
      const totalDistance = distanceRes.data.reduce((sum, dist) => sum + (dist.distance || 0), 0);

      setStats({ totalRides, totalFare, totalDistance });
      setChartData({ rides: ridesRes.data, fare: fareRes.data, distance: distanceRes.data });
    } catch (error) {
      console.error("Error fetching statistics:", error.message);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="flex h-screen">
    {/* Mobile Sidebar Toggle */}
    <button 
      className="fixed top-4 left-4 md:hidden bg-gray-800 text-white p-2 rounded-lg z-50"
      onClick={() => setShowSidebar(!showSidebar)}
    >
      <MenuIcon size={24} />
    </button>

    {/* Sidebar */}
    <div 
      className={`fixed md:static inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 flex flex-col justify-between transition-transform duration-300 ${
        showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div>
        <h2 className="text-xl font-bold mb-6">EasyGo Admin</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <button onClick={() => setActivePage("dashboard")}
                className={`flex items-center space-x-2 p-3 rounded-lg w-full ${
                  activePage === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                📊 <span>Dashboard</span>
              </button>
            </li>
            <li className="mb-2">
              <button onClick={() => setActivePage("passengers")}
                className={`flex items-center space-x-2 p-3 rounded-lg w-full ${
                  activePage === "passengers" ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                👥 <span>Passengers</span>
              </button>
            </li>  
            <li className="mb-2">
              <button onClick={() => setActivePage("captains")}
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

      {/* Logout Button */}
      <button className="flex items-center space-x-2 p-3 rounded-lg w-full bg-red-500 hover:bg-red-600"onClick={() => setShowLogoutModal(true)}  // This will open the logout modal
  >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6 md:p-8">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <div className="text-gray-700">
          <p className="text-sm font-semibold">{admin.username}</p>
          <p className="text-xs text-gray-500">{admin.email}</p>
        </div>
        <img src={EasyGoLogo} alt="EasyGo Logo" className="h-12 w-12 rounded-full border-2 shadow-lg" />
      </div>

      {/* Dashboard Section */}
      {activePage === "dashboard" && (
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow text-center">
              <h2 className="text-lg">Total Rides</h2>
              <p className="text-2xl font-bold">{stats.totalRides}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow text-center">
              <h2 className="text-lg">Total Fare Earned</h2>
              <p className="text-2xl font-bold">Rs. {stats.totalFare.toFixed(2)}</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow text-center">
              <h2 className="text-lg">Total Distance Covered</h2>
              <p className="text-2xl font-bold">{stats.totalDistance.toFixed(2)} km</p>
            </div>
          </div>

          {/* Charts Section (Bar & Pie side by side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[430px]">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4 text-center">Monthly Statistics</h2>
              <div className="flex-1">
                <Bar
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      { label: "Total Rides", data: chartData.rides.map(d => d.count || 0), backgroundColor: "blue" },
                      { label: "Total Fare Earned", data: chartData.fare.map(d => d.amount || 0), backgroundColor: "green" },
                      { label: "Total Distance Covered", data: chartData.distance.map(d => d.distance || 0), backgroundColor: "purple" },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-lg shadow flex flex-col h-full">
              <h2 className="text-lg font-semibold mb-4 text-center">Overall Distribution</h2>
              <div className="flex-1 flex items-center justify-center">
                <Pie
                  data={{
                    labels: ["Total Rides", "Total Fare", "Total Distance"],
                    datasets: [
                      { data: [stats.totalRides, stats.totalFare, stats.totalDistance], backgroundColor: ["blue", "green", "purple"] },
                    ],
                  }}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </>
      )}

  {activePage === "passengers" && (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* <h2 className="text-2xl font-bold mb-4">Passengers</h2> */}
      <Passengers />
    </div>
  )}

  {activePage === "captains" && (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* <h2 className="text-2xl font-bold mb-4">Captains</h2> */}
      <Captains />
    </div>
  )}
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

        {activePage === "finishedRides" && <FinishedRides />}
      </div>
    </div>
  </div>
)}

    </div>
  );
}
