'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui';
import { ChatSectionProps, ChatMessage } from '@/app/types';
import { useAgentStore } from '@/app/store/agentStore';
import { getRandomResponse, getResponseType } from '@/app/data/mockResponses';

const ChatSection = ({ agentId }: ChatSectionProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const agents = useAgentStore((state) => state.agents);
  const agent = agents.find((a) => a.id === agentId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !agent) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de 1-2 segundos
    const delay = Math.random() * 1000 + 1000; // Entre 1000ms y 2000ms

    setTimeout(() => {
      const responseType = getResponseType(agent.short, agent.medium, agent.long);
      const responseContent = getRandomResponse(responseType);

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleReset = () => {
    setMessages([]);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-figtree">CHAT SIMULADO:</h2>
        {messages.length > 0 && (
          <Button
            buttonProps={{
              children: 'Reiniciar',
              type: 'button',
              className: 'btn-outline btn-sm',
              onClick: handleReset,
            }}
          />
        )}
      </div>

      <p className="text-xs text-custom-text mb-4 opacity-70">
        Las respuestas son completamente simuladas, se pueden obtener de un JSON, deben tener delay para simular el fetch de la data...
      </p>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-base-200 rounded-lg space-y-3 min-h-[250px] md:min-h-[300px]">
        {messages.length === 0 ? (
          <div className="text-center text-custom-text opacity-50 py-8">
            <p className="text-sm">Inicia una conversación con el asistente</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-2.5 ${
                  message.role === 'user'
                    ? 'bg-custom-primary text-white'
                    : 'bg-base-300 text-base-content'
                }`}
              >
                <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <span className="text-[10px] opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-base-300 rounded-lg p-2.5">
              <span className="loading loading-dots loading-xs"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de mensaje */}
      <div className="flex gap-2">
        <textarea
          className="textarea textarea-bordered flex-1 text-sm"
          placeholder="Escribe tu mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={2}
        />
        <Button
          buttonProps={{
            children: 'Enviar',
            type: 'button',
            className: 'btn-primary btn-sm',
            onClick: handleSendMessage,
            disabled: !inputMessage.trim() || isTyping,
          }}
        />
      </div>
    </div>
  );
};

export default ChatSection;

