import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { IoMdAdd } from "react-icons/io";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { addFiliere } from '../../services/filiereServices';

const AddFiliereModal = ({ fetchFilieres }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const filiereSchema = Yup.object().shape({
        nom_filiere: Yup.string().required('Nom Filiere is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(filiereSchema)
    });

    const onSubmit = async (data) => {
        try {
            await addFiliere(data.nom_filiere)
            fetchFilieres();
            toast.success('Filiere Added successfully', {
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
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Error adding filiere', {
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
        }
    };

    return (
        <div>
            <div className='mb-10 flex justify-end'>
                <Button
                    className="bg-indigo-500 text-white "
                    startContent={<IoMdAdd />}
                    onClick={onOpen}
                >
                    Add Filiere
                </Button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add Filiere</ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    {...register('nom_filiere')}
                                    placeholder="Nom Filiere"
                                    className="p-2 border rounded"
                                />
                                {errors.nom_filiere && (
                                    <span className="text-red-500">{errors.nom_filiere.message}</span>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit">
                                Add
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default AddFiliereModal;
