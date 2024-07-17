import React from 'react'
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import ReportModal from './reportModal';
import { useDisclosure } from "@nextui-org/react";

function ReportCard({ report }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div key={report.id_report} onClick={onOpen} className="cursor-pointer bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
                <FaUser className="text-indigo-500 mr-2" />
                <h2 className="text-xl font-semibold">{report.lastname} {report.firstname}</h2>
            </div>
            <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span className="text-gray-500">{report.report_date}</span>
            </div>
            <p className="text-gray-700 line-clamp-5">{report.report_content}</p>
            <ReportModal report={report} isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    )
}

export default ReportCard