import React, { useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import schedule from '../assets/images/schedule.png';
import { useQuery } from '@tanstack/react-query';
import { getProfCourses } from '../services/profServices'
import { logout } from '../services/authentification';
import { useNavigate } from 'react-router-dom';

const ProfPlanning = () => {

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => {
      return getProfCourses(localStorage.getItem("id_prof"))
    }
  })

  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('auth') || localStorage.getItem('role') != "professeur") {
      logout();
      navigate('/');
    }
  },[])

  return (
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <FaCalendarAlt className="mr-4 text-indigo-500" />
          My Schedule
        </h2>

        <div className="bg-white rounded-lg overflow-hidden shadow-md mb-8">
          <img className="w-full h-auto" src={schedule} alt="Schedule" />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h3>
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <tr>
              <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Sous Module</th>
              <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Module</th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Filiere</th>
                <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wider">Semester</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((course, index) => (
                <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-indigo-100 transition duration-200 ease-in-out`}>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{course.nom_sous_module}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{course.nom_module}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{course.nom_filiere}</td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">{"S" + course.semestre}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
  );
}

export default ProfPlanning;