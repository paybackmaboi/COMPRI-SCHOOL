import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


const genAI = new GoogleGenerativeAI('AIzaSyCSCkD4gSYLLgJZdSF0ndaU_j5BcW5yFac');

// System instructions for the AI assistant
const SYSTEM_INSTRUCTIONS = {
  role: "system",
  content: `You are an AI Assistant for the System Monitor AI application. Your role is to help users understand and navigate the system monitoring features.

SYSTEM CAPABILITIES:
- Dashboard: Real-time system monitoring with device detection, performance metrics, and status overview
- Activity: System activity logs, user interactions, and historical data tracking  
- Device Management: Connected device monitoring, device metrics, and device status tracking
- Account: User profile management, account settings, and authentication

RESPONSE GUIDELINES:
1. Be helpful and professional in all interactions
2. Focus on system monitoring, device management, and user assistance
3. Provide clear, concise explanations about system features
4. If asked about non-system topics, politely redirect to system-related questions
5. Use technical but accessible language
6. Always maintain a supportive and informative tone

SYSTEM DATA CONTEXT:
- Users can monitor multiple connected devices (mobile, laptop, desktop, tablet)
- Real-time metrics include CPU usage, memory, storage, network speed, and security status
- Device detection shows OS, browser, screen size, and online status
- Activity tracking monitors system performance and user interactions
- Account management allows profile updates and settings configuration

Remember: You are specifically designed to assist with System Monitor AI functionality. Keep responses relevant to system monitoring, device management, and user support.`
};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

  // Get the Gemini model
 const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a chat session with system instructions
    const chat = model.startChat({
      history: conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }))
    });

    // Send system instructions first, then the user message
    const systemPrompt = SYSTEM_INSTRUCTIONS.content + "\n\nUser message: " + message;
    
    // Send message to Gemini
    const result = await chat.sendMessage(systemPrompt);
    const response = await result.response;
    const aiResponse = response.text();

    // Return the response
    res.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat message',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'System Monitor AI Assistant API is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 System Monitor AI Assistant API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});

export default app;
