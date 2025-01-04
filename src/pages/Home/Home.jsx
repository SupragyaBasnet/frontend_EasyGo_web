import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import React Router's useNavigate
import affordableImage from '../../assets/affordable.jpg';
import carImage1 from '../../assets/car1.png';
import carImage2 from '../../assets/car2.jpg';
import carImage3 from '../../assets/car3.jpg';
import carImage4 from '../../assets/car4.jpg';
import carImage5 from '../../assets/car5.jpg';
import EasyGo from '../../assets/EasyGo.png';
import safetyImage from '../../assets/safety.jpg';
import trackingImage from '../../assets/tracking.jpg';
import styles from './Home.module.css';

const Home = () => {
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
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <div className={styles.headerTop}>
          <img src={EasyGo} alt="EasyGo Logo" className={styles.appLogo} />
          <div className={styles.headerButtons}>
  <button className={styles.loginButton} onClick={() => navigate('/login')}>
    Login
  </button>
  <button className={styles.signupButton} onClick={() => navigate('/signup')}>
    Sign Up
  </button>
</div>

        </div>
        <div className={styles.headerImage}>
          <img src={currentCarImage} alt="Car" className={styles.ctaImageFullscreen} />
        </div>
      </header>

      <main className={styles.homeMain}>
        <div className={styles.featuresSection}>
          <h3 className={styles.headline}>Why EasyGo?</h3>
          <ul className={styles.featuresList}>
            <li className={styles.featureItem} onClick={() => navigate('/affordable')}>
              <img src={affordableImage} alt="Affordable rides" className={styles.featureImage} />
              <p>Affordable rides at your convenience</p>
            </li>
            <li className={styles.featureItem} onClick={() => navigate('/safety')}>
              <img src={safetyImage} alt="Safety features" className={styles.featureImage} />
              <p>Safety features for peace of mind</p>
            </li>
            <li className={styles.featureItem} onClick={() => navigate('/tracking')}>
              <img src={trackingImage} alt="Real-time tracking" className={styles.featureImage} />
              <p>Real-time location tracking</p>
            </li>
          </ul>
        </div>
      </main>

      <footer className={styles.homeFooter}>
        <p>&copy; 2025 EasyGo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
