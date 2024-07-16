import React, { useEffect, useState } from 'react';
import { getFiliereSemestres } from '../../services/filiereServices';
import PlanningModal from './planningModal';
import EditPlanningModal from './editPlanningModal';
import { FaCalendarAlt } from 'react-icons/fa';

function SemestreTable({ id_filiere }) {
    const [semestres, setSemestres] = useState()

    const fetchSemestres = async () => {
        try {
            const semestresResponse = await getFiliereSemestres(id_filiere);
            setSemestres(semestresResponse);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSemestres()
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center flex-1 mt-10">
                <FaCalendarAlt className="mr-4 text-indigo-500" />
                Schedules
            </h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <tr>
                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Semestre</th>
                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">NB Modules</th>
                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">NB Sous-Modules</th>
                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">NB Étudiants</th>
                        <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">PLANNING</th>
                    </tr>
                </thead>
                <tbody>
                    {semestres?.map((semestre, index) => (
                        <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-100 transition duration-200 ease-in-out`}>
                            <td className="py-3 px-6 text-sm text-gray-900 font-medium">Semestre {semestre.semestre}</td>
                            <td className="py-3 px-6 text-sm text-gray-900 font-medium">{semestre.nb_modules}</td>
                            <td className="py-3 px-6 text-sm text-gray-900 font-medium">{semestre.nb_sous_modules}</td>
                            <td className="py-3 px-6 text-sm text-gray-900 font-medium">{semestre.nb_etudiants}</td>
                            <td className="py-3 px-6 text-sm text-gray-900 font-medium flex flex-row">
                                <PlanningModal planning={semestre.planning} />
                                <EditPlanningModal id_filiere={id_filiere} planning={semestre.planning} semestre={semestre.semestre} fetchSemestres={fetchSemestres} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SemestreTable;
