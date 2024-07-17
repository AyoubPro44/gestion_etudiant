import { useState } from "react";
import { FiSend } from "react-icons/fi"; // Importing the send icon

const InputBox = ({ sendMessage, loading }) => {
    const [inputText, setInputText] = useState("");

    const handleSendMessage = () => {
        sendMessage(inputText);
        setInputText("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex items-center p-4 border-t border-gray-300 bg-white shadow-md">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSendMessage}
                disabled={loading || inputText.trim() === ""}
                className={`ml-3 px-4 py-2 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center transition duration-200`}
            >
                {loading ? "Sending..." : <FiSend className="w-5 h-5 mr-2" />}
                <span className="hidden sm:inline-block">{loading ? "" : "Send"}</span>
            </button>
        </div>
    );
};

export default InputBox;
