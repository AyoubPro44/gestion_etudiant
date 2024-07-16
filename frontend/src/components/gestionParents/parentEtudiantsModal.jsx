import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { getParentEtudiants } from '../../services/parentServices';

const ParentEtudiantsModal = ({ id_parent, firstname, lastname }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [etudiants, setEtudiants] = useState();

    useEffect(() => {
        fetchParentEtudiants()
    }, [])

    const fetchParentEtudiants = async () => {
        try {
            const fetchingEtudiants = await getParentEtudiants(id_parent)
            setEtudiants(fetchingEtudiants);
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
                    <ModalHeader className="flex flex-col gap-1">{firstname} {lastname} Etudiants</ModalHeader>
                    <ModalBody>
                        <Table aria-label="Example table with dynamic content">
                            <TableHeader >
                                <TableColumn key="nom_module">Num Etudiant</TableColumn>
                                <TableColumn key="semestre">Nom</TableColumn>
                                <TableColumn key="nb_sous_modules">Prenom</TableColumn>
                                <TableColumn key="nb_sous_modules">Semestre</TableColumn>
                                <TableColumn key="nb_sous_modules">Filiere</TableColumn>
                            </TableHeader>
                            <TableBody items={etudiants} emptyContent={"No Sous Modules to display."}>
                                {
                                    etudiants?.map((etudiant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{etudiant.num_etudiant}</TableCell>
                                            <TableCell>{etudiant.lastname}</TableCell>
                                            <TableCell>{etudiant.firstname}</TableCell>
                                            <TableCell>{etudiant.semestre}</TableCell>
                                            <TableCell>{etudiant.nom_filiere}</TableCell>
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

export default ParentEtudiantsModal;
