import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export default function TotalFare() {
  const [fareData, setFareData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/admin/total-fare", { withCredentials: true })
      .then(response => setFareData(response.data))
      .catch(error => console.error("Error fetching total fare:", error));
  }, []);

  const chartData = {
    labels: fareData.map(data => data.date),
    datasets: [
      {
        label: "Total Fare Earned",
        data: fareData.map(data => data.amount),
        backgroundColor: "green"
      }
    ]
  };

  return (
    <div className="p-8">
      <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold mt-4">Total Fare Chart</h1>
      <Bar data={chartData} />
    </div>
  );
}
