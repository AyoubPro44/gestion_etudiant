import React, { useEffect } from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaChalkboard } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getProfCourses } from '../services/profServices'
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authentification';

function ProfClasses() {
  const navigate = useNavigate()

  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => {
      return getProfCourses(localStorage.getItem("id_prof"))
    }
  })

  useEffect(() => {
    if(!localStorage.getItem('auth') || localStorage.getItem('role') != "professeur") {
      logout();
      navigate('/');
    }
  },[])

  return (
      <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <FaChalkboard className="mr-4 text-indigo-500" />
          Classes
        </h2>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes?.map((classItem, index) => (
            <div key={index} onClick={() => navigate('/professeur/classes/' + classItem.id_filiere + '/' + classItem.semestre)} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-indigo-500 text-3xl mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{classItem.nom_sous_module}</h2>
                  <p className="text-gray-600">{classItem.nom_filiere}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-600"><span className="font-semibold">Semester:</span> S{classItem.semestre}</p>
                  <p className="text-gray-600"><span className="font-semibold">Total Students:</span> {classItem.nb_etudiant}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default ProfClasses;
