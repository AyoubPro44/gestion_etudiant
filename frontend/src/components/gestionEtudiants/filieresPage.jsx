import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaSchool, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from "@nextui-org/react";
import { getFilieresDetails } from '../../services/filiereServices';

function FilieresPage() {
    const navigate = useNavigate();

    const { data: filieres = [], isLoading } = useQuery({
        queryKey: ["filieres",],
        queryFn: () => getFilieresDetails()
    });

    const handleFiliereClick = (id_filiere) => {
        navigate(`/admin/etudiants/semestres/${id_filiere}`);
    };

    if (isLoading)
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <CircularProgress color="secondary" size='lg' aria-label="Loading..." className='w-80' />
            </div>
        )

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
                <FaSchool className="mr-4 text-indigo-500" />
                Choose Filiere
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filieres?.map((filiere) => (
                    <div
                        key={filiere.id_filiere}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        onClick={() => handleFiliereClick(filiere.id_filiere)}
                    >
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaGraduationCap className="mr-2" />
                            {filiere.nom_filiere}
                        </h2>
                        <p className="text-white mb-2 flex items-center">
                            <FaUsers className="mr-2" />
                            Nombre d'étudiants: <span className="font-medium ml-1">{filiere.nb_etudiants}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilieresPage;
