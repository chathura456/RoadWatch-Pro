"use client"
import Image from "next/image";
import { useState } from "react";
import styles from './history.module.css';
import wheel from "/public/vehicles/3wheel.jpg";
import bike from "/public/vehicles/bike.jpg";
import car from "/public/vehicles/car.jpg";
import van from "/public/vehicles/van.jpg";

const demoData = [
  { id: 1, vehicleNo: "KD-4785", vehicleType: "Motorcycle", violation: "No Helmet", area: "Battaramulla", date: "15.10.2024 at 14:25", image: bike },
  { id: 2, vehicleNo: "VH-7859", vehicleType: "Three Wheeler", violation: "White Line Cross", area: "Colombo 07", date: "15.10.2024 at 14:30", image: wheel },
  { id: 3, vehicleNo: "MN-1426", vehicleType: "Van", violation: "High Speed", area: "Highway E-01", date: "15.10.2024 at 14:35", image: van },
  { id: 4, vehicleNo: "QV-6532", vehicleType: "Car", violation: "No Helmet", area: "Nugegoda", date: "15.10.2024 at 14:40", image: car },
  { id: 5, vehicleNo: "AB-1234", vehicleType: "Motorcycle", violation: "No Helmet", area: "Colombo 02", date: "15.10.2024 at 14:45", image: bike },
  { id: 6, vehicleNo: "BC-5678", vehicleType: "Three Wheeler", violation: "Red Light Jump", area: "Borella", date: "15.10.2024 at 14:50", image: wheel },
  { id: 7, vehicleNo: "CD-9101", vehicleType: "Car", violation: "High Speed", area: "Dehiwala", date: "15.10.2024 at 14:55", image: car },
  { id: 8, vehicleNo: "EF-1121", vehicleType: "Van", violation: "White Line Cross", area: "Kollupitiya", date: "15.10.2024 at 15:00", image: van },
  { id: 9, vehicleNo: "GH-3141", vehicleType: "Motorcycle", violation: "No Helmet", area: "Malabe", date: "15.10.2024 at 15:05", image: bike },
  { id: 10, vehicleNo: "IJ-5161", vehicleType: "Three Wheeler", violation: "No License", area: "Pelawatte", date: "15.10.2024 at 15:10", image: wheel },
];

const HistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items
  const currentItems = demoData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(demoData.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Identified Violations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Source</td>
            <td>Vehicle No</td>
            <td>Vehicle Type</td>
            <td>Violation</td>
            <td>Area</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={item.image}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                </div>
              </td>
              <td>
                <span className={styles.user}>{item.vehicleNo}</span>
              </td>
              <td>
                <span>{item.vehicleType}</span>
              </td>
              <td>{item.violation}</td>
              <td>{item.area}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default HistoryTable;
