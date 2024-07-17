import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSemestresNbEtudiants } from '../../services/filiereServices';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from "@nextui-org/react";
import { FaSchool } from 'react-icons/fa';

function SemestresPage() {
    const { id_filiere } = useParams();
    const navigate = useNavigate();

    const handleSemestreClick = (semestre) => {
        navigate(`/etudiants/list/${id_filiere}/${semestre}`);
    };

    const { data: semestres = [], isLoading } = useQuery({
        queryKey: ["semestres",],
        queryFn: () => getSemestresNbEtudiants(id_filiere)
    });


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
                Choose Semestre
            </h2>            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {semestres?.map((semestre) => (
                    <div
                        key={semestre.semestre}
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        onClick={() => handleSemestreClick(semestre.semestre)}
                    >
                        <h2 className="text-2xl font-bold mb-4">Semestre {semestre.semestre}</h2>
                        <p className="text-white mb-2">
                            Nombre d'étudiants: <span className="font-medium">{semestre.nb_etudiants}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SemestresPage;
