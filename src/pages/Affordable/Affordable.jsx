import React, { useEffect, useState } from 'react';
import affordableImage1 from '../../assets/affordable.jpg';
import affordableImage2 from '../../assets/affordable1.jpg';
import affordableImage3 from '../../assets/affordable2.jpg';
import './Affordable.css';

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
    <div className="affordable-container">
      <header className="affordable-header">
        <div className="header-content">
          <h1>Affordable Rides</h1>
          <p>Travel smart, travel affordably with EasyGo.</p>
        </div>
      </header>

      <main className="affordable-main">
        <div className="affordable-image-container">
          <img src={currentImage} alt="Affordable rides" className="affordable-image" />
        </div>

        <section className="affordable-details">
          <h2>Why Choose Affordable Rides?</h2>
          <p>EasyGo offers the perfect blend of comfort and affordability, ensuring a delightful journey every time.</p>
          <div className="features-wrapper">
            <div className="feature">
              <h3>Low-Cost Options</h3>
              <p>Tailored rides to fit your budget without compromising quality.</p>
            </div>
            <div className="feature">
              <h3>Carpooling</h3>
              <p>Share rides, save money, and reduce your carbon footprint.</p>
            </div>
            <div className="feature">
              <h3>Transparent Pricing</h3>
              <p>No hidden charges—just honest fares for every ride.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="affordable-footer">
        <p>&copy; 2025 EasyGo. Your trusted travel partner.</p>
      </footer>
    </div>
  );
};

export default Affordable;
