'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui';
import { TrainingSectionProps } from '@/app/types';
import { useAgentStore } from '@/app/store/agentStore';

const TrainingSection = ({ agentId }: TrainingSectionProps) => {
  const [prompts, setPrompts] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });
  const { agents, updateAgent } = useAgentStore();

  useEffect(() => {
    // Cargar prompts desde el agente en el store o localStorage
    const agent = agents.find((a) => a.id === agentId);
    if (agent && agent.rules) {
      setPrompts(agent.rules);
      // Sincronizar con localStorage también
      localStorage.setItem(`training_${agentId}`, agent.rules);
    } else {
      // Si no hay en el store, intentar cargar desde localStorage
      const savedPrompts = localStorage.getItem(`training_${agentId}`);
      if (savedPrompts) {
        setPrompts(savedPrompts);
      }
    }
  }, [agentId, agents]);

  const handleSave = () => {
    if (prompts.trim()) {
      // Guardar en localStorage
      localStorage.setItem(`training_${agentId}`, prompts);
      
      // Actualizar el agente en el store con las rules
      const agent = agents.find((a) => a.id === agentId);
      if (agent) {
        updateAgent(agentId, {
          name: agent.name,
          language: agent.language,
          tone: agent.tone,
          responseLength: agent.responseLength,
          audioEnabled: agent.audioEnabled,
          rules: prompts,
        });
      }
      
      setMessage({ type: 'success', text: 'Entrenamiento guardado exitosamente!' });
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setMessage({ type: null, text: '' });
      }, 3000);
    } else {
      setMessage({ type: 'error', text: 'Por favor, ingresa al menos un prompt.' });
      setTimeout(() => {
        setMessage({ type: null, text: '' });
      }, 3000);
    }
  };

  return (
    <div className="bg-[#2D3249] rounded-xl p-6 shadow-none h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 font-figtree">Entrenamiento del asistente:</h2>
      
      {message.type && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
          <span>{message.text}</span>
        </div>
      )}

      <div className="form-control w-full flex-1 flex flex-col">
        <textarea
          id="prompts"
          className="textarea textarea-bordered w-full flex-1 min-h-[300px] md:min-h-[400px] resize-none"
          placeholder="Ingresa los prompts e instrucciones para entrenar al asistente..."
          value={prompts}
          onChange={(e) => setPrompts(e.target.value)}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          buttonProps={{
            children: 'GUARDAR',
            type: 'button',
            className: 'btn-primary',
            onClick: handleSave,
          }}
        />
      </div>
    </div>
  );
};

export default TrainingSection;

