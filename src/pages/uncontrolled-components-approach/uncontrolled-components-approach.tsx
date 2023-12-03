import { useState, ChangeEvent } from 'react';
import { setFormData, useAppDispatch } from '../../store';
import { Form } from '../../types/form';
import { FormFields } from '../../types/form-fields';
import styles from './uncontrolled-components-approach.module.css';
import { useNavigate } from 'react-router-dom';

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
    // console.log(formFields);
    dispatch(setFormData(formFields));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement & FormFields>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { name, email, password, repeat, gender, picture, country } = form;

    onSubmit({
      name: name.value,
      age: name.value,
      email: email.value,
      password: password.value,
      repeat: repeat.value,
      gender: gender.value,
      accept: checked ? 'Yes' : 'No',
      picture: picture.value,
      country: country.value,
    } as Form);

    navigate('/');
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
