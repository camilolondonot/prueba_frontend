'use client';

import { Button } from '../../ui';
import { useAgentStore } from '@/app/store/agentStore';

const StepOne = () => {
  const { formData, errors, updateFormData, clearErrors, setStep } = useAgentStore();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    updateFormData({ [field]: value });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      clearErrors();
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre || formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.idioma) {
      newErrors.idioma = 'Debes seleccionar un idioma';
    }

    if (!formData.tono) {
      newErrors.tono = 'Debes seleccionar un tono';
    }

    if (Object.keys(newErrors).length > 0) {
      useAgentStore.getState().setErrors(newErrors);
      return false;
    }

    clearErrors();
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  return (
    <div className="space-y-4">
      <div className="form-control w-full">
        <label className="label" htmlFor="nombre">
          <span className="label-text font-medium">
            Nombre del asistente <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="text"
          id="nombre"
          className={`input input-bordered w-full ${errors.nombre ? 'input-error' : ''}`}
          value={formData.nombre}
          onChange={(e) => handleInputChange('nombre', e.target.value)}
          placeholder="Ingresa el nombre del asistente"
        />
        {errors.nombre && (
          <label className="label">
            <span className="label-text-alt text-error text-xs">{errors.nombre}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label" htmlFor="idioma">
          <span className="label-text font-medium">
            Idioma <span className="text-error">*</span>
          </span>
        </label>
        <select
          id="idioma"
          className={`select select-bordered w-full ${errors.idioma ? 'select-error' : ''}`}
          value={formData.idioma}
          onChange={(e) => handleInputChange('idioma', e.target.value)}
        >
          <option value="">Selecciona un idioma</option>
          <option value="español">Español</option>
          <option value="inglés">Inglés</option>
          <option value="portugués">Portugués</option>
        </select>
        {errors.idioma && (
          <label className="label">
            <span className="label-text-alt text-error text-xs">{errors.idioma}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label" htmlFor="tono">
          <span className="label-text font-medium">
            Tono <span className="text-error">*</span>
          </span>
        </label>
        <select
          id="tono"
          className={`select select-bordered w-full ${errors.tono ? 'select-error' : ''}`}
          value={formData.tono}
          onChange={(e) => handleInputChange('tono', e.target.value)}
        >
          <option value="">Selecciona un tono</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="profesional">Profesional</option>
          <option value="amigable">Amigable</option>
        </select>
        {errors.tono && (
          <label className="label">
            <span className="label-text-alt text-error text-xs">{errors.tono}</span>
          </label>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button
          buttonProps={{
            children: 'Siguiente',
            type: 'button',
            className: 'btn-primary',
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default StepOne;

