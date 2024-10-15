import { MdEditLocation, MdTrendingUp, MdVideoCameraBack } from "react-icons/md";
import Card from "../ui/dashobard/card/card";
import Chart from "../ui/dashobard/chart/chart";
import styles from "../ui/dashobard/dashboard.module.css";
import Latest from "../ui/dashobard/latest/latest";
import Rightbar from "../ui/dashobard/rightbar/rightbar";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
      <div className={styles.cards}>
      <Card
        icon={<MdTrendingUp size={24} />}
        title="Identified Vioalations"
        number="14,258"
        details="12"
        isPositive={true}
      />
      <Card
        icon={<MdVideoCameraBack size={24} />}
        title="Active Cameras"
        number="1,258"
        details="8"
        isPositive={true}
      />
      <Card
        icon={<MdEditLocation size={24} />}
        title="Areas Covered"
        number="245"
        details="5"
        isPositive={false}
      />
    </div>
        <Latest/>
        <Chart/>
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
