import Image from "next/image";
import styles from "./latest.module.css";
import wheel from "/public/vehicles/3wheel.jpg";
import bike from "/public/vehicles/bike.jpg";
import car from "/public/vehicles/car.jpg";
import van from "/public/vehicles/van.jpg";

const Latest = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Identified Violations</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Vehicle No</td>
            <td>Vehicle Type</td>
            <td>Violation</td>
            <td>Area</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
              <Image
                src={bike}
                alt=""
                width={40}
                height={40}
                className={styles.userImage}
              />
              KD-4785
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Motorcycle
              </span>
            </td>
            <td>No Helmet</td>
            <td>Battaramulla</td>
          </tr>
          <tr>
            <td>
            <div className={styles.user}>
              <Image
                src={wheel}
                alt=""
                width={40}
                height={40}
                className={styles.userImage}
              />
              VH-7859
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Three Wheeler
              </span>
            </td>
            <td>White Line Cross</td>
            <td>Colombo 07</td>
          </tr>
          <tr>
            <td>
            <div className={styles.user}>
              <Image
                src={van}
                alt=""
                width={40}
                height={40}
                className={styles.userImage}
              />
              MN-1426
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Van
              </span>
            </td>
            <td>High Speed</td>
            <td>Highway E-01</td>
          </tr>
          <tr>
            <td>
            <div className={styles.user}>
              <Image
                src={car}
                alt=""
                width={40}
                height={40}
              
                className={styles.userImage}
              />
              QV-6532
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Motorcycle
              </span>
            </td>
            <td>No Helmet</td>
            <td>Nugegoda</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Latest;
