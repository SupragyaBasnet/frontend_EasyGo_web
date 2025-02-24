import axios from "axios";
import { useState, useEffect } from "react";

export default function Passengers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken"); // ✅ Get token from localStorage

    if (!token) {
      console.error("No admin token found. Please log in again.");
      return; // Stop the request if no token is found
    }

    fetchUsers(token); // ✅ Pass the token to the fetchUsers function
  }, []);

  const fetchUsers = async (token) => {
    try {
      console.log("Fetching users...");
      const response = await axios.get("http://localhost:4000/admin/all-users", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Use token in headers
        withCredentials: true,
      });

      console.log("User data:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Passenger List</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : (
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
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{user?.fullname?.firstname || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.fullname?.lastname || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.phonenumber || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user?.email || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 border border-gray-300 text-gray-500">
                    No Passengers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
