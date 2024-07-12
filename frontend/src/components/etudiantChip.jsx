import React from 'react';
import { Chip, Avatar } from "@nextui-org/react";
import { HiPlus } from "react-icons/hi2";
import { removeParent } from '../services/parentServices';
import RemoveModal from './removeModal'
import { useNavigate } from 'react-router-dom';

function EtudiantChip(props) {
    const navigate = useNavigate()

    const handleRemove = async () => {
        await removeParent(props.etudiant.id_etudiant);
        props?.onRemove(props.etudiant.id_etudiant);
        const choosingEtudiant = JSON.parse(localStorage.getItem('choosingEtudiant'));
        if(props.etudiant.id_etudiant == choosingEtudiant.id_etudiant)
            navigate('/parent/chooseEtudiant')
    }

    return (
        <div className="flex gap-4">
            <Chip
                size='lg'
                variant="flat"
                avatar={
                    <Avatar
                        src={`https://ui-avatars.com/api/?name=${props.etudiant.firstname}+${props.etudiant.lastname}&font-size=0.36&color=233467&background=random`}
                    />
                }
                endContent={
                    <RemoveModal 
                        button={<HiPlus className="cursor-pointer rotate-45" />} 
                        question="Are you sure you want to remove student ?"
                        onConfirm={handleRemove} 
                    />
                }
            >
                {props.etudiant.firstname} {props.etudiant.lastname} ({props.etudiant.num_etudiant})
            </Chip>
        </div>
    )
}

export default EtudiantChip;
