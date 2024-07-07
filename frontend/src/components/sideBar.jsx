import { Divider } from '@nextui-org/react';
import React from 'react';
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

const SideBar = () => {
  const navigate = useNavigate()

  const logoutFromPage = () => {
    logout()
    navigate('/')
  }
  return (
    <div className="top-0 left-0 h-[100vh] w-fit bg-white shadow-md flex flex-col p-4 sticky">
      <div className="flex items-center space-x-4 p-2 mb-5">
        <img
          src={`https://ui-avatars.com/api/?name=${localStorage.getItem('firstname')}+${localStorage.getItem('lastname')}&font-size=0.36&color=233467&background=DBE1FF`}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold text-gray-700">{localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname')}</h4>
          <span className="text-sm text-indigo-500">{localStorage.getItem('email')}</span>
        </div>
      </div>
      <Divider />
      <nav className="flex flex-col space-y-2 mt-4">
        <Link to="/acceuil" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaHome className="mr-4" />
          <span>Accueil</span>
        </Link>
        <Link to="/professeur/planning" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaCalendarAlt className="mr-4" />
          <span>My Planning</span>
        </Link>
        <Link to="/professeur/classes" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaChalkboard className="mr-4" />
          <span>Classes</span>
        </Link>
        <Link to="/professeur/grades" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaGraduationCap className="mr-4" />
          <span>Grades</span>
        </Link>
        <Link to="/profile" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaUser className="mr-4" />
          <span>Profile</span>
        </Link>
        <Link to="/change-password" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaKey className="mr-4" />
          <span>Change Password</span>
        </Link>
        <Link to="/settings" className="p-2 text-gray-700 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaFileAlt className="mr-4" />
          <span>Repport</span>
        </Link>
        <span onClick={logoutFromPage} className="p-2 cursor-pointer text-red-500 hover:text-red-600 hover:bg-gray-100 transition duration-200 rounded-md flex items-center">
          <FaSignOutAlt className="mr-4" />
          <span>Logout</span>
        </span>
      </nav>
    </div>
  );
};

export default SideBar;
