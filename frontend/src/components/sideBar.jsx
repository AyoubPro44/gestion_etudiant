import React from 'react';
import { Divider } from '@nextui-org/react';
import {
  FaHome,
  FaCalendarAlt,
  FaChalkboard,
  FaGraduationCap,
  FaUser,
  FaKey,
  FaSignOutAlt,
  FaFileAlt
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authentification';
import useLocalStorage from '../hooks/useLocalStorage'

const links = [
  { to: "/acceuil", icon: <FaHome className="mr-4" />, label: "Accueil" },
  { to: "/professeur/planning", icon: <FaCalendarAlt className="mr-4" />, label: "My Planning" },
  { to: "/professeur/classes", icon: <FaChalkboard className="mr-4" />, label: "Classes" },
  { to: "/professeur/grades", icon: <FaGraduationCap className="mr-4" />, label: "Grades" },
  { to: "/professeur/profile", icon: <FaUser className="mr-4" />, label: "Profile" },
  { to: "/professeur/report", icon: <FaFileAlt className="mr-4" />, label: "Report" },
];

const SideBar = () => {
  const navigate = useNavigate();

  const [firstname] = useLocalStorage('firstname');
  const [lastname] = useLocalStorage('lastname');
  const [email] = useLocalStorage('email');

  const logoutFromPage = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="top-0 left-0 h-[100vh] w-fit bg-white shadow-md flex flex-col p-4 sticky">
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
      <nav className="flex flex-col space-y-2 mt-4">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center ${location.pathname === link.to ? "bg-gray-100 text-indigo-500" : ""}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
        <span
          onClick={logoutFromPage}
          className="p-2 cursor-pointer text-red-500 hover:text-red-600 hover:bg-gray-100 transition duration-200 rounded-md flex items-center"
        >
          <FaSignOutAlt className="mr-4" />
          <span>Logout</span>
        </span>
      </nav>
    </div>
  );
};

export default SideBar;
