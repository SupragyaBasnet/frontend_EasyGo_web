import axios from "axios";
import { useEffect, useState } from "react";

export default function FinishedRides() {
  const [finishedRides, setFinishedRides] = useState([]);

  useEffect(() => {
    const fetchFinishedRides = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.error("❌ No admin token found. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:4000/admin/finished-rides", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("✅ Finished Rides Data:", response.data); // Debugging API Response
        setFinishedRides(response.data);
      } catch (error) {
        console.error("❌ Error fetching finished rides:", error.message);
      }
    };

    fetchFinishedRides();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Finished Rides</h2>
      {finishedRides.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Ride ID</th>
              <th className="border border-gray-300 p-2">Passenger</th>
              <th className="border border-gray-300 p-2">Captain</th>
              <th className="border border-gray-300 p-2">Fare (Rs.)</th>
              <th className="border border-gray-300 p-2">Distance (km)</th>
              <th className="border border-gray-300 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {finishedRides.map((ride) => (
              <tr key={ride._id} className="text-center border-t">
                <td className="border border-gray-300 p-2">{ride._id}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={ride.user?.profilePicture || "https://via.placeholder.com/40"}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    {ride.user?.fullname || "Unknown"}
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={ride.captain?.profilePicture || "https://via.placeholder.com/40"}
                      alt="Captain"
                      className="w-8 h-8 rounded-full"
                    />
                    {ride.captain?.fullname || "Unknown"}
                  </div>
                </td>
                <td className="border border-gray-300 p-2">Rs. {ride.fare}</td>
                <td className="border border-gray-300 p-2">{ride.distance} km</td>
                <td className="border border-gray-300 p-2">
                  {new Date(ride.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center py-6">No finished rides available.</p>
      )}
    </div>
  );
}
