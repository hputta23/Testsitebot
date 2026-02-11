import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing API Key' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // System instruction to define the bot's persona
        const systemPrompt = `
      You are the friendly and professional AI Recruiting Assistant for DPR Solutions Inc.
      Your goal is to help candidates and clients understand our services and encourage them to apply or contact us.
      
      Company Info:
      - Name: DPR Solutions Inc.
      - Focus: IT Solutions, Digital Transformation, ServiceNow, Appian, Cloud Migration, Cybersecurity, Data Analytics.
      - Vibe: Professional, innovative, helpful.

      Rules:
      1. Be concise and engaging.
      2. If asked about applying, ask them to upload their resume or provide their email.
      3. Do not make up specific job openings if you don't know them; just welcome general applications.
      4. If user wants to get in touch, direct them to "careers@dprsolutions.com".
      5. Always be polite.
    `;

        // Construct the chat history for Gemini
        // Gemini 1.5 Flash uses 'user' and 'model' roles.
        // We need to convert our frontend 'user'/'bot' roles.
        const chatHistory = (history || []).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Start chat with system prompt context (simulated by prepending or using system instructions if available in standard API, 
        // but prepending user message is often easier for simple stateless calls).
        // Actually, gemini-1.5-flash supports system instructions in the startChat, but for Vercel stateless functions, 
        // it's often easier to just use generateContent with the full history + prompt if state isn't persisted.
        // But let's use startChat for better context handling if we pass history.

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist as the DPR Recruiting Assistant." }]
                },
                ...chatHistory
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error('Error calling Gemini:', error);
        return res.status(500).json({ error: 'Failed to generate response' });
    }
}
