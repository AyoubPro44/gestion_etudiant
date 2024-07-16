import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@nextui-org/react';
import { IoSaveSharp } from "react-icons/io5";
import { getFiliereById, updateFiliereName } from '../../services/filiereServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

function ChangeFiliereName({ id_filiere }) {

  const [isEditing, setIsEditing] = useState(false);
  const [filiereName, setFiliereName] = useState('');

  useEffect(() => {
    fetchFiliere()
  }, [])

  const fetchFiliere = async () => {
    try {
      const filiere = await getFiliereById(id_filiere)
      setFiliereName(filiere.NOM_FILIERE);
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        await updateFiliereName(filiereName, id_filiere)
        toast.success('nom filiere updated', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } catch (error) {
        console.error(error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setFiliereName(e.target.value);
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            value={filiereName}
            onChange={handleNameChange}
            className="border rounded-md py-2 px-4 mr-2 flex-1"
          />
        ) : (
          <h2 className="text-2xl font-bold text-gray-800 flex-1">{filiereName}</h2>
        )}
        <Button
          className="bg-indigo-500 text-white"
          startContent={!isEditing ? <FaEdit /> : <IoSaveSharp />}
          onClick={handleEditClick}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ChangeFiliereName