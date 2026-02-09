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

export const sendApplicationEmail = async (data: ApplicationData, _file: File | null) => {
    try {
        // file upload is tricky with free emailjs, usually requires converting to base64 
        // and using a specific template parameter. 
        // For now, we will just send the data fields.
        // Handling file attachments in free tier often requires EmailJS premium or passing a link.
        // We will try to pass it as a base64 string if small enough, otherwise warn.

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
            // If you set up a file attachment in EmailJS, you'd pass the content here.
            // verifying file size < 50kb for free tier usually.
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log('SUCCESS!', response.status, response.text);
        return { success: true };
    } catch (error) {
        console.error('FAILED...', error);
        return { success: false, error };
    }
};
