import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGemini() {
    const apiKey = 'AIzaSyBFJ-BRXQZlG_9l9S1WkarJ1cTZ6N2ECU4';
    console.log("Testing Key:", apiKey);

    const genAI = new GoogleGenerativeAI(apiKey);

    // Trying 'gemini-2.0-flash-lite-001' which appeared in the list
    const modelsToTry = ["gemini-2.0-flash-lite-001", "gemini-flash-latest"];

    for (const modelName of modelsToTry) {
        console.log(`\n--- Testing model: ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you working?");
            const response = await result.response;
            console.log(`SUCCESS with ${modelName}! Response:`, response.text());
            return;
        } catch (error) {
            console.error(`FAILED with ${modelName}:`, error.message);
        }
    }
}

testGemini();
