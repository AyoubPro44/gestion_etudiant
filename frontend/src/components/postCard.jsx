import React from 'react'
import school from '../assets/images/school.jpg'; // Example import for news images

function PostCard(props) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md flex mb-6 md:mb-8">
            <div className="relative flex-shrink-0 w-36 md:w-64">
                <img className="w-full h-full md:h-full object-cover" src={school} alt={props.item.title} />
            </div>
            <div className="flex flex-col justify-between p-2 md:p-6 w-full">
                <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{props.item.title}</h3>
                    <p className="text-sm md:text-base text-gray-700 mb-2 line-clamp-3">{props.item.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600 text-sm">{props.item.date}</span>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 focus:outline-none">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostCard