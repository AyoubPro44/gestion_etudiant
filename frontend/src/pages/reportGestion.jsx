import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CircularProgress } from "@nextui-org/react";
import { getReports } from '../services/reportServices';
import ReportCard from '../components/reportCard';
import { FaRegFileAlt } from 'react-icons/fa'

function ReportGestion() {

    const { data: reports = [], isLoading } = useQuery({
        queryKey: ["reports",],
        queryFn: () => getReports()
    });

    if (isLoading)
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <CircularProgress color="secondary" size='lg' aria-label="Loading..." className='w-80' />
            </div>
        )

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-10 mt-4">
                <FaRegFileAlt  className="mr-4 text-indigo-500" />
                Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reports?.map(report => (
                    <ReportCard report={report} />
                ))}
            </div>
        </div>
    );
}

export default ReportGestion;
