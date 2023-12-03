import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setFormData, useAppDispatch } from '../../store';
import { Form } from '../../types/form';
import { FormFields } from '../../types/form-fields';
import * as yup from 'yup';
import { formSchema } from '../../validations/form-validation';
import { countries } from '../../constants/countries';
import styles from './uncontrolled-components-approach.module.css';

export const UncontrolledComponentsApproach = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [gender, setGender] = useState('Male');
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setFile(fileUrl);
    }
  }

  function onSubmit(formFields: Form) {
    dispatch(setFormData(formFields));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement & FormFields>
  ) {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, age, email, password, confirmPassword, gender, country } =
      form;

    const formData = {
      name: name.value,
      age: +age.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      gender: gender.value,
      accept: checked ? 'Yes' : 'No',
      picture: file,
      country: country.value,
    } as Form;

    try {
      await formSchema.validate(formData, { abortEarly: false });
      onSubmit(formData);
      navigate('/');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        console.error('Validation failed:', err.errors);
        alert(err.errors);
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Uncontrolled components approach</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              type="text"
              placeholder="1Aa!"
              id="confirmPassword"
            />
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
          <div>
            <label htmlFor="accept"> Accept T&C</label>
            <input
              name="accept"
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              id="accept"
            />
          </div>
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
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
