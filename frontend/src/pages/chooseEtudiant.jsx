import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParentEtudiants } from '../services/parentServices';
import { logout } from '../services/authentification';

function ChooseEtudiant() {

  const navigate = useNavigate()

  const { data: etudiants, isLoading } = useQuery({
    queryKey: ["etudiants"],
    queryFn: () => {
      return getParentEtudiants(localStorage.getItem('id_parent'))
    }
  })

  useEffect(() => {
    if (!localStorage.getItem('auth') || localStorage.getItem('role') != "parent") {
      logout();
      navigate('/');
    }
  }, [])

  const chooseStudent = (etudiant) => {
    localStorage.setItem('choosingEtudiant', JSON.stringify(etudiant));
    navigate('/acceuil');
  }


  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose a Student</h1>
        <p className="text-gray-600">Please select a student from the list below to view their details and progress.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {etudiants?.map((etudiant) => (
          <div
            key={etudiant.id_etudiant}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transform transition duration-500 hover:scale-105 cursor-pointer w-80 p-4"
            onClick={() => chooseStudent(etudiant)}
          >
            <div className="flex items-center mb-4">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-sm"
                src={`https://ui-avatars.com/api/?name=${etudiant.firstname}+${etudiant.lastname}&font-size=0.36&color=233467&background=DBE1FF`}
                alt={`${etudiant.firstname}_${etudiant.lastname}`}
              />
              <div className="ml-4">
                <h2 className="font-bold text-xl text-gray-800">{etudiant.firstname} {etudiant.lastname}</h2>
                <p className="text-gray-500 text-sm">N°: {etudiant.num_etudiant}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2"><strong>Filiere:</strong> {etudiant.nom_filiere}</p>
              <p className="text-gray-600 text-sm"><strong>Semester:</strong> {etudiant.semestre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseEtudiant;
