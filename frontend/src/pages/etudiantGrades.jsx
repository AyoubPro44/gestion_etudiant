import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from '../services/authentification';
import { useQuery } from '@tanstack/react-query';
import { getEtudiantYearNotes } from '../services/etudiantServices';
import { CircularProgress } from "@nextui-org/react";

const EtudiantGrades = () => {

    const { year } = useParams();
    const navigate = useNavigate()
    const [idEtudiant, setIdEtudiant] = useState(0)

    useEffect(() => {
        let role = localStorage.getItem('role');
        if (!localStorage.getItem('auth') || (role != "etudiant" && role != 'parent')) {
            logout();
            navigate('/');
        }
        if (role == 'parent') {
            setIdEtudiant(JSON.parse(localStorage.getItem('choosingEtudiant'))?.id_etudiant)
        }
        else if (role == 'etudiant')
            setIdEtudiant(localStorage.getItem('id_etudiant'))
    }, [])

    const { data: grades, isLoading } = useQuery({
        queryKey: ["grades", idEtudiant, year],
        queryFn: () => {
            return getEtudiantYearNotes(idEtudiant, year);
        }
    })

    if (isLoading)
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <CircularProgress color="secondary" size='lg' aria-label="Loading..." className='w-80' />
            </div>
        )

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-semibold text-center text-gray-700 mb-12">Moyenne du {grades?.year}{grades?.year == 1 ? 'er' : 'ème'} Année :   {grades?.total_year ? grades?.total_year : "------"}</h2>
            {grades?.semestres?.map((semestre, index) => (
                <div key={semestre.num} className="mb-16">
                    <div className="bg-white shadow-lg rounded-lg py-4 px-6 border border-gray-200 flex flex-row justify-between md:w-[50%] mx-auto mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Semestre {semestre.num} :
                        </h2>
                        <h2 className="text-2xl font-semibold text-gray-700">
                            {semestre.total_semestre ? semestre.total_semestre : "------"}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {semestre.modules.map((module) => (
                            <div key={module.id_module} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
                                    <div className='flex items-center'>
                                        <FaBook className="mr-2 text-gray-500" /> {module.name_module} :
                                    </div>
                                    <div>
                                        {module.total_module ? module.total_module : "------"}
                                    </div>
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-medium">Sous-Module</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-medium">Exam Note</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-medium">TP Note</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-medium">CC Note</th>
                                                <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600 font-medium">Moyenne</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {module.sous_modules.map((sous_module) => (
                                                <tr key={sous_module.id_sous_module} className="hover:bg-gray-50 transition duration-200">
                                                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{sous_module.nom_sous_module}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{sous_module.note_exam}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{sous_module.note_tp}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{sous_module.note_cc}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200 text-gray-700">
                                                        {sous_module.total_sous_module ? sous_module.total_sous_module : "------"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EtudiantGrades;
