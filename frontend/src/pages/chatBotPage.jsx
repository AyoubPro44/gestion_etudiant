import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import InputBox from "../components/inputBox";
import chatbot from "../assets/images/chatbot.png";

const API_KEY = "API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex items-center justify-between shadow-lg">
      <div className="flex items-center">
        <img src={chatbot} alt="gemini" className="w-10 h-10 mr-4" />
        <h1 className="text-2xl font-bold">Chatbot</h1>
      </div>
      <small className="text-sm">Ask our Chatbot anything you want 😊</small>
    </div>
  );
};

const ChatBotPage = () => {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatInstance, setChatInstance] = useState(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    initializeChat();
  }, []);

  const initializeChat = async () => {
    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "" }],
          },
        ],
      });
      setChatInstance(chat);
      const result = await chat.sendMessage(initialPrompt);
      handleChatResponse(result);
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const sendMessage = async (inputText) => {
    if (!inputText) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      if (chatInstance) {
        const result = await chatInstance.sendMessage(inputText);
        handleChatResponse(result);
      }
    } catch (error) {
      console.error("sendMessage error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChatResponse = async (result) => {
    try {
      const response = await result.response;
      let text = response.text();

      const isCode = text.includes("```");
      if (!isCode) {
        text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
          isCode, 
        },
      ]);
    } catch (error) {
      console.error("handleChatResponse error: ", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex-1 p-4 overflow-y-auto" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${message.sender === "user" ? "flex-row-reverse" : ""
              } animate-fade-in`}
          >
            <img
              src={
                message.sender === "user"
                  ? `https://ui-avatars.com/api/?name=${localStorage.getItem('firstname')}+${localStorage.getItem('lastname')}&font-size=0.36&color=233467&background=random`
                  : chatbot
              }
              alt={message.sender === "user" ? "User" : "Chatbot"}
              className="w-12 h-12 rounded-full shadow-lg mx-2"
            />
            <div
              className={`p-4 rounded-xl shadow-md ${message.sender === "user"
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-white"
                } max-w-lg`}
            >
              {message.isCode ? (
                <MDEditor.Markdown
                  source={message.text}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              ) : (
                <>
                  <div
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  />
                  <span
                    className={`block text-xs mt-2 ${message.sender === "user"
                        ? "text-blue-200"
                        : "text-gray-400"
                      }`}
                  >
                    {message.timestamp
                      ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss")
                      : ""}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <InputBox sendMessage={sendMessage} loading={loading} />
      </div>
    </div>
  );
};

export default ChatBotPage;
