import emailjs from '@emailjs/browser';

// REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_zt60q6q';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_oxl0ipj';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Tv1NEVUXCk2dZp_Qa';

interface ApplicationData {
    name: string;
    role: string; // Keeping for compatibility, though we might not explicitly ask for it anymore
    email: string;
    helpContext: string;
    authCheck: string;
    sponsorship: string;
    visaStatus?: string;
    visaExpiry?: string;
    stemOpt?: string;
    relocation?: string;
}

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export const sendApplicationEmail = async (data: ApplicationData, file: File | null, chatHistory: any[]) => {
    try {
        let fileData = null;
        if (file) {
            if (file.size > 50000) { // 50KB limit warning for free tier, though some plans allow more
                console.warn("File size > 50KB. Attachment might fail on free EmailJS tier.");
            }
            try {
                fileData = await fileToBase64(file);
            } catch (e) {
                console.error("Error converting file", e);
            }
        }

        // Format Chat Transcript
        const formattedChat = chatHistory.map(msg =>
            `[${msg.sender === 'bot' ? 'Bot' : 'User'}]: ${msg.text} ${msg.isFile ? '(File Uploaded)' : ''}`
        ).join('\n');

        const templateParams = {
            to_name: 'HR Team',
            from_name: data.name,
            from_email: data.email,
            message: `
                New Application/Inquiry Received:
                
                Name: ${data.name}
                Email: ${data.email}
                Context: ${data.helpContext}
                
                -- Work Authorization --
                Authorized in US: ${data.authCheck}
                Requires Sponsorship: ${data.sponsorship}
                ${data.sponsorship.toLowerCase().includes('yes') ? `
                Visa Status: ${data.visaStatus}
                Visa Expiry: ${data.visaExpiry}
                STEM OPT Eligible: ${data.stemOpt}
                Relocation Needed: ${data.relocation}
                ` : ''}
            `,
            chat_transcript: formattedChat,
            my_file: fileData, // Matches {{my_file}} in EmailJS template for attachment
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log('SUCCESS!', response.status, response.text);
        return { success: true };
    } catch (error) {
        console.error('FAILED...', error);
        return { success: false, error };
    }
};
