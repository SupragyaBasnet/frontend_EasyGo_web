import React from 'react';
import safetyImage1 from '../../assets/safety.jpg';
import safetyImage2 from '../../assets/safety1.jpg';
import safetyImage3 from '../../assets/safety2.jpg';
import styles from './Safety.module.css'; // Importing CSS module

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
    <div className={styles.safetyContainer}>
      <header className={styles.safetyHeader}>
        <div className={styles.headerContent}>
          <h1>Safety First</h1>
          <p>Your safety is our priority at EasyGo.</p>
        </div>
      </header>

      <main className={styles.safetyMain}>
        <section className={styles.safetyFeatures}>
          <h2>Our Safety Features</h2>
          <div className={styles.featuresList}>
            {safetyFeatures.map((feature, index) => (
              <div className={styles.featureItem} key={index}>
                <img src={feature.image} alt={feature.title} className={styles.featureImage} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className={styles.safetyFooter}>
        <p>&copy; 2025 EasyGo. Your trusted travel partner.</p>
      </footer>
    </div>
  );
};

export default Safety;
