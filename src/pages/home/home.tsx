import { Link } from 'react-router-dom';
import styles from './home.module.css';

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/uncontrolled-components-approach" className={styles.form}>
        Uncontrolled components approach
      </Link>
      <Link to="/react-hook-form" className={styles.form}>
        React Hook Form
      </Link>
    </div>
  );
};
