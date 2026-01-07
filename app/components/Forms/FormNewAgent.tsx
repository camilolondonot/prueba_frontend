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

const FormNewAgent = () => {
  const { currentStep, message, setMessage } = useAgentStore();

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
      {currentStep === 2 && <StepTwo />}
    </div>
  );
};

export default FormNewAgent;;