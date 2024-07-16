import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdEdit } from "react-icons/md";
import { updateModule } from '../../services/moduleServices';
import { updateSousModule } from '../../services/sousModuleServices';
import { MdModeEditOutline } from "react-icons/md";

const UpdateSousModuleModal = ({ fetchSousModules, oldNomSousModule, oldCoeff, id_sous_module }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const sousModuleSchema = yup.object().shape({
        nom_sous_module: yup.string().required("Nom Sous Module is required"),
        coeff: yup
            .number()
            .typeError("coeff must be a number")
            .min(1, "coeff must be at least 1")
            .max(10, "coeff must be at most 10")
            .required("coeff is required"),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(sousModuleSchema),
    });

    const handleUpdate = async (data) => {
        try {
            await updateSousModule(id_sous_module, data.nom_sous_module, data.coeff)
            fetchSousModules()
        } catch (error) {
            console.error(error)
        }
        onClose();
        reset();
    };

    return (
        <>
            <MdModeEditOutline
                size={20}
                onClick={onOpen}
                className="cursor-pointer text-purple-600 hover:text-purple-900" title="Edit Sous-Module"
            />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Update Sous Module</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col space-y-4">
                            <div>
                                <input
                                    type="text"
                                    {...register("nom_sous_module")}
                                    placeholder="Nom Sous-Module"
                                    defaultValue={oldNomSousModule}
                                    className="p-2 border rounded w-full"
                                />
                                {errors.nom_sous_module && (
                                    <p className="text-red-500 text-sm">{errors.nom_sous_module.message}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="number"
                                    {...register("coeff")}
                                    placeholder="coefficient"
                                    defaultValue={oldCoeff}
                                    className="p-2 border rounded w-full"
                                />
                                {errors.coeff && (
                                    <p className="text-red-500 text-sm">{errors.coeff.message}</p>
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

export default UpdateSousModuleModal;
