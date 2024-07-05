import * as Yup from 'yup';
import { checkEmail, checkNumEtudiant, hasParent } from '../services/authentification';

const parentSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
    email: Yup.string().email('Invalid email format').required('Email is required').test('email-exists', 'Email already exists', async function (email) {
        return !(await checkEmail(email)); 
    }),
    numEtudiant: Yup.string().required('N° d\'Etudiant is required').test('N° Etudiant not exist', 'N° Etudiant not exists', async function (numEtudiant) {
        return (await checkNumEtudiant(numEtudiant)); 
    }).test('etudiant has parent', 'this etudiant has a tuteur', async function (numEtudiant) {
        return !(await hasParent(numEtudiant)); 
    }),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

export default parentSchema;