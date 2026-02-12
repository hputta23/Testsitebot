import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import type { Message } from './ChatMessage';
import ChatInput from './ChatInput';
import { sendApplicationEmail } from '../../utils/emailService';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasGreeted = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0 && !hasGreeted.current) {
            hasGreeted.current = true;
            addBotMessage("Hi! 👋 I'm the DPR AI Assistant. I can answer questions about our services, culture, and open roles. How can I help you?");
        }
    }, [isOpen, messages]);

    const addBotMessage = (text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'bot',
            text,
            timestamp: new Date()
        }]);
    };

    const handleSendMessage = async (text: string, file?: File) => {
        console.log('handleSendMessage called', { text, file, isFile: !!file });

        // Add User Message
        const tempId = Date.now().toString();
        const userMsg: Message = {
            id: tempId,
            sender: 'user',
            text: file ? `Uploaded Resume: ${file.name}` : text,
            isFile: !!file,
            fileName: file?.name,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        // If file is provided, treat as resume upload and send email
        if (file) {
            try {
                // Placeholder data for email service (since AI manages flow now)
                const appData = {
                    name: "See Chat Transcript",
                    email: "See Chat Transcript",
                    helpContext: "Resume Uploaded",
                    authCheck: "See Chat Transcript",
                    sponsorship: "See Chat Transcript",
                    role: "New Applicant"
                };

                // Send email with full history including current message
                await sendApplicationEmail(appData, file, [...messages, userMsg]);

                addBotMessage("Thanks! I've received your resume and forwarded your application to our HR team. 🚀");
            } catch (error) {
                console.error("Email Error:", error);
                addBotMessage("I got your resume, but had trouble emailing it. Please email it directly to careers@dprsolutions.com.");
            } finally {
                setIsLoading(false);
            }
            return; // Stop here, don't ping AI for this turn
        }

        try {
            // Call AI Endpoint
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: messages.map(m => ({ sender: m.sender, text: m.text })) // Send context 
                })
            });

            const data = await response.json();

            if (data.text) {
                addBotMessage(data.text);
            } else {
                addBotMessage("I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.");
            }
        } catch (error) {
            console.error("AI Error:", error);
            addBotMessage("Oops! Something went wrong. You can also email us at careers@dprsolutions.com");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 bg-white w-[350px] md:w-[380px] h-[500px] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-white shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <div>
                                    <h3 className="font-bold text-sm">DPR AI Assistant</h3>
                                    <p className="text-xs text-blue-200">Online & Ready to help</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 text-gray-400 text-xs ml-4 mb-4"
                                >
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto bg-accent hover:bg-accent-hover text-white p-4 rounded-full shadow-lg shadow-accent/30 transition-shadow flex items-center justify-center relative group"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}

                {/* Tooltip */}
                {!isOpen && (
                    <span className="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ask AI
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
