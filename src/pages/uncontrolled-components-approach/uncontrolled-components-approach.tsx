import { useState, ChangeEvent } from 'react';
import styles from './uncontrolled-components-approach.module.css';

export const UncontrolledComponentsApproach = () => {
  const [topping, setTopping] = useState('Medium');
  const [checkedOne, setCheckedOne] = useState(false);
  const [file, setFile] = useState('');

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFile(fileUrl);
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Uncontrolled components approach</h1>
      <form className={styles.form} action="">
        <div className={styles.row}>
          <div className={styles.labelInput}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Dimash" id="name" />
          </div>
          <div className={styles.labelInput}>
            <label htmlFor="age">Age</label>
            <input type="text" placeholder="28" id="age" />
          </div>
        </div>
        <div className={styles.labelInput}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.email}
            type="text"
            placeholder="user@mail.com"
            id="email"
          />
        </div>
        <div className={styles.row}>
          <div className={styles.labelInput}>
            <label htmlFor="password">Password</label>
            <input type="text" placeholder="1Aa!" id="password" />
          </div>
          <div className={styles.labelInput}>
            <label htmlFor="repeat">Repeat password</label>
            <input type="text" placeholder="1Aa!" id="repeat" />
          </div>
        </div>

        <div className={styles.checkboxWrapper}>
          <div>
            <div>
              <input
                type="radio"
                name="topping"
                value="Male"
                id="male"
                checked={topping === 'Male'}
                onChange={(e) => setTopping(e.target.value)}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="topping"
                value="Female"
                id="female"
                checked={topping === 'Female'}
                onChange={(e) => setTopping(e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {/* <p>
          Selected gender: <strong>{topping}</strong>
        </p> */}
          <Checkbox
            label="Accept T&C"
            value={checkedOne}
            onChange={handleChangeOne}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.labelInput}>
            <label htmlFor="picture">Upload picture</label>
            <input
              type="file"
              onChange={handleChange}
              placeholder="Picture"
              id="picture"
            />
            <img style={{ width: '100px' }} src={file} />
          </div>
          <div className={styles.labelInput}>
            <label htmlFor="country">Select country</label>
            <select className={styles.select}>
              <option selected value="coconut">
                Kazakhstan
              </option>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="mango">Mango</option>
            </select>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
