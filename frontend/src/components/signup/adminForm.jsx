import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createUser, getTokenSignUp, userLogin } from '../../services/authentification';
import { SERVERPOINT } from '../../const';
import { Select, SelectItem } from "@nextui-org/react";
import adminSchema from '../../schema/adminSchema';
import { useNavigate } from 'react-router-dom';

function AdminForm() {    
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(adminSchema)
    });

    const signUp = async (data) => {
        const admin = {
            ...data,
            role: "admin"
        }
        await createUser(admin);
        await userLogin(admin.email, admin.password);
        navigate('/acceuil');
    }


    return (
        <div>
            <form className="space-y-4" onSubmit={handleSubmit(signUp)}>
                <div className="flex flex-row gap-6">
                    <div className="w-full">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <div className="mt-1">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                {...register('firstName')}
                                className={`block w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                            />
                            {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <div className="mt-1">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                {...register('lastName')}
                                className={`block w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                            />
                            {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            {...register('email')}
                            className={`block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="mt-1">
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            className={`block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                        />
                        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminForm;
