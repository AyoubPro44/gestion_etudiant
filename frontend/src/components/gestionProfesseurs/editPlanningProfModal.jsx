import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { MdModeEditOutline } from "react-icons/md";
import { updateProfPlanning } from '../../services/profServices';

const EditPlanningProfModal = ({ id_prof, planning, fetchProfesseurs }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePlanning = async () => {
        try {
            console.log(imagePreview)
            await updateProfPlanning(planning, imagePreview, id_prof)
            fetchProfesseurs()
            setImagePreview(null);
            onOpenChange(false);
        } catch (error) {
            console.error('Failed to update planning', error);
        }
    }

    return (
        <>
            <MdModeEditOutline size={20} onClick={onOpen} className="cursor-pointer text-purple-600 hover:text-purple-900" title="Edit Planning" />
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Planning</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center space-y-4">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                    />
                                    <div
                                        onClick={() => document.getElementById('fileInput').click()}
                                        className="w-full h-44 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer"
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Image Preview" className="h-full w-full object-contain" />
                                        ) : (
                                            <span className="text-gray-400">Upload Planning</span>
                                        )}
                                    </div>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={handleSavePlanning}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditPlanningProfModal;
