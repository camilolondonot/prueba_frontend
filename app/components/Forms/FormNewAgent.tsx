'use client';

import { useEffect } from 'react';
import { useAgentStore } from '@/app/store/agentStore';
import StepIndicator from './steps/StepIndicator';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';

const steps = [
  { number: 1, title: 'Datos Básicos' },
  { number: 2, title: 'Configuración' },
];

interface FormNewAgentProps {
  agentId?: string | null;
  onSuccess?: (type: 'success' | 'error', message: string) => void;
}

const FormNewAgent = ({ agentId = null, onSuccess }: FormNewAgentProps) => {
  const { currentStep, message, setMessage, agents, loadAgentForEdit } = useAgentStore();

  // Cargar datos del agente si está en modo edición
  useEffect(() => {
    if (agentId) {
      const agent = agents.find((a) => a.id === agentId);
      if (agent) {
        loadAgentForEdit(agent);
      }
    }
    // No resetear automáticamente cuando no hay agentId para evitar conflictos
  }, [agentId]); // Solo dependemos de agentId para evitar loops

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage(null, '');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <div className="space-y-6">
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Mensaje de éxito/error */}
      {message.type && (
        <div
          className={`alert ${
            message.type === 'success' ? 'alert-success' : 'alert-error'
          }`}
        >
          <span>{message.text}</span>
        </div>
      )}

      {currentStep === 1 && <StepOne />}
      {currentStep === 2 && <StepTwo onSuccess={onSuccess} />}
    </div>
  );
};

export default FormNewAgent;;