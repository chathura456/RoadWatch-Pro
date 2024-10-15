"use client"
import { useState } from 'react';
import styles from './cameras.module.css';

const CameraCards = () => {
  const dummyCameras = [
    { id: 1, location: 'Colombo 01', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/17763010/preview/stock-footage-samara-samara-region-russia-june-the-car-driver-violates-traffic-rules-he-crosses-the.webm', active: true },
    { id: 2, location: 'Colombo 02', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103169111/preview/stock-footage-india-goa-local-indian-people-ride-motor-bike-native-hindu-drive-motorcycle-india-road.webm', active: true },
    { id: 3, location: 'Colombo 03', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103169103/preview/stock-footage-india-goa-local-indian-people-ride-motor-bike-native-hindu-drive-motorcycle-india-road.webm', active: false },
    { id: 4, location: 'Colombo 04', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103169095/preview/stock-footage-india-goa-local-indian-people-ride-motor-bike-lot-native-hindu-drive-motorcycle-india.webm', active: true },
    { id: 5, location: 'Colombo 05', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/6660776/preview/stock-footage-los-angeles-ca-march-wide-angle-vehicle-shot-of-traffic-merging-on-the-freeway-circa.webm', active: false },
    { id: 6, location: 'Colombo 06', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103169083/preview/stock-footage-india-goa-local-indian-people-ride-motor-bike-native-hindu-drive-motorcycle-india-road.webm', active: true },
    { id: 7, location: 'Colombo 07', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103169085/preview/stock-footage-india-goa-brutal-motorcyclist-ride-motorbike-male-moto-biker-drive-motorcycle-two-wheel.webm', active: true },
    { id: 8, location: 'Colombo 08', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103978445/preview/stock-footage-goa-brutal-motorcyclist-ride-retro-motorbike-male-moto-biker-drive-motorcycle-close-up.webm', active: false },
    { id: 9, location: 'Colombo 09', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/6660776/preview/stock-footage-los-angeles-ca-march-wide-angle-vehicle-shot-of-traffic-merging-on-the-freeway-circa.webm', active: true },
    { id: 10, location: 'Colombo 10', videoSrc: 'https://www.shutterstock.com/shutterstock/videos/1103169111/preview/stock-footage-india-goa-local-indian-people-ride-motor-bike-native-hindu-drive-motorcycle-india-road.webm', active: true },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(dummyCameras.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleExpand = (id) => {
    setExpandedCardId(id === expandedCardId ? null : id);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCameras = dummyCameras.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className={styles.container}>
      {currentCameras.map((camera) => (
        <div
          key={camera.id}
          className={`${styles.card} ${expandedCardId === camera.id ? styles.expanded : ''}`}
        >
          <video src={camera.videoSrc} muted autoPlay loop></video>
          <div className={styles.content}>
            <h3>Camera ID: {camera.id}</h3>
            <p>Location: {camera.location}</p>
            <p className={styles.status}>{camera.active ? 'Active' : 'Inactive'}</p>
            <button
              className={styles.watchbtn}
              onClick={() => handleExpand(camera.id)}
            >
              {expandedCardId === camera.id ? 'Close' : 'Watch'}
            </button>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CameraCards;
