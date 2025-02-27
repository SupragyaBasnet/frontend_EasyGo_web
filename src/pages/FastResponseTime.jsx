import React from 'react';
import trackingImage1 from '../assets/tracking2.jpg';
import trackingImage2 from '../assets/tracking1.jpg';
import trackingImage3 from '../assets/tracking2.webp';

const FastResponseTime = () => {
  const trackingFeatures = [
    {
      image: trackingImage1,
      title: 'Quick Driver Matching',
      description: 'Get connected to a nearby driver instantly after requesting a ride.',
    },
    {
      image: trackingImage2,
      title: 'Efficient Route Selection',
      description: 'Drivers follow optimized routes to get you to your destination faster.',
    },
    {
      image: trackingImage3,
      title: 'Rider & User Visibility',
      description: 'Riders can see user details and users can view rider information for a safer experience.',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-green-500 text-white text-center py-6">
        <div>
          <h1 className="text-4xl font-bold">Fast Response Time</h1>
          <p className="mt-2 text-lg">Experience quick ride confirmations and seamless travel.</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow">
        <section className="text-center max-w-7xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-green-500 mb-8">Our Fast Response Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trackingFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 p-6"
              >
                <img
  src={feature.image}
  alt={feature.title}
  className="w-full h-[500px] object-cover rounded-md mb-4"
/>

                <h3 className="text-xl font-semibold text-green-500 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
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

export default FastResponseTime;
