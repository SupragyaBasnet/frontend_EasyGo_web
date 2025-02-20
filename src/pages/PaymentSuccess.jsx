import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(40); // Countdown from 40 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/home");
    }, 40000); // Redirect after 40 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <i className="ri-check-line text-green-500 text-6xl mb-4"></i>
        <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-600 mt-2">Thank you for your payment.</p>
        <p className="text-gray-500 text-sm mt-1">
          Redirecting to home in <strong>{seconds}</strong> seconds...
        </p>

        {/* ✅ Skip Button */}
        <button
          onClick={() => navigate("/home")}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
