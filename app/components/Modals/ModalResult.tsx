'use client';

import { useEffect } from 'react';
import { Modal } from '../ui';
import { Button } from '../ui';
import { ModalResultProps } from '@/app/types';

const ModalResult = ({ 
  isOpen = false, 
  onClose,
  type = 'success',
  title,
  message
}: ModalResultProps) => {
  useEffect(() => {
    const modal = document.getElementById('modal_result') as HTMLDialogElement;
    if (modal) {
      if (isOpen) {
        modal.showModal();
      } else {
        modal.close();
      }

      const handleCloseEvent = () => {
        if (onClose) {
          onClose();
        }
      };

      modal.addEventListener('close', handleCloseEvent);
      return () => {
        modal.removeEventListener('close', handleCloseEvent);
      };
    }
  }, [isOpen, onClose]);

  const defaultTitle = type === 'success' 
    ? '¡Éxito!' 
    : 'Error';
  
  const defaultMessage = type === 'success'
    ? 'La operación se completó exitosamente.'
    : 'Ocurrió un error al realizar la operación.';

  return (
    <Modal 
      id="modal_result"
      showCloseButton={true}
      onClose={onClose}
    >
      <div className="flex flex-col items-center text-center">
        {type === 'success' ? (
          <svg 
            className="w-16 h-16 text-success mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        ) : (
          <svg 
            className="w-16 h-16 text-error mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}

        <h3 className={`font-bold text-lg mb-2 font-figtree ${type === 'success' ? 'text-success' : 'text-error'}`}>
          {title || defaultTitle}
        </h3>
        
        <p className="text-base-content mb-6">
          {message || defaultMessage}
        </p>

        <div className="modal-action w-full">
          <Button
            buttonProps={{
              children: 'Aceptar',
              type: 'button',
              className: type === 'success' ? 'btn-success w-full' : 'btn-error w-full',
              onClick: onClose,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalResult;
