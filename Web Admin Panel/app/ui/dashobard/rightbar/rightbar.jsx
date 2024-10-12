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
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s.</p>
          <button className={styles.button}>
            <MdPlayCircle/>Watch
          </button>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notifications}></span>
          <h3 className={styles.title}>How to use new version of the admin dashboard</h3>
          <span className={styles.subtitle}>Takes 4 minutes to learn</span>
          <p className={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry standard dummy text ever since the 1500s.</p>
          <button className={styles.button}>
            <MdPlayCircle/>Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
