import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function RemoveModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const confirmRemove = async (onClose) => {
        if (props.idRemove)
            props.onConfirm(props.idRemove)
        else props.onConfirm()
        onClose()
    }
    return (
        <>
            <span onClick={onOpen}>
                {props.button}
            </span>
            <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"inside"} className="md:mb-0 mb-[10%]">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[20px]">Upload Attachments</ModalHeader>
                            <ModalBody className="popupModel">
                                {props.question}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    cancel
                                </Button>
                                <Button color="primary" onPress={() => confirmRemove(onClose)}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default RemoveModal