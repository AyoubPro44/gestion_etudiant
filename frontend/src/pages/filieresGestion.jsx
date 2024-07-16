import React, { useEffect } from 'react';
import { FaGraduationCap, FaUsers, FaThList, FaTasks } from 'react-icons/fa';
import { getFilieresDetails } from '../services/filiereServices';
import { logout } from '../services/authentification';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

function FilieresGestion() {
    const navigate = useNavigate()

    const { data: filieres, isLoading } = useQuery({
        queryKey: ["filieres"],
        queryFn: () => {
            return getFilieresDetails()
        }
    })

    useEffect(() => {
        let role = localStorage.getItem('role');
        if (!localStorage.getItem('auth') || role != 'admin') {
            logout();
            navigate('/');
        }
    }, [])

    if (isLoading)
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <CircularProgress color="secondary" size='lg' aria-label="Loading..." className='w-80' />
            </div>
        )


    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filieres?.map((filiere, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaGraduationCap className="mr-2" />
                            {filiere.nom_filiere}
                        </h2>
                        <p className="text-white mb-2 flex items-center">
                            <FaUsers className="mr-2" />
                            Nombre d'étudiants: <span className="font-medium ml-1">{filiere.nb_etudiants}</span>
                        </p>
                        <p className="text-white mb-2 flex items-center">
                            <FaThList className="mr-2" />
                            Nombre de modules: <span className="font-medium ml-1">{filiere.nb_modules}</span>
                        </p>
                        <p className="text-white mb-4 flex items-center">
                            <FaTasks className="mr-2" />
                            Nombre de sous-modules: <span className="font-medium ml-1">{filiere.nb_sous_modules}</span>
                        </p>
                        <button onClick={() => navigate('/admin/filieres/' + filiere.id_filiere)} className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300">
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilieresGestion;
