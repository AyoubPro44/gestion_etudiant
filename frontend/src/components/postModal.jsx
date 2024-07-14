import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { POST_IMAGES_PATH, SERVERPOINT } from "../const";

function PostModal(props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {/* <Button  color="secondary">Open Modal</Button> */}
            <button onClick={onOpen} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 focus:outline-none">
                Read More
            </button>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                size=""
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{props.post.TITLE}</ModalHeader>
                            <ModalBody>
                                <img className="w-full h-48 object-cover" src={`${POST_IMAGES_PATH}${props.post.PHOTO}`} alt={props.post.TITLE} />

                                <p>
                                    {props.post.DESCRIPTION}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="foreground" variant="light" onPress={onClose}>
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

export default PostModal