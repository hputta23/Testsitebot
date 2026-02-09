import React from 'react';
import { User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    isFile?: boolean;
    fileName?: string;
    timestamp: Date;
}

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isBot = message.sender === 'bot';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
        >
            <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>

                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 ml-2 ${isBot ? 'bg-primary text-white mr-2' : 'bg-gray-200 text-gray-600 ml-2'}`}>
                    {isBot ? <Bot size={16} /> : <User size={16} />}
                </div>

                {/* Message Bubble */}
                <div
                    className={`p-3 rounded-2xl text-sm shadow-sm ${isBot
                            ? 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                            : 'bg-accent text-white rounded-tr-none'
                        }`}
                >
                    {message.isFile ? (
                        <div className="flex items-center gap-2">
                            <span className="italic">📎 {message.fileName}</span>
                        </div>
                    ) : (
                        <p>{message.text}</p>
                    )}
                    <span className={`text-[10px] block mt-1 opacity-70 ${isBot ? 'text-gray-400' : 'text-blue-100'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ChatMessage;
