import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { getProfEnseignements, updateProfInfos } from '../services/profServices';
import { useNavigate } from 'react-router-dom';
import { checkEmail, logout } from '../services/authentification';
import axios from 'axios';
import { SERVERPOINT } from '../const';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaKey, FaUser } from "react-icons/fa";
import { updateUserPassword } from '../services/userServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function ProfProfile() {
    const navigate = useNavigate();
    const [values, setValues] = useState(new Set([]));
    const [profEnseignements, setProfEnseignements] = useState([]);
    const [sousModulesError, setSousModulesError] = useState(false);

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
        lastname: Yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required').test('email-exists', 'Email already exists', async function (email) {
            return email === localStorage.getItem('email') ? true : !(await checkEmail(email));
        }),
        num_bureau: Yup.number().typeError('The number of office must be a valid number').required('The number of office is required').min(1, 'The number of office must be at least 1'),
    });

    const passwordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required').min(8, 'New password must be at least 8 characters long'),
        confirmPassword: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    const { data: sousModules, isLoading, error } = useQuery({
        queryKey: ["sousModules"],
        queryFn: async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                };

                const response = await axios.get(SERVERPOINT + '/api/sousModule/getSousModuleFiliere', config);
                return response.data.sousModules;
            } catch (error) {
                console.error('Error fetching sous Modules:', error);
                throw error;
            }
        }
    });

    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "professeur") {
            logout();
            navigate('/');
        }

        const fetchProfEnseignements = async () => {
            try {
                const enseignements = await getProfEnseignements(localStorage.getItem("id_prof"));
                setProfEnseignements(enseignements);
                const initialValues = new Set(enseignements.map(enseignement => String(enseignement.id_sous_module)));
                setValues(initialValues);

            } catch (error) {
                console.error('Error fetching professor enseignements:', error);
            }
        };

        fetchProfEnseignements();
    }, [navigate]);

    const handleSelectionChange = (selectedKeys) => {
        setValues(new Set(selectedKeys));
        setSousModulesError(false);
    };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { register: passwordRegister, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm({
        resolver: yupResolver(passwordSchema),
    });

    const onSubmit = async (data) => {
        values.delete('');
        if ([...values][0] === '' || values.size === 0) {
            setSousModulesError(true);
            return;
        }
        const sousModuleIds = Array.from(values).map(val => parseInt(val, 10));
        const prof = { ...data, sousModules: sousModuleIds, id_user: localStorage.getItem('id_user'), id_prof: localStorage.getItem('id_prof') };
        try {
            await updateProfInfos(prof);
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

    const onSubmitPassword = async (data) => {
        const statusCode = await updateUserPassword(localStorage.getItem('id_user'), data.oldPassword, data.newPassword);
        if (statusCode === 200) {
            toast.success('Password updated successfully', {
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
            navigate('/')
        }
        else if (statusCode === 204) {
            toast.error('Old password incorrect', {
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
        }

    }

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
                        <div className='w-[40%]'>
                            <label htmlFor="num_bureau" className="block text-sm font-medium text-gray-700">N° Bureau</label>
                            <input
                                id="num_bureau"
                                name="num_bureau"
                                type="number"
                                min="1"
                                defaultValue={localStorage.getItem('num_bureau')}
                                {...register('num_bureau')}
                                className={`block w-full px-3 py-2 border ${errors.num_bureau ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                            />
                            {errors.num_bureau && <p className="text-red-500 text-sm mt-1">{errors.num_bureau.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Select
                            label="Select sous module"
                            selectionMode="multiple"
                            selectedKeys={values}
                            onSelectionChange={handleSelectionChange}
                            placeholder="Choose at least one"
                        >
                            {sousModules && sousModules.map(sousModule => (
                                <SelectItem key={sousModule.ID_SOUS_MODULE} value={String(sousModule.ID_SOUS_MODULE)}>
                                    {sousModule.sous_module}
                                </SelectItem>
                            ))}
                        </Select>
                        {sousModulesError && <p className="mt-2 text-sm text-red-600">You must select at least one sous module</p>}
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

            <div className="bg-white shadow-md rounded-lg p-8 mx-6">
                <h2 className="text-2xl font-bold mb-6 text-left flex items-center gap-4">
                    <FaKey size={22} />
                    <span>Change Password</span>
                </h2>
                <form className="space-y-4" onSubmit={handlePasswordSubmit(onSubmitPassword)}>
                    <div>
                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                        <input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            {...passwordRegister('oldPassword')}
                            className={`block w-full px-3 py-2 border ${passwordErrors.oldPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {passwordErrors.oldPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.oldPassword.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            {...passwordRegister('newPassword')}
                            className={`block w-full px-3 py-2 border ${passwordErrors.newPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {passwordErrors.newPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            {...passwordRegister('confirmPassword')}
                            className={`block w-full px-3 py-2 border ${passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {passwordErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProfProfile;
