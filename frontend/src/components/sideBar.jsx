import React, { useEffect, useState } from 'react';
import { Divider } from '@nextui-org/react';
import {
  FaHome,
  FaCalendarAlt,
  FaChalkboard,
  FaGraduationCap,
  FaUser,
  FaSignOutAlt,
  FaFileAlt,
  FaEnvelope
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authentification';
import useLocalStorage from '../hooks/useLocalStorage'
import { User } from "@nextui-org/react";
import { PiStudentBold } from "react-icons/pi";

const profLinks = [
  { to: "/professeur/planning", icon: <FaCalendarAlt className="mr-4" />, label: "My Planning" },
  { to: "/professeur/classes", icon: <FaChalkboard className="mr-4" />, label: "Classes" },
  { to: "/professeur/grades", icon: <FaGraduationCap className="mr-4" />, label: "Grades" },
  { to: "/professeur/profile", icon: <FaUser className="mr-4" />, label: "Profile" },
  { to: "/professeur/report", icon: <FaFileAlt className="mr-4" />, label: "Report" },
];

const etudiantsLinks = [
  { to: "/etudiant/planning", icon: <FaCalendarAlt className="mr-4" />, label: "My planning" },
  { to: "/etudiant/program", icon: <FaChalkboard className="mr-4" />, label: "Program" },
  { to: "/etudiant/grades", icon: <FaGraduationCap className="mr-4" />, label: "Consultation notes" },
  { to: "/etudiant/profile", icon: <FaUser className="mr-4" />, label: "Profile" },
];

const parentLinks = [
  { to: "/parent/etudiantPlanning", icon: <FaCalendarAlt className="mr-4" />, label: "Planning" },
  { to: "/parent/etudiantProgram", icon: <FaChalkboard className="mr-4" />, label: "Filiere Program" },
  { to: "/parent/etudiantGrades", icon: <FaGraduationCap className="mr-4" />, label: "Consultation notes" },
  { to: "/parent/Profile", icon: <FaUser className="mr-4" />, label: "Profile" },
  { to: "/parent/chooseEtudiant", icon: <PiStudentBold className="mr-4" />, label: "Change Eudiant" },
];

const SideBar = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [firstname] = useLocalStorage('firstname');
  const [lastname] = useLocalStorage('lastname');
  const [email] = useLocalStorage('email');
  const [choosingEtudiant, setChoosingEtudiant] = useState({})

  const logoutFromPage = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'etudiant')
      setLinks(etudiantsLinks);
    else if (role === 'professeur')
      setLinks(profLinks);
    else if (role === 'parent') {
      setLinks(parentLinks);
      setChoosingEtudiant(JSON.parse(localStorage.getItem('choosingEtudiant')));
    }
  }, []);

  return (
    <div className="w-fit top-0 left-0 bg-white shadow-md flex flex-col p-4 sticky overflow-y-auto">
      <div className="flex items-center space-x-4 p-2 mb-5">
        <img
          src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&font-size=0.36&color=233467&background=DBE1FF`}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-gray-700">{firstname + ' ' + lastname}</h4>
          <span className="text-sm text-indigo-500">{email}</span>
        </div>
      </div>
      <Divider />
      {
        localStorage.getItem('role') == 'parent' &&
        <div className="flex items-center space-x-4 p-2 mt-4">
          <img
            src={`https://ui-avatars.com/api/?name=${choosingEtudiant.firstname}+${choosingEtudiant.lastname}&font-size=0.36&color=ffffff&background=6366F1`}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="text-gray-700 text-sm font-semibold">Etudiant : {choosingEtudiant.firstname + ' ' + choosingEtudiant.lastname}</h4>
            <span className="text-sm text-gray-500">N° :  {choosingEtudiant.num_etudiant}</span>
          </div>
        </div>
      }

      <nav className="flex flex-col space-y-2 mt-4">
        <Link
          key="/acceuil"
          to="/acceuil"
          className={`p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center ${location.pathname === "/acceuil" ? "bg-gray-100 text-indigo-500" : ""}`}
        >
          <FaHome className="mr-4" />
          <span>Accueil</span>
        </Link>
        {links.map(link => (

          <div>
            {link.to == '/parent/Profile' && <Divider className='mb-4' />}
            <Link
              key={link.to}
              to={link.to}
              className={`p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center ${location.pathname === link.to ? "bg-gray-100 text-indigo-500" : ""}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </div>
        ))}
        <span
          onClick={logoutFromPage}
          className="p-2 cursor-pointer text-red-500 hover:text-red-600 hover:bg-gray-100 transition duration-200 rounded-md flex items-center"
        >
          <FaSignOutAlt className="mr-4" />
          <span>Logout</span>
        </span>

        <Divider />
        <a href="mailto:support@school.com" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaEnvelope className="mr-4" />
          <div>
            <span>Contact Us</span>
            <span className="text-sm text-indigo-500 block">support@school.com</span>
          </div>
        </a>


      </nav>
    </div>
  );
};

export default SideBar;
