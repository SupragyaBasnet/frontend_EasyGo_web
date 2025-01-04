import React from 'react';
import trackingImage1 from '../../assets/tracking.jpg';
import trackingImage2 from '../../assets/tracking1.jpg';
import trackingImage3 from '../../assets/tracking2.jpg';
import styles from './Tracking.module.css';

const Tracking = () => {
  const trackingFeatures = [
    {
      image: trackingImage1,
      title: 'Real-Time Updates',
      description: 'Stay informed with live tracking of your rides in real-time.',
    },
    {
      image: trackingImage2,
      title: 'Route Optimization',
      description: 'Optimized routes to save time and ensure a smooth journey.',
    },
    {
      image: trackingImage3,
      title: 'Destination Sharing',
      description: 'Share your trip progress with family and friends securely.',
    },
  ];

  return (
    <div className={styles.trackingContainer}>
      <header className={styles.trackingHeader}>
        <div className={styles.headerContent}>
          <h1>Track Your Ride</h1>
          <p>Stay connected and updated with EasyGo tracking features.</p>
        </div>
      </header>

      <main className={styles.trackingMain}>
        <section className={styles.trackingFeatures}>
          <h2>Our Tracking Features</h2>
          <div className={styles.featuresList}>
            {trackingFeatures.map((feature, index) => (
              <div className={styles.featureItem} key={index}>
                <img src={feature.image} alt={feature.title} className={styles.featureImage} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.trackingFooter}>
        <p>&copy; 2025 EasyGo. Your trusted travel partner.</p>
      </footer>
    </div>
  );
};

export default Tracking;
