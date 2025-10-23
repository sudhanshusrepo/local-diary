import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { CloseIcon } from './icons/CloseIcon';
import { Button } from './ui/Button';
import { callGemini } from '../../shared/services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await callGemini(`As an AI assistant for the 'local diary' app, answer the following user query: "${input}". Be helpful and concise. If asked about finding someone, suggest using the app's search feature.`);
      const aiMessage: Message = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Gemini API call failed:', error);
      const errorMessage: Message = { text: 'Sorry, I am having trouble connecting. Please try again later.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-brand-secondary to-brand-primary text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Open AI Assistant"
      >
        <SparklesIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-end sm:items-center">
          <div className="bg-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md h-4/5 flex flex-col mx-2 sm:mx-0">
            <header className="flex justify-between items-center p-4 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-6 h-6 text-brand-primary" />
                <h2 className="font-bold text-lg text-white">AI Assistant</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <CloseIcon className="w-6 h-6" />
              </button>
            </header>
            
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 ${msg.sender === 'user' ? 'bg-brand-secondary text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
               {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-xs md:max-w-sm rounded-2xl px-4 py-2 bg-slate-700 text-slate-200 rounded-bl-none">
                       <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                       </div>
                    </div>
                 </div>
               )}
              <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading}>
                  Send
                </Button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;