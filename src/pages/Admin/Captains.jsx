import { useEffect, useState } from "react";
import axios from "axios";

export default function Captains() {
  const [captains, setCaptains] = useState([]);

  useEffect(() => {
    const fetchCaptains = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/captains", { withCredentials: true });
        setCaptains(response.data);
      } catch (error) {
        console.error("Error fetching captains data:", error);
      }
    };

    fetchCaptains();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {captains.length > 0 ? (
            captains.map((captain) => (
              <tr key={captain._id} className="border-b">
                <td className="p-3 border">{captain.fullname.firstname} {captain.fullname.lastname}</td>
                <td className="p-3 border">{captain.phonenumber}</td>
                <td className="p-3 border">{captain.email}</td>
                <td className="p-3 border">{captain.vehicle.name} - {captain.vehicle.plate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-3 border">No captains found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
