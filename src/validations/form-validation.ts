import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter')
    .required('Name is required')
    .trim(),

  age: yup
    .number()
    .positive('Age should be a positive number')
    .integer('Age should be an integer')
    .required('Age is required'),

  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .trim(),

  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{4,})/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required')
    .trim(),

  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
    .trim(),
});
