// src/components/ChatAssistant.js
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, ChevronDown } from "lucide-react";
import axios from "axios";

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Load chat history from localStorage on first render
  useEffect(() => {
    const savedSessionId = localStorage.getItem("chatSessionId");
    if (savedSessionId) {
      setSessionId(savedSessionId);
      fetchChatHistory(savedSessionId);
    }
  }, []);

  const fetchChatHistory = async (sid) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No auth token found");
        return;
      }
      
      const response = await axios.get(`/api/chat-history/?session_id=${sid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.messages) {
        setMessages(response.data.messages.map(msg => ({
          text: msg.message,
          isUser: msg.is_user
        })));
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setMessages(prev => [...prev, { 
          text: "Please log in to use the chat assistant.", 
          isUser: false 
        }]);
        return;
      }
      
      const response = await axios.post(
        "http://localhost:8000/api/chat/",
        { 
          message: userMessage,
          session_id: sessionId 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Set session ID if this is the first message
      if (response.data.session_id && !sessionId) {
        setSessionId(response.data.session_id);
        localStorage.setItem("chatSessionId", response.data.session_id);
      }
      
      // Add assistant response to chat
      setMessages(prev => [...prev, { 
        text: response.data.response, 
        isUser: false 
      }]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      console.log(error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-assistant-container">
      {/* Chat button */}
      <button 
        className={`chat-button ${isOpen ? 'chat-button-active' : ''}`}
        onClick={toggleChat}
        aria-label="Chat with hospital assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          {/* Chat header */}
          <div className="chat-header">
            <h5 className="mb-0">Hospital Assistant</h5>
            <button 
              className="minimize-button"
              onClick={toggleChat}
              aria-label="Close chat"
            >
              <ChevronDown size={20} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.length === 0 ? (
              <div className="welcome-message">
                <h6>Welcome to Holistic Hospitals!</h6>
                <p>How can I help you today? You can ask me about:</p>
                <ul>
                  <li>Booking appointments</li>
                  <li>Payment options</li>
                  <li>Available doctors</li>
                  <li>Hospital services</li>
                </ul>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`message ${msg.isUser ? 'user-message' : 'assistant-message'}`}
                >
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="message assistant-message">
                <div className="message-bubble typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="chat-input-container">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
            />
            <button 
              className="send-button" 
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
      
      {/* CSS */}
      <style jsx>{`
        .chat-assistant-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        
        .chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #3182ce;
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .chat-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        .chat-button-active {
          background-color: #e53e3e;
        }
        
        .chat-window {
          position: absolute;
          bottom: 75px;
          right: 0;
          width: 350px;
          height: 500px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .chat-header {
          background-color: #3182ce;
          color: white;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .minimize-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .welcome-message {
          background-color: #f8f9fa;
          padding: 16px;
          border-radius: 10px;
          margin-bottom: 10px;
        }
        
        .welcome-message h6 {
          color: #3182ce;
          margin-bottom: 8px;
        }
        
        .welcome-message ul {
          padding-left: 20px;
          margin-bottom: 0;
        }
        
        .welcome-message li {
          margin-bottom: 4px;
        }
        
        .message {
          display: flex;
          margin-bottom: 8px;
        }
        
        .user-message {
          justify-content: flex-end;
        }
        
        .assistant-message {
          justify-content: flex-start;
        }
        
        .message-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 18px;
          word-wrap: break-word;
          line-height: 1.4;
        }
        
        .user-message .message-bubble {
          background-color: #3182ce;
          color: white;
          border-bottom-right-radius: 4px;
        }
        
        .assistant-message .message-bubble {
          background-color: #f0f2f5;
          color: #333;
          border-bottom-left-radius: 4px;
        }
        
        .typing-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 14px;
          height: 40px;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          background-color: #aaa;
          border-radius: 50%;
          margin: 0 2px;
          display: inline-block;
          animation: bounce 1.3s linear infinite;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.15s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.3s;
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
        
        .chat-input-container {
          display: flex;
          padding: 12px;
          border-top: 1px solid #e0e0e0;
          background-color: #f8f9fa;
        }
        
        .chat-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 24px;
          resize: none;
          outline: none;
          font-size: 14px;
          transition: border-color 0.2s;
        }
        
        .chat-input:focus {
          border-color: #3182ce;
        }
        
        .send-button {
          width: 40px;
          height: 40px;
          margin-left: 8px;
          border-radius: 50%;
          background-color: #3182ce;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .send-button:disabled {
          background-color: #a0aec0;
          cursor: not-allowed;
        }
        
        .send-button:not(:disabled):hover {
          background-color: #2c5282;
        }
      `}</style>
    </div>
  );
};

export default ChatAssistant;