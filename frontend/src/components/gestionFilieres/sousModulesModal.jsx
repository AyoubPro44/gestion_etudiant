import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { MdModeEditOutline, MdDelete, MdAdd } from "react-icons/md";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { FaBook } from "react-icons/fa";
import { getModuleSousModules } from '../../services/moduleServices';
import AddSousModuleModal from './addSousModuleModal';
import RemoveModal from '../removeModal';
import { deleteSousModule } from '../../services/sousModuleServices';
import UpdateSousModuleModal from './udpateSousModuleModal';

const SousModulesModal = ({ id_module, nom_module, fetchModulesFiliere }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sousModules, setSousModules] = useState();

    useEffect(() => {
        fetchSousModules()
    }, [])

    const fetchSousModules = async () => {
        try {
            const fetchingSousModules = await getModuleSousModules(id_module)
            setSousModules(fetchingSousModules);
        } catch (error) {
            console.error(error)
        }
    }

    const handleRemove = async (id_sous_module) => {
        try {
            await deleteSousModule(id_sous_module)
            const updatedSousModules = sousModules.filter((sousModule) => sousModule.id_sous_module !== id_sous_module);
            setSousModules(updatedSousModules);
            fetchModulesFiliere()
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <FaBook
                size={18}
                className="cursor-pointer text-purple-600 hover:text-purple-900"
                title="Remove Module"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Sous-Modules of {nom_module}</ModalHeader>
                    <ModalBody>
                        <div className="flex justify-between mb-4">
                            <AddSousModuleModal id_module={id_module} fetchSousModules={fetchSousModules} fetchModulesFiliere={fetchModulesFiliere}/>
                        </div>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader >
                                <TableColumn key="nom_module">Nom Sous-Module</TableColumn>
                                <TableColumn key="semestre">Coefficient</TableColumn>
                                <TableColumn key="nb_sous_modules">Actions</TableColumn>
                            </TableHeader>
                            <TableBody items={sousModules} emptyContent={"No Sous Modules to display."}>
                                {
                                    sousModules?.map((sousModule, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{sousModule.nom_sous_module}</TableCell>
                                            <TableCell>{sousModule.coeff}</TableCell>
                                            <TableCell className="flex items-center gap-4">
                                                <UpdateSousModuleModal fetchSousModules={fetchSousModules} oldNomSousModule={sousModule.nom_sous_module} oldCoeff={sousModule.coeff} id_sous_module={sousModule.id_sous_module} />
                                                <RemoveModal
                                                    button={
                                                        <MdDelete
                                                            size={20}
                                                            className="cursor-pointer text-red-600 hover:text-red-900 ml-4"
                                                            title="Remove Module"
                                                        />
                                                    }
                                                    idRemove={sousModule.id_sous_module}
                                                    onConfirm={handleRemove}
                                                    question={"If you remove this sous-module, all the notes will also be removed. Are you sure you want to remove it?"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SousModulesModal;
