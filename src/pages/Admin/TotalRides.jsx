import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";

export default function TotalRides() {
  const [ridesData, setRidesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/admin/total-rides", { withCredentials: true })
      .then(response => setRidesData(response.data))
      .catch(error => console.error("Error fetching total rides:", error));
  }, []);

  const chartData = {
    labels: ridesData.map(data => data.date),
    datasets: [
      {
        label: "Total Rides",
        data: ridesData.map(data => data.count),
        borderColor: "blue",
        fill: false
      }
    ]
  };

  return (
    <div className="p-8">
      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mt-4">Total Rides Chart</h1>
      <Line data={chartData} />
    </div>
  );
}
