import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import SourceDocuments from './SourceDocuments';
import DocumentUpload from './DocumentUpload';
import { sendMessage, uploadDocument } from '../api';
import { FiSend } from 'react-icons/fi';

const ChatInterface = ({ isSidebarOpen }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [currentSources, setCurrentSources] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(input);
      const botMessage = { 
        role: 'assistant', 
        content: response.answer,
        sources: response.sources
      };
      setMessages(prev => [...prev, botMessage]);
      setCurrentSources(response.sources);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      const response = await uploadDocument(file);
      if (response.success) {
        const systemMessage = {
          role: 'system',
          content: `Document "${file.name}" processed successfully!`
        };
        setMessages(prev => [...prev, systemMessage]);
        return response.preview;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      const errorMessage = {
        role: 'system',
        content: `Error processing document: ${error.message}`
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    return null;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] w-full mx-auto relative">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/30">
        <h1 className="text-2xl font-bold text-accent">Document Analysis</h1>
        <DocumentUpload onUpload={handleFileUpload} />
      </div>
      
      <div className="flex-1 overflow-y-auto mb-24 p-4 bg-chatBg/90 rounded-xl border border-border/30 shadow-lg relative z-10 hide-scrollbar">
        {messages.map((message, index) => (
          <Message 
            key={index} 
            role={message.role} 
            content={message.content} 
          />
        ))}
        {isLoading && (
          <Message 
            role="assistant" 
            content={
              <div className="text-accent animate-pulse">
                Analyzing documents<span>.</span><span>.</span><span>.</span>
              </div>
            } 
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-background via-background to-transparent">
        <form 
          onSubmit={handleSendMessage} 
          className="max-w-[1600px] mx-auto flex gap-3 p-4 bg-chatBg/90 rounded-xl border border-border/30 shadow-lg backdrop-blur-lg"
          style={{
            marginLeft: isSidebarOpen ? '288px' : '0',
            marginRight: '16px',
            transition: 'margin 0.3s',
            '@media (max-width: 1024px)': {
              marginLeft: '16px',
            },
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about agriculture documents..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-background/50 text-text rounded-lg border border-border/30 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium transition-all hover:bg-primary hover:-translate-y-0.5 hover:shadow-glow disabled:bg-border/50 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FiSend />
            Send
          </button>
        </form>
      </div>
      
      {currentSources.length > 0 && (
        <SourceDocuments 
          sources={currentSources} 
          isVisible={showSources} 
          toggleVisibility={() => setShowSources(!showSources)} 
        />
      )}
    </div>
  );
};

export default ChatInterface;