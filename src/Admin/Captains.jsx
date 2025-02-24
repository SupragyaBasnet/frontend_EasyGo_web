import axios from "axios";
import { useEffect, useState } from "react";

export default function Captains() {
  const [captains, setCaptains] = useState([]);

  useEffect(() => {
    const fetchCaptains = async () => {
      try {
        const token = localStorage.getItem("adminToken"); //  Get token from localStorage
    
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
    <div className="bg-white p-6 rounded-lg shadow w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Captains List</h2>

      {/* Responsive Table Wrapper */}
      <div className="min-w-full">
        <table className="w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Phone</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-left">Vehicle</th>
              <th className="p-3 border text-left">Plate</th>
              <th className="p-3 border text-left">Capacity</th>
              <th className="p-3 border text-left">License</th>
            </tr>
          </thead>
          <tbody>
            {captains.length > 0 ? (
              captains.map((captain) => (
                <tr key={captain._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">
                    {captain?.fullname?.firstname || "Firstname"} {captain?.fullname?.lastname || "Lastname"}
                  </td>
                  <td className="p-3 border">{captain?.phonenumber || "No phone number"}</td>
                  <td className="p-3 border">{captain?.email || "Email not available"}</td>
                  <td className="p-3 border">{captain?.vehicle?.name || "N/A"}</td>
                  <td className="p-3 border">{captain?.vehicle?.plate || "N/A"}</td>
                  <td className="p-3 border">{captain?.vehicle?.capacity || "N/A"}</td>
                  <td className="p-3 border">
                    {captain.license ? (
                      <img
                        src={`http://localhost:4000${captain.license}`}
                        alt="License"
                        className="w-20 h-12 object-cover border rounded-md"
                      />
                    ) : (
                      "No License Uploaded"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 border border-gray-300 text-gray-500">
                  No captains found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
