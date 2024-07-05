import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { FaChalkboard } from 'react-icons/fa';
  
const classesData = [
  { filiere: 'Computer Science', matiere: 'Programming', semestre: 'Fall 2023', totalStudents: 30 },
  { filiere: 'Mathematics', matiere: 'Algebra', semestre: 'Spring 2024', totalStudents: 25 },
  { filiere: 'Physics', matiere: 'Quantum Mechanics', semestre: 'Winter 2023', totalStudents: 20 },
  // Add more class data here
];

function ProfClasses() {
  return (
    <div className="bg-gray-100 py-12 px-4 h-full">
      <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <FaChalkboard className="mr-4 text-indigo-500" />
          Classes
        </h2>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesData.map((classItem, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-indigo-500 text-3xl mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{classItem.filiere}</h2>
                  <p className="text-gray-600">{classItem.matiere}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-gray-600"><span className="font-semibold">Semester:</span> {classItem.semestre}</p>
                  <p className="text-gray-600"><span className="font-semibold">Total Students:</span> {classItem.totalStudents}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfClasses;
