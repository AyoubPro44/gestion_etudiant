import * as Yup from 'yup';
import { checkEmail, checkNumEtudiant } from '../services/authentification';

const etudiantSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
    lastName: Yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
    dateNaissance: Yup.date('Invalid Date').required('Date de Naissance is required').max(new Date(), 'Date de Naissance cannot be in the future'),
    filiere: Yup.string().required('Filière is required'),
    email: Yup.string().email('Invalid email format').required('Email is required').test('email-exists', 'Email already exists', async function (email) {
        return !(await checkEmail(email)); 
    }),
    numEtudiant: Yup.string().required('N° d\'Etudiant is required').test('N° Etudiant exist', 'N° Etudiant already exists', async function (numEtudiant) {
        return !(await checkNumEtudiant(numEtudiant)); 
    }),
    adresse: Yup.string().required('Adresse is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

export default etudiantSchema;