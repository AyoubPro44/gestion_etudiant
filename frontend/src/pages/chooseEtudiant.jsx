import React from 'react';

// Example student data (replace with your actual data)
const students = [
  {
    id: 1,
    photoUrl: 'https://ui-avatars.com/api/?name=John+Doe&font-size=0.36&color=233467&background=DBE1FF',
    firstName: 'John',
    lastName: 'Doe',
    studentNumber: '12345',
    programName: 'Computer Science',
    semester: '1st Semester',
  },
  {
    id: 2,
    photoUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&font-size=0.36&color=233467&background=DBE1FF',
    firstName: 'Jane',
    lastName: 'Smith',
    studentNumber: '67890',
    programName: 'Engineering',
    semester: '3rd Semester',
  },
  {
    id: 2,
    photoUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&font-size=0.36&color=233467&background=DBE1FF',
    firstName: 'Jane',
    lastName: 'Smith',
    studentNumber: '67890',
    programName: 'Engineering',
    semester: '3rd Semester',
  },
];

function ChooseEtudiant() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Choose a Student</h1>
        <p className="text-gray-600">Please select a student from the list below to view their details and progress.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {students.map((student) => (
          <div 
            key={student.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transform transition duration-500 hover:scale-105 cursor-pointer w-80 p-4"
          >
            <div className="flex items-center mb-4">
              <img 
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-sm" 
                src={student.photoUrl} 
                alt={`${student.firstName} ${student.lastName}`} 
              />
              <div className="ml-4">
                <h2 className="font-bold text-xl text-gray-800">{student.firstName} {student.lastName}</h2>
                <p className="text-gray-500 text-sm">N°: {student.studentNumber}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2"><strong>Filiere:</strong> {student.programName}</p>
              <p className="text-gray-600 text-sm"><strong>Semester:</strong> {student.semester}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseEtudiant;
