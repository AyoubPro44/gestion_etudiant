import React, { useEffect } from 'react';
import { logout } from '../services/authentification';
import { useNavigate } from 'react-router-dom';
import { getFiliereProgram } from '../services/filiereServices'
import { useQuery } from '@tanstack/react-query';

const filiereProgram = {
    filiere: 'Computer Science',
    semesters: [
        {
            name: 'Semester 1',
            modules: [
                {
                    name: 'Module 1',
                    sousModules: [
                        { name: 'Sous-module 1.1', coeff: 1.5 },
                        { name: 'Sous-module 1.2', coeff: 2.0 },
                    ],
                },
                {
                    name: 'Module 2',
                    sousModules: [
                        { name: 'Sous-module 2.1', coeff: 1.0 },
                        { name: 'Sous-module 2.2', coeff: 1.8 },
                    ],
                },
                {
                    name: 'Module 1',
                    sousModules: [
                        { name: 'Sous-module 1.1', coeff: 1.5 },
                        { name: 'Sous-module 1.2', coeff: 2.0 },
                    ],
                },
                {
                    name: 'Module 2',
                    sousModules: [
                        { name: 'Sous-module 2.1', coeff: 1.0 },
                        { name: 'Sous-module 2.2', coeff: 1.8 },
                    ],
                },
            ],
        },
        {
            name: 'Semester 2',
            modules: [
                {
                    name: 'Module 1',
                    sousModules: [
                        { name: 'Sous-module 1.1', coeff: 1.5 },
                        { name: 'Sous-module 1.2', coeff: 2.0 },
                    ],
                },
                {
                    name: 'Module 2',
                    sousModules: [
                        { name: 'Sous-module 2.1', coeff: 1.0 },
                        { name: 'Sous-module 2.2', coeff: 1.8 },
                    ],
                },
                {
                    name: 'Module 3',
                    sousModules: [
                        { name: 'Sous-module 3.1', coeff: 2.0 },
                        { name: 'Sous-module 3.2', coeff: 1.7 },
                    ],
                },
                {
                    name: 'Module 4',
                    sousModules: [
                        { name: 'Sous-module 4.1', coeff: 1.2 },
                        { name: 'Sous-module 4.2', coeff: 1.5 },
                    ],
                },

            ],
        },
    ],
};

function EtudiantProgram() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') != "etudiant") {
            logout();
            navigate('/');
        }
    }, [])

    const { data: filiereProgram, isLoading } = useQuery({
        queryKey: ["filiereProgram"],
        queryFn: () => {
          return getFiliereProgram(localStorage.getItem('id_filiere'))
        }
      })

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