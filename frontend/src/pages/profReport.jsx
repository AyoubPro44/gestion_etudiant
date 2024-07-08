import React, { useState } from 'react';
import { saveReport } from '../services/profServices';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FiSend } from 'react-icons/fi';

function ProfReport() {
    const [reportContent, setReportContent] = useState('');

    const onSubmit = async () => {
        try {
            const response = await saveReport(localStorage.getItem('id_prof'), reportContent);
            if (response === 200)
                toast.success('Report Sent', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
        } catch (error) {
            console.error(error);
        }
        setReportContent('');
    };

    return (
        <div className="flex flex-col h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Send Report</h1>
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex-grow">
                    <label htmlFor="reportContent" className="block font-medium mb-2">Report Content:</label>
                    <textarea
                        id="reportContent"
                        className="w-full h-full border rounded-md p-2 resize-none"
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        required
                    />
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full flex items-center justify-center space-x-4">
                        <FiSend />
                        <span>Send Report</span>
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ProfReport;
