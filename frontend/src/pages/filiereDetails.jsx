import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { PLANNING_IMAGES_PATH } from '../const';
import { FaCalendarAlt } from 'react-icons/fa';
import { Button, useDisclosure } from '@nextui-org/react';
import { IoSaveSharp } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import ChangeFiliereName from '../components/gestionFilieres/changeFiliereName'
import { logout } from '../services/authentification';
import { useNavigate, useParams } from 'react-router-dom';
import SemestreTable from '../components/gestionFilieres/semestreTable';
import ModulesTable from '../components/gestionFilieres/modulesTable';

function FiliereDetails() {
  const navigate = useNavigate()
  const [planningImage, setPlanningImage] = useState(PLANNING_IMAGES_PATH + "planning_1.jpg"); // Replace with dynamic data

  const { id_filiere } = useParams()

  useEffect(() => {
    let role = localStorage.getItem('role');
    if (!localStorage.getItem('auth') || role != 'admin') {
      logout();
      navigate('/');
    }
  }, [])

  return (
    <div className="container mx-auto p-6">
      <ChangeFiliereName id_filiere={id_filiere} />
      
      <SemestreTable id_filiere={id_filiere} />
      <ModulesTable id_filiere={id_filiere} />
    </div>
  );
}

export default FiliereDetails;
