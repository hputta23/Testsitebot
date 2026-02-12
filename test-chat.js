import { GoogleGenerativeAI } from '@google/generative-ai';

async function testChat() {
    const apiKey = 'AIzaSyBFJ-BRXQZlG_9l9S1WkarJ1cTZ6N2ECU4';

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Simulate API chat logic
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "System Prompt: Be a professional recruiter." }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready." }]
                },
            ],
        });

        console.log("Sending: 'My name is Harsha'");
        const result = await chat.sendMessage("My name is Harsha");
        const response = await result.response;
        console.log("Success! Response:", response.text());
    } catch (error) {
        console.error("Error:", error);
    }
}

testChat();
