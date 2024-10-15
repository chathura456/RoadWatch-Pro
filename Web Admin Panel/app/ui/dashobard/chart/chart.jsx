"use client"
import { useEffect, useState } from 'react';
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './chart.module.css';

const Chart = () => {
  const [data, setData] = useState([]);

  // Function to generate the last 7 days' names
  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      const dayName = day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
      days.push(dayName);
    }
    return days;
  };

  useEffect(() => {
    const days = getLast7Days();
    const violationData = days.map((day, index) => ({
      name: day,
      withoutHelmet: Math.floor(Math.random() * 350),
      whiteLineCross: Math.floor(Math.random() * 350),
    }));

    setData(violationData);
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vehicle Violation Records (Past 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[0, 360]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="withoutHelmet" stroke="#8884d8" name="Without Helmet" />
          <Line type="monotone" dataKey="whiteLineCross" stroke="#82ca9d" name="White Line Cross" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
