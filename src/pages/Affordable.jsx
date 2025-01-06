import React, { useEffect, useState } from 'react';
import affordableImage1 from '../assets/affordable.jpg';
import affordableImage2 from '../assets/affordable1.jpg';
import affordableImage3 from '../assets/affordable2.jpg';

const Affordable = () => {
  const [currentImage, setCurrentImage] = useState(affordableImage1);
  const images = [affordableImage1, affordableImage2, affordableImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="bg-green-500 text-white text-center py-6">
        <h1 className="text-3xl font-bold">Affordable Rides</h1>
        <p className="text-lg mt-2">Travel smart, travel affordably with EasyGo.</p>
      </header>

      {/* Main Section */}
      <main className="flex-grow">
        {/* Image Section */}
        <div className="text-center my-8">
          <img
            src={currentImage}
            alt="Affordable rides"
            className="w-screen h-[90vh] object-cover transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg"
          />
        </div>

        {/* Details Section */}
        <section className="max-w-5xl mx-auto bg-gray-100 rounded-lg p-8 shadow-md text-center">
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Why Choose Affordable Rides?</h2>
          <p className="text-gray-600 text-base mb-8">
            EasyGo offers the perfect blend of comfort and affordability, ensuring a delightful journey every time.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-500 mb-2">Low-Cost Options</h3>
              <p className="text-gray-600">Tailored rides to fit your budget without compromising quality.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-500 mb-2">Carpooling</h3>
              <p className="text-gray-600">Share rides, save money, and reduce your carbon footprint.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <h3 className="text-lg font-semibold text-green-500 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden charges—just honest fares for every ride.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; 2025 EasyGo. Your trusted travel partner.</p>
      </footer>
    </div>
  );
};

export default Affordable;
