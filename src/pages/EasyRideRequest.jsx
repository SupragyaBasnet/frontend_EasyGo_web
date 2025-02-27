import React from 'react';
import rideImage1 from '../assets/safety.jpg';
import rideImage2 from '../assets/safety1.jpg';
import rideImage3 from '../assets/safety2.jpg';

const EasyRideRequest = () => {
  const rideFeatures = [
    {
      image: rideImage1,
      title: 'Quick Ride Requests',
      description: 'Request a ride in just a few taps and get matched with a nearby driver instantly.',
    },
    {
      image: rideImage2,
      title: 'Fast Driver Acceptance',
      description: 'Drivers respond quickly, ensuring you don’t have to wait too long for your ride.',
    },
    {
      image: rideImage3,
      title: 'Simple & Affordable',
      description: 'Enjoy a seamless and budget-friendly ride experience without any hassle.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-500 text-white text-center py-5 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold">Easy Ride Requests</h1>
        <p className="mt-2 text-lg">Seamless booking and quick ride matching.</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="text-center my-10 mx-auto max-w-6xl bg-gray-100 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-500 mb-6">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rideFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transform hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-50 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-medium text-green-500 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-3 text-sm">
        <p>&copy; 2025 EasyGo. Making rides simpler.</p>
      </footer>
    </div>
  );
};

export default EasyRideRequest;
