import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";

export default function TotalDistanceCovered() {
  const [distanceData, setDistanceData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/admin/total-distance", { withCredentials: true })
      .then(response => setDistanceData(response.data))
      .catch(error => console.error("Error fetching total distance:", error));
  }, []);

  const chartData = {
    labels: distanceData.map(data => data.vehicleType),
    datasets: [
      {
        label: "Total Distance Covered",
        data: distanceData.map(data => data.distance),
        backgroundColor: ["purple", "orange", "blue"]
      }
    ]
  };

  return (
    <div className="p-8">
      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mt-4">Total Distance Covered Chart</h1>
      <Pie data={chartData} />
    </div>
  );
}
