import Image from "next/image";
import { MdPlayCircle } from "react-icons/md";
import styles from "./rightbar.module.css";
import astronut from "/public/anstronut.png";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image src={astronut} alt="" fill className={styles.bg}/>
        </div>
        <div className={styles.text}>
          <span className={styles.notifications}>🔥Available Now</span>
          <h3 className={styles.title}>How to use new version of the admin dashboard</h3>
          <span className={styles.subtitle}>Takes 5 minutes to learn</span>
          <p className={styles.desc}>Version 2.0 of the Vehicle Violation Detection System has been deployed with improved helmet detection accuracy. The UI has been updated for a more user-friendly experience in Version 2.0</p>
          <button className={styles.button}>
            <MdPlayCircle className={styles.icon}/> Learn
          </button>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notifications}></span>
          <h3 className={styles.title}>New Feature: White Line Violation Detection</h3>
          <span className={styles.subtitle}>Takes 2 minutes to learn</span>
          <p className={styles.desc}>Version 2.0 now includes detection for white line crossings at major intersections. This helps improve traffic law enforcement.A new update has improved video processing speed by 25%, reducing analysis time.</p>
          <button className={styles.button}>
            <MdPlayCircle className={styles.icon}/> Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
