import React, { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (text: string, file?: File) => void;
    isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [text, setText] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((!text.trim() && !attachedFile) || isLoading) return;

        onSendMessage(text, attachedFile || undefined);
        setText('');
        setAttachedFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 rounded-b-xl relative">
            {/* File Preview */}
            {attachedFile && (
                <div className="absolute -top-12 left-4 bg-gray-100 px-3 py-1 rounded-lg text-xs flex items-center gap-2 shadow-sm border border-gray-200">
                    <span className="truncate max-w-[150px]">{attachedFile.name}</span>
                    <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <X size={14} />
                    </button>
                </div>
            )}

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-50 bg-gray-100" // Added bg-gray-100 here to make it visible
                    title="Attach Resume"
                >
                    <Paperclip size={20} />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                />

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 border-0 focus:ring-2 focus:ring-accent/20 rounded-full px-4 py-2 text-sm outline-none text-gray-700 placeholder-gray-400"
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading || (!text.trim() && !attachedFile)}
                    className={`p-2 rounded-full transition-all duration-200 ${text.trim() || attachedFile
                            ? 'bg-accent text-white shadow-md hover:bg-accent-hover transform hover:scale-105'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <Send size={18} />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
