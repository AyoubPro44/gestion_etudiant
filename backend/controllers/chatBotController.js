const { GoogleGenerativeAI } = require("@google/generative-ai");

class ChatBotController {
    async getReponse(req, res) {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyBCWKkUgnqxTWM5QAjSfTXNEfoHym5UsZ8");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "write me code with html and css to center a div"

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return res.status(200).json({ response: text })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new ChatBotController();
