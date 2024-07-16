import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { IoMdAdd } from "react-icons/io";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { addModule } from '../../services/moduleServices'
import { MdAdd } from "react-icons/md";
import { addSousModule } from '../../services/sousModuleServices';


const AddSousModuleModal = ({ id_module, fetchSousModules, fetchModulesFiliere }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const sousModuleSchema = Yup.object().shape({
        nom_sous_module: Yup.string().required('Nom sous Module is required'),
        coeff: Yup.number().typeError('coeff must be a number').required('coeff is required').min(1, 'coeff must be between 1 and 10').max(10, 'coeff must be between 1 and 10'),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(sousModuleSchema)
    });


    const onSubmit = async (data) => {
        try {
            await addSousModule(id_module, data.nom_sous_module, data.coeff)
            fetchSousModules()
            fetchModulesFiliere()
            toast.success('Sous Module Added successfully', {
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
            reset()
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Button
                className="bg-indigo-500 text-white"
                startContent={<MdAdd />}
                onClick={onOpen}
            >
                Add Sous-Module
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Add Sous Module</ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <div className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    {...register('nom_sous_module')}
                                    placeholder="Nom sous-module"
                                    className="p-2 border rounded"
                                />
                                {errors.nom_sous_module && (
                                    <span className="text-red-500">{errors.nom_sous_module.message}</span>
                                )}
                                <input
                                    type="number"
                                    {...register('coeff')}
                                    placeholder="coefficient"
                                    min={1}
                                    defaultValue={1}
                                    className="p-2 border rounded"
                                />
                                {errors.coeff && (
                                    <span className="text-red-500">{errors.coeff.message}</span>
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

export default AddSousModuleModal;
