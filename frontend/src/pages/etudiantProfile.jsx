import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmail, checkNumEtudiant, logout } from '../services/authentification';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaUser } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import ChangePasswordForm from '../components/changePasswordForm';
import { formatDate } from '../services/functions'
import { updateEtudiantInfos } from '../services/etudiantServices';

function EtudiantProfile() {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
        lastname: Yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
        dateNaissance: Yup.date('Invalid Date').required('Date de Naissance is required').max(new Date(), 'Date de Naissance cannot be in the future'),
        email: Yup.string().email('Invalid email format').required('Email is required').test('email-exists', 'Email already exists', async function (email) {
            return email === localStorage.getItem('email') ? true : !(await checkEmail(email));
        }),
        numEtudiant: Yup.string().required('N° d\'Etudiant is required').test('N° Etudiant exist', 'N° Etudiant already exists', async function (numEtudiant) {
            return numEtudiant === localStorage.getItem('num_etudiant') ? true : !(await checkNumEtudiant(numEtudiant));
        }),
        adresse: Yup.string().required('Adresse is required'),
    });

    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "etudiant") {
            logout();
            navigate('/');
        }
    }, [navigate]);


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });



    const onSubmit = async (data) => {
        const etudiant = { ...data, id_user: localStorage.getItem('id_user'), id_etudiant: localStorage.getItem('id_etudiant') };
        try {
            await updateEtudiantInfos(etudiant);
            toast.success('Your informations updated successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="space-y-10 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 mx-6">
                <h2 className="text-2xl font-bold mb-6 text-left flex items-center gap-4">
                    <FaUser size={22} />
                    <span>My Informations</span>
                </h2>                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row gap-6">
                        <div className='w-full'>
                            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                defaultValue={localStorage.getItem('firstname')}
                                {...register('firstname')}
                                className={`block w-full px-3 py-2 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                            />
                            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>}
                        </div>
                        <div className='w-full'>
                            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                defaultValue={localStorage.getItem('lastname')}
                                {...register('lastname')}
                                className={`block w-full px-3 py-2 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                            />
                            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>}
                        </div>
                        <div className='w-full'>
                            <label htmlFor="numEtudiant" className="block text-sm font-medium text-gray-700">N° Etudiant</label>
                            <div className="mt-1">
                                <input
                                    id="numEtudiant"
                                    name="numEtudiant"
                                    type="text"
                                    defaultValue={localStorage.getItem('num_etudiant')}
                                    {...register('numEtudiant')}
                                    className={`block w-full px-3 py-2 border ${errors.numEtudiant ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                                />
                                {errors.numEtudiant && <p className="mt-2 text-sm text-red-600">{errors.numEtudiant.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-6">
                        <div className='w-full'>
                            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">Adresse</label>
                            <div className="mt-1">
                                <input
                                    id="adresse"
                                    name="adresse"
                                    type="text"
                                    defaultValue={localStorage.getItem('adresse')}
                                    {...register('adresse')}
                                    className={`block w-full px-3 py-2 border ${errors.adresse ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                                />
                                {errors.adresse && <p className="mt-2 text-sm text-red-600">{errors.adresse.message}</p>}
                            </div>
                        </div>
                        <div className='md:w-[50%]'>
                            <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">Date de Naissance</label>
                            <div className="mt-1">
                                <input
                                    id="dateNaissance"
                                    name="dateNaissance"
                                    type="date"
                                    defaultValue={formatDate(localStorage.getItem('date_naissance'))}
                                    {...register('dateNaissance')}
                                    className={`block w-full px-3 py-2 border ${errors.dateNaissance ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                                />
                                {errors.dateNaissance && <p className="mt-2 text-sm text-red-600">Invalid Date</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            defaultValue={localStorage.getItem('email')}
                            {...register('email')}
                            className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>

            <ChangePasswordForm />


            <ToastContainer />
        </div>
    );
}

export default EtudiantProfile;
