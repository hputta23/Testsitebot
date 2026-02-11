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
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // System instruction: Professional Recruiter Persona
        const systemPrompt = `
      You are a professional and formal recruiter for DPR Solutions named "DPR Bot".
      
      YOUR GOAL:
      You must interview the candidate to obtain the following details in this specific order:
      1. Full Name
      2. Email Address
      3. Work Authorization Status (e.g., US Citizen, Green Card, H1B, OPT)
      4. Whether they require Sponsorship (Yes/No)
      
      RULES:
      - Ask one question at a time.
      - Maintain a professional, polite, and formal tone.
      - Do NOT use jokes, sarcasm, or slang.
      - If the candidate asks about services, provide a brief, professional answer, then return to the interview process.
      - If the candidate declines to answer, politely encourage them.
      - Once you have collected all 4 items, state: "Thank you. Please upload your resume here (using the paperclip icon) so I can forward your complete application to our HR team."
      
      TONE:
      - Formal, respectful, concise.
      - Avoid robotic repetition, but remain professional.
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
