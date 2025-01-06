import React from 'react';
import safetyImage1 from '../assets/safety.jpg';
import safetyImage2 from '../assets/safety1.jpg';
import safetyImage3 from '../assets/safety2.jpg';

const Safety = () => {
  const safetyFeatures = [
    {
      image: safetyImage1,
      title: 'Verified Drivers',
      description: 'All drivers are background checked and verified for your safety.',
    },
    {
      image: safetyImage2,
      title: 'Emergency Assistance',
      description: 'Access 24/7 emergency support directly from the app.',
    },
    {
      image: safetyImage3,
      title: 'Live Location Sharing',
      description: 'Share your live location with family and friends for added peace of mind.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-500 text-white text-center py-5 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold">Safety First</h1>
        <p className="mt-2 text-lg">Your safety is our priority at EasyGo.</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="text-center my-10 mx-auto max-w-6xl bg-gray-100 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-green-500 mb-6">Our Safety Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safetyFeatures.map((feature, index) => (
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
        <p>&copy; 2025 EasyGo. Your trusted travel partner.</p>
      </footer>
    </div>
  );
};

export default Safety;
