'use client';

import { Button } from '../../ui';
import { useAgentStore } from '@/app/store/agentStore';

interface StepTwoProps {
  onSuccess?: (type: 'success' | 'error', message: string) => void;
}

const StepTwo = ({ onSuccess }: StepTwoProps) => {
  const { formData, errors, updateFormData, clearErrors, setStep, addAgent, updateAgent, resetForm, setMessage, editingAgentId } = useAgentStore();

  const total = formData.short + formData.medium + formData.long;
  const isTotalValid = total === 100;
  const isFormValid = isTotalValid;

  const handleLengthChange = (type: 'short' | 'medium' | 'long', value: number) => {
    const numValue = Math.max(0, Math.min(100, value));
    
    // Calcular el nuevo total
    const currentTotal = formData.short + formData.medium + formData.long;
    const currentValue = formData[type];
    const newTotal = currentTotal - currentValue + numValue;
    
    // Si el nuevo total supera 100, ajustar el valor
    if (newTotal > 100) {
      const maxAllowed = 100 - (currentTotal - currentValue);
      updateFormData({ [type]: Math.min(numValue, maxAllowed) });
    } else {
      updateFormData({ [type]: numValue });
    }
    
    // Limpiar error de longitudes cuando el usuario cambie los valores
    if (errors.longitudes) {
      clearErrors();
    }
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (total !== 100) {
      newErrors.longitudes = `La suma debe ser 100%. Actual: ${total}%`;
    }

    if (Object.keys(newErrors).length > 0) {
      useAgentStore.getState().setErrors(newErrors);
      return false;
    }

    clearErrors();
    return true;
  };

  const handleBack = () => {
    setStep(1);
    clearErrors();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      const agentData = {
        nombre: formData.nombre,
        idioma: formData.idioma,
        tono: formData.tono,
        short: formData.short,
        medium: formData.medium,
        long: formData.long,
        audioEnabled: formData.audioEnabled,
      };

      try {
        if (editingAgentId) {
          // Modo edición
          updateAgent(editingAgentId, agentData);
          const successMessage = 'Agente actualizado exitosamente!';
          setMessage('success', successMessage);
          
          // Cerrar el modal de creación/edición
          const modal = document.getElementById('modal_new_agent') as HTMLDialogElement;
          if (modal) {
            modal.close();
          }
          
          // Mostrar modal de resultado
          if (onSuccess) {
            setTimeout(() => {
              onSuccess('success', successMessage);
            }, 300);
          }
        } else {
          // Modo creación
          addAgent(agentData);
          const successMessage = 'Agente creado exitosamente!';
          setMessage('success', successMessage);
          
          // Cerrar el modal de creación/edición
          const modal = document.getElementById('modal_new_agent') as HTMLDialogElement;
          if (modal) {
            modal.close();
          }
          
          // Mostrar modal de resultado
          if (onSuccess) {
            setTimeout(() => {
              onSuccess('success', successMessage);
            }, 300);
          }
        }
        
        resetForm();
      } catch (error) {
        const errorMessage = 'Ocurrió un error al guardar el agente. Por favor, intenta nuevamente.';
        setMessage('error', errorMessage);
        
        // Mostrar modal de resultado con error
        if (onSuccess) {
          setTimeout(() => {
            onSuccess('error', errorMessage);
          }, 300);
        }
      }
    } else {
      setMessage('error', 'Por favor, corrige los errores antes de guardar.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">
            Longitud de respuestas <span className="text-error">*</span>
          </span>
          <span className="label-text-alt">
            Total:{' '}
            <span className={`font-bold ${isTotalValid ? 'text-success' : 'text-error'}`}>
              {total}%
            </span>
          </span>
        </label>

        <div className="space-y-3 mt-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Cortas</label>
              <span className="text-sm font-medium">{formData.short}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.short}
              onChange={(e) => handleLengthChange('short', parseInt(e.target.value))}
              className="range range-primary"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={formData.short}
              onChange={(e) => handleLengthChange('short', parseInt(e.target.value) || 0)}
              className="input input-bordered input-sm w-20 mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Medias</label>
              <span className="text-sm font-medium">{formData.medium}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.medium}
              onChange={(e) => handleLengthChange('medium', parseInt(e.target.value))}
              className="range range-primary"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={formData.medium}
              onChange={(e) => handleLengthChange('medium', parseInt(e.target.value) || 0)}
              className="input input-bordered input-sm w-20 mt-2"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Largas</label>
              <span className="text-sm font-medium">{formData.long}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.long}
              onChange={(e) => handleLengthChange('long', parseInt(e.target.value))}
              className="range range-primary"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={formData.long}
              onChange={(e) => handleLengthChange('long', parseInt(e.target.value) || 0)}
              className="input input-bordered input-sm w-20 mt-2"
            />
          </div>
        </div>

        {errors.longitudes && (
          <label className="label">
            <span className="label-text-alt text-error text-xs">{errors.longitudes}</span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={formData.audioEnabled}
            onChange={(e) => updateFormData({ audioEnabled: e.target.checked })}
          />
          <span className="label-text font-medium">Habilitar respuestas de audio</span>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          buttonProps={{
            children: 'Atrás',
            type: 'button',
            className: 'btn-outline',
            onClick: handleBack,
          }}
        />
        <Button
          buttonProps={{
            children: 'Guardar',
            type: 'submit',
            className: 'btn-primary',
            disabled: !isFormValid,
          }}
        />
      </div>
    </form>
  );
};

export default StepTwo;

