import { Link } from 'react-router-dom';
import styles from './home.module.css';
import { useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';

export const Home = () => {
  const formData = useAppSelector((state) => state.formData);
  console.log(formData);

  useEffect(() => {}, [formData]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.formLinks}>
        <Link to="/uncontrolled-components-approach" className={styles.form}>
          Uncontrolled components approach
        </Link>
        <Link to="/react-hook-form" className={styles.form}>
          React Hook Form
        </Link>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>Password repeat</th>
            <th>Gender</th>
            <th>Accept</th>
            <th>Picture</th>
            <th>Country</th>
          </tr>
        </thead>
        {formData.map((data, index) => (
          <tbody key={index}>
            <tr className={styles.tr}>
              <td>{data.name}</td>
              <td>{data.age}</td>
              <td>{data.email}</td>
              <td>{data.password}</td>
              <td>{data.confirmPassword}</td>
              <td>{data.gender}</td>
              <td>{data.accept}</td>
              <td>
                {data.picture ? (
                  <img
                    src={data.picture}
                    alt="img"
                    style={{ width: '100px' }}
                  />
                ) : (
                  'No'
                )}
              </td>
              <td>{data.country}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
