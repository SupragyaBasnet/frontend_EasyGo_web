import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import affordableImage from "../assets/affordable.jpg";
import carImage1 from "../assets/car1.png";
import carImage2 from "../assets/car2.jpg";
import carImage3 from "../assets/car3.jpg";
import carImage4 from "../assets/car4.jpg";
import carImage5 from "../assets/car5.jpg";
import EasyGo from "../assets/EasyGo.png";
import safetyImage from "../assets/safety.jpg";
import trackingImage from "../assets/tracking2.jpg";


const Start = () => {
  const navigate = useNavigate();
  const [currentCarImage, setCurrentCarImage] = useState(carImage1);
  const carImages = [carImage1, carImage2, carImage3, carImage4, carImage5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarImage((prevImage) => {
        const currentIndex = carImages.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % carImages.length;
        return carImages[nextIndex];
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [carImages]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="relative bg-black text-white">
        <div className="flex justify-between items-center px-6 py-4">
          <img
            src={EasyGo}
            alt="EasyGo Logo"
            className="w-14 h-14 rounded-full bg-white p-1 border-2 border-black"
          />
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-200"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="h-screen overflow-hidden">
          <img
            src={currentCarImage}
            alt="Car"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-white py-10 shadow-md">
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Why EasyGo?
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li
              className="text-center cursor-pointer hover:shadow-lg"
              onClick={() => navigate("/affordable")}
            >
              <img
                src={affordableImage}
                alt="Affordable rides"
                className="w-64 h-72 object-cover mx-auto rounded-md"
              />
              <p className="mt-4 text-lg font-medium">Affordable rides</p>
            </li>
            <li
              className="text-center cursor-pointer hover:shadow-lg"
              onClick={() => navigate("/EasyRideRequest")}
            >
              <img
                src={safetyImage}
                alt="EasyRideRequest features"
                className="w-64 h-72 object-cover mx-auto rounded-md"
              />
              <p className="mt-4 text-lg font-medium">Easy Ride Request</p>
            </li>
            <li
              className="text-center cursor-pointer hover:shadow-lg"
              onClick={() => navigate("/FastResponseTime")}
            >
              <img
                src={trackingImage}
                alt="Real-time tracking"
                className="w-64 h-72 object-cover mx-auto rounded-md"
              />
              <p className="mt-4 text-lg font-medium">Fast Response Time</p>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4 border-t border-gray-700">
        <p>&copy; 2025 EasyGo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Start;
