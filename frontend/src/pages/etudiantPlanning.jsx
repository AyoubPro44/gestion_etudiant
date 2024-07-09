import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SERVERPOINT } from '../const';
import { FaCalendarAlt } from 'react-icons/fa';
import { logout } from '../services/authentification';

function EtudiantPlanning() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') != "etudiant") {
            logout();
            navigate('/');
        }
    }, [])

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <FaCalendarAlt className="mr-4 text-indigo-500" />
                My Schedule
            </h2>
            {console.log(localStorage.getItem('planning'))}
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
                <img className="w-full h-auto" src={`${SERVERPOINT}/secure-uploads/plannings/${localStorage.getItem('planning')}`} alt="Schedule" />
            </div>
        </div>
    )
}

export default EtudiantPlanning