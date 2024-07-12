import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SERVERPOINT } from '../const';
import { FaCalendarAlt } from 'react-icons/fa';
import { logout } from '../services/authentification';

function EtudiantPlanning() {
    const navigate = useNavigate()
    const [planning, setPlanning] = useState('');
    const [choosingEtudiant, setChoosingEtudiant] = useState({})

    useEffect(() => {
        let role = localStorage.getItem('role');
        if (!localStorage.getItem('auth') || (role != "etudiant" && role != 'parent')) {
            logout();
            navigate('/');
        }
        if(role == 'parent'){
            setChoosingEtudiant(JSON.parse(localStorage.getItem('choosingEtudiant')));
            setPlanning(JSON.parse(localStorage.getItem('choosingEtudiant')).planning);
        }
        else if(role == 'etudiant')
            setPlanning(localStorage.getItem('planning'))
    }, [])

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <FaCalendarAlt className="mr-4 text-indigo-500" />
                {localStorage.getItem('role') == 'etudiant' ? "My Schedule" : choosingEtudiant.firstname + ' ' + choosingEtudiant.lastname + " Schedule"}
            </h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
                <img className="w-full h-auto" src={`${SERVERPOINT}/secure-uploads/plannings/${planning}`} alt="Schedule" />
            </div>
        </div>
    )
}

export default EtudiantPlanning