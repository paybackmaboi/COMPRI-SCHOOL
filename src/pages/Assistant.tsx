import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send,
  Bot,
  User,
  Lightbulb,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your System Monitor AI Assistant. I can help you understand your system performance, provide solutions to detected issues, and answer questions about system optimization. How can I assist you today?",
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    "Why is my CPU usage high?",
    "How can I optimize memory usage?",
    "What network security measures should I take?",
    "How to improve system performance?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: messages.length + 2,
      type: 'assistant',
      content: getAIResponse(inputMessage),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newUserMessage, aiResponse]);
    setInputMessage('');
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('cpu') || lowerQuestion.includes('processor')) {
      return "Based on your system analysis, I've detected that Chrome.exe is consuming 23% of your CPU resources. Here are my recommendations: 1) Close unused browser tabs, 2) Check for Chrome extensions that might be resource-heavy, 3) Consider restarting Chrome if the issue persists. Your CPU temperature is currently optimal at 72°C.";
    }
    
    if (lowerQuestion.includes('memory') || lowerQuestion.includes('ram')) {
      return "I've identified a memory leak in your Node.js application which is causing increasing memory usage. Immediate solutions: 1) Restart the Node.js application to free up memory, 2) Monitor the application for recurring issues, 3) Consider updating to the latest version if available. Your system has 8.2GB of 16GB RAM available.";
    }
    
    if (lowerQuestion.includes('network') || lowerQuestion.includes('security')) {
      return "I've detected unusual outbound traffic to 192.168.1.1 which requires attention. Security recommendations: 1) Review active network connections, 2) Update firewall rules to block suspicious traffic, 3) Run a comprehensive security scan, 4) Monitor network activity for the next hour. Your antivirus definitions are up to date.";
    }
    
    if (lowerQuestion.includes('performance') || lowerQuestion.includes('optimize')) {
      return "To optimize your system performance: 1) Address the memory leak in Node.js (restart application), 2) Manage Chrome's resource usage (close unused tabs), 3) Monitor the unusual network activity, 4) Keep system temperature below 80°C. Overall system health is good with these minor optimizations needed.";
    }
    
    return "I understand your question about system monitoring. Based on current analysis, your system is performing well overall. I recommend focusing on the memory optimization and monitoring the detected network activity. Would you like me to provide specific steps for any particular area?";
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-muted-foreground">Get intelligent insights and solutions</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent/10 text-accent border border-accent/20'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <Card className={`p-4 ${
                    message.type === 'user' 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-gradient-to-br from-card to-card/50 border-border/50'
                  }`}>
                    <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">{message.timestamp}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <Card className="p-4 mb-4 bg-gradient-to-br from-card to-card/50 border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Suggested Questions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/20 transition-colors"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Input Area */}
          <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about system performance, security, or optimizations..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-accent" />
                AI-Powered Analysis
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-success" />
                Secure & Private
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                Real-time Insights
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Assistant;