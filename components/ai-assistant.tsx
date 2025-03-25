"use client";

import { useState, useEffect } from "react";

const AssistantComponent = () => {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    timestamp: string;
  }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMessages([
      { id: 1, text: "Hello! I'm your travel assistant. How can I help with your travel plans today?", timestamp: new Date().toISOString() },
    ]);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    if (!isClient) return "...";
    const date = new Date(timestamp);
    // Use UTC to avoid locale differences
    return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    // Consistent date format (YYYY-MM-DD)
    return `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
  };

  const fetchAIResponse = async (userMessage: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("API key is missing!");
      return "Error: API key not configured";
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }]
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData.error?.message || "Unknown API error");
      }

      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
    } catch (error) {
      console.error("Fetch Error:", error);
      return `Error: ${error instanceof Error ? error.message : "Failed to get response"}`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const travelKeywords = [
      'travel', 'trip', 'vacation', 'flight', 'hotel', 
      'destination', 'itinerary', 'visa', 'passport',
      'packing', 'suitcase', 'luggage', 'airport',
      'train', 'bus', 'transport', 'tour', 'guide',
      'culture', 'country', 'city', 'beach', 'mountain'
    ];

    const isTravelQuestion = travelKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    );

    if (!isTravelQuestion) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "I specialize in travel-related questions only. Please ask me about destinations, flights, hotels, or other travel topics.",
        timestamp: new Date().toISOString(),
      }]);
      setInput("");
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiReply = await fetchAIResponse(input);
      setMessages(prev => [...prev, {
        id: userMessage.id + 1,
        text: aiReply,
        timestamp: new Date().toISOString(),
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: userMessage.id + 1,
        text: "Error: Failed to get AI response. Please try again later.",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="mx-auto p-4 rounded-xl bg-card border border-border shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-primary animate-pulse-opacity' : 'bg-emerald-500'}`}></div>
          <h3 className="text-lg font-semibold text-foreground bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
            Travel Assistant
          </h3>
        </div>
        {isClient && (
          <div className="text-xs text-muted-foreground">
            {formatDate(new Date())}
          </div>
        )}
      </div>
      
      <div className="mb-4 h-80 overflow-y-auto pr-2 scrollbar-thin">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-3 p-3 rounded-lg max-w-[85%] relative ${msg.id % 2 === 0 
              ? 'ml-auto bg-primary text-primary-foreground before:absolute before:-right-1 before:top-3 before:w-2 before:h-2 before:rotate-45 before:bg-primary'
              : 'mr-auto bg-popover border border-border before:absolute before:-left-1 before:top-3 before:w-2 before:h-2 before:rotate-45 before:bg-popover before:border-l before:border-b before:border-border'}`}
          >
            <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
            <p className={`text-xs mt-1 ${msg.id % 2 === 0 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
              {formatTimestamp(msg.timestamp)}
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto bg-popover border border-border p-3 rounded-lg max-w-[85%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 bg-background p-2 rounded-lg border border-border shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 focus:outline-none text-sm bg-background text-foreground placeholder:text-muted-foreground"
          placeholder="Ask about travel..."
          disabled={!isClient || isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || !isClient || isLoading}
          className="p-2 rounded-lg bg-gradient-to-r from-primary to-emerald-500 text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transform transition-transform hover:translate-x-0.5"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AssistantComponent;