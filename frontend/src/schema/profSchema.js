import * as Yup from 'yup';
import { checkEmail } from '../services/authentification';

const profSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
    email: Yup.string().email('Invalid email format').required('Email is required').test('email-exists', 'Email already exists', async function (email) {
        return !(await checkEmail(email)); 
    }),
    numBureau: Yup.number().typeError('The number of office must be a valid number').required('The number of office is required').min(1, 'The number of office must be at least 1'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

export default profSchema;