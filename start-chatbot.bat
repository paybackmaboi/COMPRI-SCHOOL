@echo off
echo Starting System Monitor AI with Chatbot...
echo.

echo Installing backend dependencies...
npm install @google/generative-ai express cors dotenv concurrently

echo.
echo Starting backend server and frontend...
npm run dev:full

pause
