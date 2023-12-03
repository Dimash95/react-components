import { useState, ChangeEvent } from 'react';
import { setFormData, useAppDispatch } from '../../store';
import { Form } from '../../types/form';
import { FormFields } from '../../types/form-fields';
import styles from './uncontrolled-components-approach.module.css';
import { useAppSelector } from '../../store';

export const UncontrolledComponentsApproach = () => {
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState('Medium');
  const [checkedOne, setCheckedOne] = useState(false);
  const [file, setFile] = useState('');
  const formData = useAppSelector((state) => state.formData);
  console.log(formData);
  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFile(fileUrl);
    }
  }

  function onSubmit(formFields: Form) {
    // console.log(formFields);
    dispatch(setFormData(formFields));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement & FormFields>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, email, password, repeat, gender, accept, picture, country } =
      form;

    onSubmit({
      name: name.value,
      age: name.value,
      email: email.value,
      password: password.value,
      repeat: repeat.value,
      gender: gender.value,
      accept: accept.checked,
      picture: picture.value,
      country: country.value,
    } as Form);
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Uncontrolled components approach</h1>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.labelInput}>
            <label htmlFor="name">Name</label>
            <input name="name" type="text" placeholder="Dimash" id="name" />
          </div>
          <div className={styles.labelInput}>
            <label htmlFor="age">Age</label>
            <input name="age" type="text" placeholder="28" id="age" />
          </div>
        </div>
        <div className={styles.labelInput}>
          <label htmlFor="email">Email</label>
          <input
            className={styles.email}
            name="email"
            type="text"
            placeholder="user@mail.com"
            id="email"
          />
        </div>
        <div className={styles.row}>
          <div className={styles.labelInput}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="text"
              placeholder="1Aa!"
              id="password"
            />
          </div>
          <div className={styles.labelInput}>
            <label htmlFor="repeat">Repeat password</label>
            <input name="repeat" type="text" placeholder="1Aa!" id="repeat" />
          </div>
        </div>

        <div className={styles.checkboxWrapper}>
          <div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                checked={gender === 'Male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                checked={gender === 'Female'}
                onChange={(e) => setGender(e.target.value)}
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
              name="picture"
              type="file"
              onChange={handleChange}
              placeholder="Picture"
              id="picture"
            />
            <img style={{ width: '100px' }} src={file} />
          </div>
          <div className={styles.labelInput}>
            <label htmlFor="country">Select country</label>
            <select name="country" className={styles.select} id="country">
              <option defaultValue="coconut">Kazakhstan</option>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="mango">Mango</option>
            </select>
          </div>
        </div>
        <button>Submit</button>
      </form>

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
              <td>{data.repeat}</td>
              <td>{data.gender}</td>
              <td>{data.accept}</td>
              <td>{data.picture}</td>
              <td>{data.country}</td>
            </tr>
          </tbody>
        ))}
      </table>
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
      <input
        name="accept"
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
