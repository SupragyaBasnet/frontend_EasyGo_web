import axios from "axios";
import { useEffect, useState } from "react";

export default function Captains() {
  const [captains, setCaptains] = useState([]);

  useEffect(() => {
    const fetchCaptains = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // ✅ Get token from localStorage
    
        if (!token) {
          console.error("No admin token found. Please log in again.");
          return;
        }
    
        console.log("Fetching captains...");
        const response = await axios.get("http://localhost:4000/admin/all-captains", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
    
        console.log("Captains data:", response.data);
        setCaptains(response.data);
      } catch (error) {
        console.error("Error fetching captains:", error.response ? error.response.data : error.message);
      }
    };
    

    fetchCaptains(); // ✅ Call the function inside useEffect
  }, []); // ✅ Ensure useEffect runs only once on component mount

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Captains List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Vehicle</th>
            <th className="p-3 border">Vehicle Type</th>
            <th className="p-3 border">Plate</th>
            <th className="p-3 border">Capacity</th>
            <th className="p-3 border">License</th>
          </tr>
        </thead>
        <tbody>
          {captains.length > 0 ? (
            captains.map((captain) => (
              <tr key={captain._id} className="border-b">
                <td className="p-3 border">
                  {captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}
                </td>
                <td className="p-3 border">{captain?.phonenumber || "No phone number"}</td>
                <td className="p-3 border">{captain?.email || "Email not available"}</td>
                <td className="p-3 border">{captain?.vehicle?.name || "N/A"}</td>
                <td className="p-3 border">{captain?.vehicle?.vehicleType || "N/A"}</td>
                <td className="p-3 border">{captain?.vehicle?.plate || "N/A"}</td>
                <td className="p-3 border">{captain?.vehicle?.capacity || "N/A"}</td>
                <td className="p-3 border">
                  {captain.license ? (
                    <img
                      src={`http://localhost:4000${captain.license}`}
                      alt="License"
                      className="w-24 h-16 object-cover border rounded-md"
                      onError={(e) => {
                        console.error("❌ Error loading license image:", e.target.src);
                        e.target.onerror = null;
                        e.target.src = "/default-license.jpg"; // Fallback image
                      }}
                    />
                  ) : (
                    "No License Uploaded"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-3 border">No captains found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
