import { useEffect, useState } from "react";
import axios from "axios";

export default function Passengers() {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/all-users", { withCredentials: true });
        setPassengers(response.data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };

    fetchPassengers();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Registered Passengers</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {passengers.length > 0 ? (
              passengers.map((passenger, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{passenger.fullname.firstname}</td>
                  <td className="border border-gray-300 px-4 py-2">{passenger.fullname.lastname}</td>
                  <td className="border border-gray-300 px-4 py-2">{passenger.phonenumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{passenger.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 border border-gray-300 text-gray-500">
                  No passengers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
