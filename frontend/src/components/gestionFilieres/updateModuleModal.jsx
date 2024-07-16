import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { MdAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEdit } from "react-icons/md";
import { updateModule } from '../../services/moduleServices';

const UpdateModuleModal = ({ fetchModulesFiliere, oldNomModule, oldSemestre, id_module }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const schema = yup.object().shape({
        nom_module: yup.string().required("Nom Module is required"),
        semestre: yup
            .number()
            .typeError("Semestre must be a number")
            .min(1, "Semestre must be at least 1")
            .max(10, "Semestre must be at most 10")
            .required("Semestre is required"),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleUpdate = async (data) => {
        try {
            await updateModule(id_module, data.nom_module, data.semestre);
            fetchModulesFiliere()
        } catch (error) {
            console.error(error)
        }
        onClose();
        reset();
    };

    return (
        <>
            <MdEdit
                size={20}
                className="cursor-pointer text-purple-600 hover:text-purple-900"
                title="Remove Module"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Update Module</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col space-y-4">
                            <div>
                                <input
                                    type="text"
                                    {...register("nom_module")}
                                    placeholder="Nom Module"
                                    defaultValue={oldNomModule}
                                    className="p-2 border rounded w-full"
                                />
                                {errors.nom_module && (
                                    <p className="text-red-500 text-sm">{errors.nom_module.message}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register("semestre")}
                                    placeholder="Semestre"
                                    defaultValue={oldSemestre}
                                    className="p-2 border rounded w-full"
                                />
                                {errors.semestre && (
                                    <p className="text-red-500 text-sm">{errors.semestre.message}</p>
                                )}
                            </div>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    Update
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateModuleModal;
