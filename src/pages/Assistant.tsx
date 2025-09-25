import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Send,
  Bot,
  User,
  Lightbulb,
  Zap,
  Shield,
  TrendingUp,
  Loader2,
  AlertCircle,
  Trash2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your System Monitor AI Assistant powered by Gemini AI. I can help you understand your system performance, provide solutions to detected issues, and answer questions about system optimization. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What devices are currently connected to my system?",
    "How can I optimize my system performance?",
    "What security measures should I implement?",
    "How do I monitor CPU and memory usage?",
    "What does the dashboard show me?",
    "How can I track system activity?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError('');

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages.map(msg => ({
        role: msg.type,
        content: msg.content
      }));

      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: conversationHistory
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        setError(data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError('Failed to connect to AI assistant. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: "Hello! I'm your System Monitor AI Assistant powered by Gemini AI. I can help you understand your system performance, provide solutions to detected issues, and answer questions about system optimization. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setError('');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
              <p className="text-muted-foreground">Powered by Gemini AI - Get intelligent insights and solutions</p>
            </div>
          </div>
          <Button 
            onClick={clearChat}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Chat
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent/10 text-accent border border-accent/20'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <Card className={`p-4 max-w-full ${
                    message.type === 'user' 
                      ? 'bg-primary/10 border-primary/20' 
                      : 'bg-gradient-to-br from-card to-card/50 border-border/50'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
                      {message.content}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{message.timestamp}</p>
                  </Card>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-4xl">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <Card className="p-4 bg-gradient-to-br from-card to-card/50 border-border/50">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
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
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/20 transition-colors text-xs"
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
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={!inputMessage.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-accent" />
                  Gemini AI Powered
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-green-600" />
                  Secure & Private
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  Real-time Insights
                </div>
              </div>
              <div className="text-xs">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Assistant;