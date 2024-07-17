import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { POST_IMAGES_PATH, SERVERPOINT } from "../const";

function ReportModal({ report, isOpen, onOpenChange }) {

    return (
        <>
            {/* <button onClick={onOpen} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 focus:outline-none">
                Read More
            </button> */}
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
                            <ModalHeader className="flex flex-col gap-1">
                                <span>{report.lastname} {report.firstname} Report</span>
                                <span className="text-default-500 text-sm">{report.report_date}</span>
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    {report.report_content}
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

export default ReportModal