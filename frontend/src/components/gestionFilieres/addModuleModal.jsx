import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { IoMdAdd } from "react-icons/io";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { addModule } from '../../services/moduleServices'


const AddModuleModal = ({ id_filiere, fetchModulesFiliere }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    
    const moduleSchema = Yup.object().shape({
        nom_module: Yup.string().required('Nom Module is required'),
        semestre: Yup.number().typeError('Semestre must be a number').required('Semestre is required').min(1, 'Semestre must be between 1 and 10').max(10, 'Semestre must be between 1 and 10'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(moduleSchema)
    });


    const onSubmit = async (data) => {
        try {
            await addModule(id_filiere, data.nom_module, data.semestre)
            fetchModulesFiliere()
            toast.success('Module Added successfully', {
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
        }
    };

    return (
        <div>
            <Button
                className="bg-indigo-500 text-white"
                startContent={<IoMdAdd />}
                onClick={onOpen}
            >
                Add Module
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add Module</ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    {...register('nom_module')}
                                    placeholder="Nom Module"
                                    className="p-2 border rounded"
                                />
                                {errors.nom_module && (
                                    <span className="text-red-500">{errors.nom_module.message}</span>
                                )}
                                <input
                                    type="number"
                                    {...register('semestre')}
                                    placeholder="Semestre"
                                    min={1}
                                    max={10}
                                    defaultValue={1}
                                    className="p-2 border rounded"
                                />
                                {errors.semestre && (
                                    <span className="text-red-500">{errors.semestre.message}</span>
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

export default AddModuleModal;
