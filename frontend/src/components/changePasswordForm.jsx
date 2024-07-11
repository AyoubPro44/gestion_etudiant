import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaKey } from "react-icons/fa";
import { updateUserPassword } from '../services/userServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ChangePasswordForm() {
    const navigate = useNavigate();

    const passwordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required').min(8, 'New password must be at least 8 characters long'),
        confirmPassword: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });

    const { register: passwordRegister, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm({
        resolver: yupResolver(passwordSchema),
    });

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
    );
}

export default ChangePasswordForm;
