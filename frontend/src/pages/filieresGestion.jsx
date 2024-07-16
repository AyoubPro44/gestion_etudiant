import React, { useEffect, useState } from 'react';
import { FaGraduationCap, FaUsers, FaThList, FaTasks, FaTrash } from 'react-icons/fa';
import { deleteFiliere, getFilieresDetails } from '../services/filiereServices';
import { logout } from '../services/authentification';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CircularProgress, useDisclosure } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import RemoveModal from '../components/removeModal';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import AddFiliereModal from '../components/gestionFilieres/addFiliereModal';

function FilieresGestion() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [filieres, setFilieres] = useState([])

    useEffect(() => {
        let role = localStorage.getItem('role');
        if (!localStorage.getItem('auth') || role !== 'admin') {
            logout();
            navigate('/');
        }
        fetchFilieres()
    }, []);

    const fetchFilieres = async () => {
        await getFilieresDetails().then((response) => setFilieres(response))
    }

    const handleRemoveFiliere = async (id_filiere) => {
        try {
            await deleteFiliere(id_filiere);
            toast.success('Filiere deleted successfully', {
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
            fetchFilieres();
        } catch (error) {
            console.error(error)
        }
    }


    if (filieres.length == 0)
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <CircularProgress color="secondary" size='lg' aria-label="Loading..." className='w-80' />
            </div>
        );

    return (
        <div className="container mx-auto p-6">
            <AddFiliereModal fetchFilieres={fetchFilieres} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filieres?.map((filiere, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold mb-4 flex items-center">
                            <FaGraduationCap className="mr-2" />
                            {filiere.nom_filiere}
                        </h2>
                        <p className="text-white mb-2 flex items-center">
                            <FaUsers className="mr-2" />
                            Nombre d'étudiants: <span className="font-medium ml-1">{filiere.nb_etudiants}</span>
                        </p>
                        <p className="text-white mb-2 flex items-center">
                            <FaThList className="mr-2" />
                            Nombre de modules: <span className="font-medium ml-1">{filiere.nb_modules}</span>
                        </p>
                        <p className="text-white mb-4 flex items-center">
                            <FaTasks className="mr-2" />
                            Nombre de sous-modules: <span className="font-medium ml-1">{filiere.nb_sous_modules}</span>
                        </p>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => navigate('/admin/filieres/' + filiere.id_filiere)}
                                className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300"
                            >
                                Select
                            </button>
                            <RemoveModal
                                button={
                                    <button
                                        className="bg-white text-red-500 hover:bg-red-100 hover:text-red-700 rounded-full p-2 transition-colors duration-300"
                                    >
                                        <FaTrash />
                                    </button>
                                }
                                idRemove={filiere.id_filiere}
                                onConfirm={handleRemoveFiliere}
                                question={"If you remove this filiere, all the modules, the sous-modules and their notes will also be removed. Are you sure you want to remove it?"}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilieresGestion;
