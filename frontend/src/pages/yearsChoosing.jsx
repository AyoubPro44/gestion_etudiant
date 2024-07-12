import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { getFiliereYears } from '../services/filiereServices';
import { useQuery } from '@tanstack/react-query';
import { logout } from '../services/authentification';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from "@nextui-org/react";

const YearsChoosing = () => {
    const navigate = useNavigate()
    const [idFiliere, setIdFiliere] = useState(0);

    const { data: years, isLoading } = useQuery({
        queryKey: ["years"],
        queryFn: () => {
            return getFiliereYears(idFiliere)
        }
    })

    useEffect(() => {
        let role = localStorage.getItem('role');
        if (!localStorage.getItem('auth') || (role != "etudiant" && role != 'parent')) {
            logout();
            navigate('/');
        }
        if (role == 'parent') {
            setIdFiliere(JSON.parse(localStorage.getItem('choosingEtudiant'))?.id_filiere)
        }
        else if (role == 'etudiant')
            setIdFiliere(localStorage.getItem('id_filiere'))
    }, [])

    if (isLoading)
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <CircularProgress color="secondary" size='lg' aria-label="Loading..." className='w-80' />
            </div>
        )

    return (
        <div className="flex xl:justify-center items-center p-6 bg-gray-100">
            <div className="grid grid-cols-2 w-full lg:grid-cols-4 gap-4 px-4">
                {years?.map((year) => (
                    <div key={year.year} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <FaBook className="text-2xl text-blue-500 mr-2" />
                                <h2 className="text-2xl font-bold text-gray-800">{year.year} {year.year == 1 ? 'er année' : 'ème année'}</h2>
                            </div>
                            <p className="text-gray-600 mb-2">{year.nb_modules} Modules</p>
                            <p className="text-gray-600 mb-4">{year.nb_sous_modules} Sous-Modules</p>
                            <button onClick={() => navigate((localStorage.getItem('role') == 'etudiant' ? '/etudiant/grades/' : '/parent/etudiantGrades/') + year.year)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Select {year.year}{year.year == 1 ? 'er année' : 'ème année'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YearsChoosing;
