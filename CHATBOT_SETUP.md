# 🤖 System Monitor AI Chatbot Setup Guide

## Overview
Your System Monitor AI now includes a fully functional chatbot powered by Google's Gemini AI! The assistant can help users understand system monitoring features, provide technical support, and answer questions about the dashboard.

## 🚀 Quick Start

### Option 1: Automatic Setup (Windows)
1. Double-click `start-chatbot.bat`
2. Wait for dependencies to install
3. Both backend and frontend will start automatically

### Option 2: Manual Setup
1. **Install Backend Dependencies:**
   ```bash
   npm install @google/generative-ai express cors dotenv concurrently
   ```

2. **Start Both Services:**
   ```bash
   npm run dev:full
   ```

3. **Or Start Separately:**
   ```bash
   # Terminal 1 - Backend Server
   npm run server
   
   # Terminal 2 - Frontend
   npm run dev
   ```

## 🎯 Features

### ✅ **AI-Powered Chat Interface**
- **Gemini AI Integration**: Uses your provided API key for intelligent responses
- **System Context**: AI understands System Monitor AI features and capabilities
- **Conversation Memory**: Maintains chat history for context-aware responses
- **Real-time Responses**: Live chat with loading indicators

### ✅ **Professional UI/UX**
- **Modern Chat Interface**: Clean, responsive design with message bubbles
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Clear error messages with troubleshooting tips
- **Suggested Questions**: Quick-start prompts for new users
- **Clear Chat**: Reset conversation functionality

### ✅ **Smart System Instructions**
The AI is programmed with specific knowledge about:
- Dashboard functionality and metrics
- Device monitoring and management
- System performance optimization
- Security recommendations
- Activity tracking features
- Account management

## 🔧 Technical Implementation

### Backend Server (`server.js`)
- **Express.js Server**: Runs on port 5000
- **Gemini API Integration**: Direct connection to Google's Gemini AI
- **CORS Enabled**: Allows frontend communication
- **System Instructions**: JSON-structured prompts for AI behavior
- **Error Handling**: Comprehensive error management

### Frontend Integration (`src/pages/Assistant.tsx`)
- **Real-time Chat**: Async/await API calls to backend
- **Message Management**: State management for conversation history
- **UI Components**: Professional chat interface with animations
- **Loading States**: Visual feedback during AI processing

### API Endpoints
- `POST /api/chat` - Send messages to AI assistant
- `GET /api/health` - Server health check

## 🎨 Chat Interface Features

### **Message Display**
- **User Messages**: Right-aligned with primary color
- **AI Responses**: Left-aligned with gradient styling
- **Timestamps**: Each message shows time sent
- **Auto-scroll**: Automatically scrolls to latest messages

### **Input Controls**
- **Text Input**: Multi-line support with Shift+Enter
- **Send Button**: Disabled when loading or empty
- **Loading Animation**: Spinner during AI processing
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

### **Suggested Questions**
- "What devices are currently connected to my system?"
- "How can I optimize my system performance?"
- "What security measures should I implement?"
- "How do I monitor CPU and memory usage?"
- "What does the dashboard show me?"
- "How can I track system activity?"

## 🛡️ Security & Privacy

- **API Key**: Securely stored in backend only
- **No Data Storage**: Conversations are not permanently stored
- **CORS Protection**: Restricted to frontend origin
- **Input Validation**: Server-side message validation

## 🔍 Troubleshooting

### **Common Issues:**

1. **"Failed to connect to AI assistant"**
   - Ensure backend server is running (`npm run server`)
   - Check if port 5000 is available
   - Verify internet connection for Gemini API

2. **"API key invalid"**
   - Confirm your Gemini API key is correct
   - Check if API key has proper permissions
   - Verify API key is not expired

3. **Frontend not loading**
   - Run `npm run dev` in separate terminal
   - Check if port 3000 is available
   - Clear browser cache

### **Development Commands:**
```bash
# Install all dependencies
npm install

# Start backend only
npm run server

# Start frontend only  
npm run dev

# Start both simultaneously
npm run dev:full

# Check server health
curl http://localhost:5000/api/health
```

## 📱 Usage

1. **Access Chat**: Navigate to Assistant page in the app
2. **Start Chatting**: Type your question or click suggested prompts
3. **Ask About System**: The AI understands your dashboard and monitoring features
4. **Get Help**: Ask about optimization, security, or device management
5. **Clear Chat**: Use "Clear Chat" button to reset conversation

## 🎉 Ready to Use!

Your System Monitor AI now has a fully functional, professional chatbot that can:
- ✅ Answer questions about system monitoring
- ✅ Provide technical support and guidance  
- ✅ Help users navigate dashboard features
- ✅ Offer optimization recommendations
- ✅ Explain security measures
- ✅ Assist with device management

**The chatbot is now live and ready to help your users!** 🚀
