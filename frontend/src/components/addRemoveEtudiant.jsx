import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "@nextui-org/react";
import { PiStudentFill } from "react-icons/pi";
import EtudiantChip from '../components/etudiantChip';
import { addParent, getParentEtudiants } from '../services/parentServices'; // Import your addEtudiant service
import * as Yup from 'yup';
import { checkNumEtudiant, hasParent } from '../services/authentification';

const validationSchema = Yup.object().shape({
    numEtudiant: Yup.string()
        .required("N° d'Etudiant is required")
        .test('N° Etudiant not exist', 'N° Etudiant not exists', async function (numEtudiant) {
            return await checkNumEtudiant(numEtudiant);
        })
        .test('etudiant has parent', 'This etudiant has a tuteur', async function (numEtudiant) {
            return !(await hasParent(numEtudiant));
        })
});

function AddRemoveEtudiant() {
    const [etudiants, setEtudiants] = useState([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        fetchEtudiants();
    }, []);

    const fetchEtudiants = async () => {
        try {
            const students = await getParentEtudiants(localStorage.getItem('id_parent'));
            setEtudiants(students);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await addParent(data.numEtudiant, localStorage.getItem('id_parent'));
            fetchEtudiants();
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveEtudiant = (idEtudiant) => {
        setEtudiants((prevEtudiants) => prevEtudiants.filter(etudiant => etudiant.id_etudiant !== idEtudiant));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-8 mx-6">
            <h2 className="text-2xl font-bold mb-6 text-left flex items-center gap-4">
                <PiStudentFill size={24} />
                <span>My Students</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex md:flex-col flex-col gap-6">
                    <div className='md:w-[40%]'>
                        <label htmlFor="numEtudiant" className="block text-sm font-medium text-gray-700">N° Etudiant</label>
                        <div className="mt-1">
                            <div className='flex flex-row gap-4 items-center'>
                                <input
                                    id="numEtudiant"
                                    name="numEtudiant"
                                    type="text"
                                    {...register('numEtudiant')}
                                    className={`block w-full px-3 py-2 border ${errors.numEtudiant ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900`}
                                />
                                <Button type="submit" className='text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' size='sm'>
                                    Add
                                </Button>
                            </div>
                            {errors.numEtudiant && <p className="mt-2 text-sm text-red-600">{errors.numEtudiant.message}</p>}
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap gap-4'>
                        {etudiants?.map((etudiant) => (
                            <EtudiantChip key={etudiant.id_etudiant} etudiant={etudiant} onRemove={handleRemoveEtudiant} />
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddRemoveEtudiant;
