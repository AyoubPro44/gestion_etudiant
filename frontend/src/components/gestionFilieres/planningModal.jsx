import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { PLANNING_IMAGES_PATH } from "../../const";

function PlanningModal({ planning }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <FaEye size={20} onClick={onOpen} className="cursor-pointer text-indigo-600 hover:text-indigo-900 mr-4" title="View Planning" />
            <Modal
                size={"3xl"}
                isOpen={isOpen}
                onClose={onClose}
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
                            <ModalHeader className="flex flex-col gap-1">Planning</ModalHeader>
                            <ModalBody>
                                <img src={PLANNING_IMAGES_PATH + planning} alt="Planning" className="w-full h-auto max-h-[70vh] object-contain" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default PlanningModal;
