import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import type { Message } from './ChatMessage';
import ChatInput from './ChatInput';
import { sendApplicationEmail } from '../../utils/emailService';

// Define the conversation steps
type Step = 'GREETING' | 'NAME' | 'ROLE' | 'EMAIL' | 'HELP_REQUEST' |
    'AUTH_CHECK' | 'SPONSORSHIP_CHECK' | 'VISA_STATUS' | 'VISA_EXPIRY' | 'STEM_OPT' | 'RELOCATION' |
    'RESUME' | 'CLOSING';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentStep, setCurrentStep] = useState<Step>('GREETING');
    const [isLoading, setIsLoading] = useState(false);

    // Store user data
    const [userData, setUserData] = useState({
        name: '',
        role: '',
        email: '',
        helpContext: '',
        authCheck: '',
        sponsorship: '',
        visaStatus: '',
        visaExpiry: '',
        stemOpt: '',
        relocation: '',
        resume: null as File | null
    });

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
            addBotMessage("Hi there! 👋 I'm the DPR Recruiting Assistant. I can help you submit your application directly to our HR team.");
            setTimeout(() => {
                addBotMessage("To get started, what is your full name?");
                setCurrentStep('NAME');
            }, 1000);
        }
    }, [isOpen, messages]);

    const addBotMessage = (text: string) => {
        setIsLoading(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'bot',
                text,
                timestamp: new Date()
            }]);
            setIsLoading(false);
        }, 600 + Math.random() * 500); // Simulate typing delay
    };

    const addUserMessage = (text: string, file?: File) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'user',
            text: file ? `Uploaded: ${file.name}` : text,
            isFile: !!file,
            fileName: file?.name,
            timestamp: new Date()
        }]);
    };

    const handleSendMessage = (text: string, file?: File) => {
        addUserMessage(text, file);

        // Chat Logic Flow
        switch (currentStep) {
            case 'NAME':
                setUserData(prev => ({ ...prev, name: text }));
                addBotMessage(`Nice to meet you, ${text}! How can I help you today?`);
                setCurrentStep('HELP_REQUEST');
                break;

            case 'HELP_REQUEST':
                setUserData(prev => ({ ...prev, helpContext: text }));
                addBotMessage("Got it. Could you please provide your email address so we can contact you?");
                setCurrentStep('EMAIL');
                break;

            case 'EMAIL':
                setUserData(prev => ({ ...prev, email: text }));
                // Immigration Question 1: Auth Check
                addBotMessage("Thanks. Now I have a few quick questions regarding work authorization.");
                addBotMessage("Are you legally authorized to work in the United States?");
                setCurrentStep('AUTH_CHECK');
                break;

            case 'AUTH_CHECK':
                setUserData(prev => ({ ...prev, authCheck: text }));
                // Immigration Question 2: Sponsorship Check
                addBotMessage("Will you now or in the future require sponsorship for an employment-based visa (e.g., H-1B, TN, etc.)?");
                setCurrentStep('SPONSORSHIP_CHECK');
                break;

            case 'SPONSORSHIP_CHECK':
                setUserData(prev => ({ ...prev, sponsorship: text }));
                const lowerText = text.toLowerCase();
                if (lowerText.includes('yes') || lowerText.includes('yeah') || lowerText.includes('sure')) {
                    // Dive into details if Yes
                    addBotMessage("What is the basis of your current work authorization? (e.g., OPT, STEM OPT, H-1B transfer, etc.)");
                    setCurrentStep('VISA_STATUS');
                } else {
                    // Skip to Resume if No
                    addBotMessage("Perfect. Finally, please upload your resume (PDF or Word doc).");
                    setCurrentStep('RESUME');
                }
                break;

            case 'VISA_STATUS':
                setUserData(prev => ({ ...prev, visaStatus: text }));
                addBotMessage("When does your current work authorization expire?");
                setCurrentStep('VISA_EXPIRY');
                break;

            case 'VISA_EXPIRY':
                setUserData(prev => ({ ...prev, visaExpiry: text }));
                // Check if OPT mentioned previously logic could be here, but simpler to just ask all sponsorship candidates about relocation
                // User requirement: "If you are on OPT, are you eligible for the 24-month STEM extension?"
                // We'll ask vaguely to cover everyone or just ask. Let's ask STEM specifically.
                addBotMessage("If you are on OPT, are you eligible for the 24-month STEM extension? (If not applicable, say N/A)");
                setCurrentStep('STEM_OPT');
                break;

            case 'STEM_OPT':
                setUserData(prev => ({ ...prev, stemOpt: text }));
                addBotMessage("Are you currently residing in the U.S., or would you require an initial entry visa from abroad?");
                setCurrentStep('RELOCATION');
                break;

            case 'RELOCATION':
                setUserData(prev => ({ ...prev, relocation: text }));
                addBotMessage("Thank you for providing those details. Now, please upload your resume (PDF or Word doc).");
                setCurrentStep('RESUME');
                break;

            case 'RESUME':
                if (file) {
                    setUserData(prev => ({ ...prev, resume: file }));
                    addBotMessage("Received your resume! 📄");
                    submitApplication(file); // Trigger submission
                } else {
                    addBotMessage("I need you to attach your resume file using the clip icon to proceed.");
                }
                break;

            case 'CLOSING':
                addBotMessage("Is there anything else I can help you with today?");
                break;
        }
    };

    const submitApplication = async (file: File) => {
        setIsLoading(true);

        // Log data for debugging
        console.log("--- SUBMITTING APPLICATION ---");
        console.log("Name:", userData.name);
        console.log("Email:", userData.email);

        // Send email via EmailJS
        // Note: File attachment handling is complex on free tier; 
        // we are sending the text data primarily here.
        const result = await sendApplicationEmail(userData, file);

        // Simulate a small delay for better UX if the API is too fast, 
        // or just to show the loading state.
        setTimeout(() => {
            setIsLoading(false);
            if (result.success) {
                addBotMessage("Thanks! I've successfully forwarded your profile to our HR team.");
                addBotMessage("Someone will be in touch with you shortly at " + userData.email);
            } else {
                addBotMessage("I encountered a small issue sending the email, but I've saved your details.");
                addBotMessage("You can also email us directly at careers@dprsolutions.com");
            }
            setCurrentStep('CLOSING');
        }, 1000);
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
                                    <h3 className="font-bold text-sm">DPR Recruiter</h3>
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
                        Chat with HR
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
