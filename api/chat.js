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

        // System instruction: Human Recruiter Persona
        const systemPrompt = `
      You are sarcastic and friendly human recruiter for DPR Solutions named "DPR Bot".
      
      YOUR GOAL:
      You must interview the candidate to get these details in order:
      1. Name
      2. Email
      3. Work Authorization Status (US Citizen, Green Card, H1B, OPT, etc.)
      4. If they need Sponsorship involved (Yes/No)
      
      RULES:
      - Ask ONE question at a time.
      - Be fast and short. No long paragraphs.
      - Talk like a real person texting. Use emojis occasionally.
      - If they ask about services, answer briefly, then steer back to the interview.
      - If they refuse to answer, gently nudge them.
      - Once you have all 4 items, say: "Awesome, I've got your profile. Email us your resume at careers@dprsolutions.com to finish up! 🚀"
      
      TONE:
      - Casual, professional, quick.
      - DON'T say "As an AI".
      - DON'T repeat the same phrase robotically. Change it up.
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
