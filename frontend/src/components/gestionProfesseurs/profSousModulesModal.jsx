import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { MdModeEditOutline, MdDelete, MdAdd } from "react-icons/md";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { FaBook, FaEye } from "react-icons/fa";
import { getProfCourses } from '../../services/profServices';

const ProfSousModulesModal = ({ id_prof, firstname, lastname }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sousModules, setSousModules] = useState();

    useEffect(() => {
        fetchSousModules()
    }, [])

    const fetchSousModules = async () => {
        try {
            const fetchingSousModules = await getProfCourses(id_prof)
            setSousModules(fetchingSousModules);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <FaEye
                size={18}
                className="cursor-pointer text-purple-600 hover:text-purple-900"
                title="Remove Module"
                onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' size='lg'>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">{firstname} {lastname} Enseigements</ModalHeader>
                    <ModalBody>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader >
                                <TableColumn key="nom_module">Nom Sous-Module</TableColumn>
                                <TableColumn key="semestre">Nom Module</TableColumn>
                                <TableColumn key="nb_sous_modules">Nom Filiere</TableColumn>
                                <TableColumn key="nb_sous_modules">Semestre</TableColumn>
                            </TableHeader>
                            <TableBody items={sousModules} emptyContent={"No Sous Modules to display."}>
                                {
                                    sousModules?.map((sousModule, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{sousModule.nom_sous_module}</TableCell>
                                            <TableCell>{sousModule.nom_module}</TableCell>
                                            <TableCell>{sousModule.nom_filiere}</TableCell>
                                            <TableCell>{sousModule.semestre}</TableCell>
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

export default ProfSousModulesModal;
