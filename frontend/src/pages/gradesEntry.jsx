import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { getProfCourses } from '../services/profServices';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { logout } from '../services/authentification';
import GrandeEntryTable from '../components/grandeEntryTable';

function GradesEntry() {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState({ id_sous_module: 0, id_filiere: 0, semestre: 0 });

    const { data: classes, isLoading } = useQuery({
        queryKey: ["classes"],
        queryFn: () => {
            return getProfCourses(localStorage.getItem("id_prof"));
        }
    });

    useEffect(() => {
        if (!localStorage.getItem('auth') || localStorage.getItem('role') !== "professeur") {
            logout();
            navigate('/');
        }
    }, [navigate]);

    const handleSelectionChange = (e) => {
        const selectedValue = [...e][0];
        const selectedClass = classes.find(classe => classe.id_sous_module == selectedValue);
        setSelectedClass({
            id_sous_module: selectedClass.id_sous_module,
            id_filiere: selectedClass.id_filiere,
            semestre: selectedClass.semestre
        });
    };

    return (
        <div className="container mx-auto px-4">
            <Select
                label="Select class"
                placeholder="choose one"
                onSelectionChange={handleSelectionChange}
                className="light border w-72 ring-indigo-500 rounded-lg shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
            >
                {
                    classes?.map((classe) => (
                        <SelectItem key={classe.id_sous_module}>
                            {classe.nom_sous_module}
                        </SelectItem>
                    ))
                }
            </Select>
            {selectedClass.id_sous_module != 0 && (
                <GrandeEntryTable
                    classe={selectedClass}
                />
            )}
        </div>
    );
}

export default GradesEntry;
