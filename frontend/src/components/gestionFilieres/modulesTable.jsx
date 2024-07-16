import React, { useEffect, useState } from 'react';
import { MdModeEditOutline, MdDelete, MdAdd } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { getModulesFiliere } from '../../services/filiereServices';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import AddModuleModal from './addModuleModal';
import RemoveModal from '../removeModal';
import { deleteModule } from '../../services/moduleServices';
import UpdateModuleModal from './updateModuleModal';
import SousModulesModal from './sousModulesModal';

const ModulesTable = ({ id_filiere }) => {
    const [modules, setModules] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    
    useEffect(() => {
        fetchModulesFiliere();
    }, []);

    const fetchModulesFiliere = async () => {
        try {
            const modulesResponse = await getModulesFiliere(id_filiere);
            setModules(modulesResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveModule = async (id_module) => {
        try {
            await deleteModule(id_module);
            setModules(modules.filter(module => module.id_module !== id_module));            
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    const filteredModules = modules.filter(module =>
        module.nom_module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.semestre.toString().includes(searchTerm)
    );

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const items = filteredModules.slice(start, end);

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-10 flex items-center">
                <FaBook className="mr-4 text-indigo-500" />
                Modules
            </h2>
            <div className="mb-4 flex items-center w-full justify-between">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-md mr-2 md:w-[40%]"
                />
                <AddModuleModal id_filiere={id_filiere} fetchModulesFiliere={fetchModulesFiliere} />
            </div>
            <Table
                aria-label="Modules Table"
                classNames={{
                    wrapper: "p-0",
                    table: "bg-white shadow-md rounded-lg overflow-hidden"
                }}
            >
                <TableHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <TableColumn key="nom_module">Nom Module</TableColumn>
                    <TableColumn key="semestre">Semestre</TableColumn>
                    <TableColumn key="nb_sous_modules">NB Sous-Modules</TableColumn>
                    <TableColumn key="actions">Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {items.map((module) => (
                        <TableRow key={module.id_module} className={`border-b border-gray-200 hover:bg-indigo-100 transition duration-200 ease-in-out`}>
                            <TableCell>{module.nom_module}</TableCell>
                            <TableCell>Semestre {module.semestre}</TableCell>
                            <TableCell>{module.nb_sous_modules}</TableCell>
                            <TableCell className="flex items-center gap-4">
                                <RemoveModal
                                    button={
                                        <MdDelete
                                            size={20}
                                            className="cursor-pointer text-red-600 hover:text-red-900 ml-4"
                                            title="Remove Module"
                                        />
                                    }
                                    idRemove={module.id_module}
                                    onConfirm={handleRemoveModule}
                                    question={"If you remove this module, all the sous-modules and their notes will also be removed. Are you sure you want to remove it?"}
                                />
                                <UpdateModuleModal id_module={module.id_module} oldSemestre={module.semestre} oldNomModule={module.nom_module} fetchModulesFiliere={fetchModulesFiliere} />
                                <SousModulesModal id_module={module.id_module} nom_module={module.nom_module} fetchModulesFiliere={fetchModulesFiliere} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={Math.ceil(filteredModules.length / rowsPerPage)}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ModulesTable;
