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
      { id: 1, text: "Hello! How can I help?", timestamp: new Date().toISOString() },
    ]);
  }, []);

  const formatTimestamp = (timestamp: string) => {
    if (!isClient) return "...";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
    <div className="p-4 rounded-lg bg-gray-100 w-[500px] max-w-full">
      <div className="mb-4 max-h-96 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2 p-2 rounded bg-white shadow">
            <p className="whitespace-pre-wrap">{msg.text}</p>
            <p className="text-xs mt-1 opacity-70">
              {formatTimestamp(msg.timestamp)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ask AI..."
          disabled={!isClient || isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || !isClient || isLoading}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default AssistantComponent;