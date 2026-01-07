import React from 'react';
import { StepIndicatorProps } from '@/app/types';

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`text-center direction-column items-center gap-2 ${currentStep >= step.number ? 'text-custom-primary' : 'text-base-content opacity-50'}`}>
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${currentStep >= step.number ? 'bg-custom-primary text-white' : 'bg-base-300'}`}>
              {step.number}
            </div>
            <div className="font-medium text-xs ">{step.title}</div>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-base-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;

