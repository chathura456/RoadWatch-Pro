import styles from './card.module.css';

const Card = ({ icon, title, number, details, isPositive }) => {
  return (
    <div className={styles.container}>
      {icon}
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{number}</span>
        <span className={styles.details}>
          <span className={isPositive ? styles.positive : styles.negative}>
            {isPositive ? `${details}% more` : `${details}% less`}
          </span>{' '}
          than previous week
        </span>
      </div>
    </div>
  );
};

export default Card;
