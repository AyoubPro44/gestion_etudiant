import React, { useEffect, useState } from 'react';
import { logout } from '../services/authentification';
import { useNavigate } from 'react-router-dom';
import { getFiliereProgram } from '../services/filiereServices'
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from "@nextui-org/react";

function EtudiantProgram() {
  const navigate = useNavigate()
  const [idFiliere, setIdFiliere] = useState(0);

  const { data: filiereProgram, isLoading, refetch } = useQuery({
    queryKey: ["filiereProgram", idFiliere],
    queryFn: () => {
      return getFiliereProgram(idFiliere)
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto border bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Program of {filiereProgram?.filiere}
        </h1>
        {filiereProgram?.semestres.map((semester, index) => (
          <div key={index} className="bg-gray-100 border p-4 mb-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
              {semester.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {semester?.modules.map((module, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <h3 className="text-md font-semibold mb-1 text-gray-700">
                    {module.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {module?.sousModules.map((sousModule, id) => (
                      <div
                        key={id}
                        className="p-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                      >
                        <h4 className="text-sm font-medium text-gray-800">{sousModule.name}</h4>
                        <p className="text-xs text-gray-600">Coefficient: {sousModule.coeff}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EtudiantProgram;