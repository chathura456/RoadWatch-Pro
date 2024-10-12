import Card from "../ui/dashobard/card/card";
import Chart from "../ui/dashobard/chart/chart";
import styles from "../ui/dashobard/dashboard.module.css";
import Income from "../ui/dashobard/income/income";
import Rightbar from "../ui/dashobard/rightbar/rightbar";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Income/>
        <Chart/>
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
