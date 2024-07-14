import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParentForm from '../components/signup/parentForm';
import AdminForm from '../components/signup/adminForm';
import ProfForm from '../components/signup/profForm';
import EtudiantForm from '../components/signup/etudiantForm';
import { logout } from '../services/authentification';

const SignUp = () => {
    const [userType, setUserType] = useState('etudiant');
    const navigate = useNavigate();

    useEffect(() => {
        logout();
    }, [])

    const renderForm = () => {
        switch (userType) {
            case 'parent':
                return (
                    <ParentForm />
                );
            case 'admin':
                return (
                    <AdminForm />
                );
            case 'professeur':
                return (
                    <ProfForm />
                );
            case 'etudiant':
                return (
                    <EtudiantForm />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
            </div>

            <div className="mt-8 sm:mx-auto max-w-[90%] md:max-w-[50%]">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <nav className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setUserType('etudiant')}
                            className={`px-3 py-2 font-medium text-sm rounded-md ${userType === 'etudiant' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            Etudiant
                        </button>
                        <button
                            onClick={() => setUserType('professeur')}
                            className={`px-3 py-2 font-medium text-sm rounded-md ${userType === 'professeur' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            Professeur
                        </button>
                        <button
                            onClick={() => setUserType('parent')}
                            className={`px-3 py-2 font-medium text-sm rounded-md ${userType === 'parent' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            Parent
                        </button>
                        <button
                            onClick={() => setUserType('admin')}
                            className={`px-3 py-2 font-medium text-sm rounded-md ${userType === 'admin' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            Admininstrateur
                        </button>
                    </nav>

                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
