'use client';

import { useEffect } from 'react';
import { Modal } from '../ui';
import { Button } from '../ui';
import { ModalConfirmationProps } from '@/app/types';

const ModalConfirmation = ({ 
  isOpen = false, 
  onClose, 
  onConfirm,
  title = 'Confirmar eliminación',
  message = '¿Estás seguro de que deseas eliminar este asistente?',
  agentName
}: ModalConfirmationProps) => {
  useEffect(() => {
    const modal = document.getElementById('modal_confirmation') as HTMLDialogElement;
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

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal 
      id="modal_confirmation"
      showCloseButton={true}
      onClose={onClose}
    >
      <h3 className="font-bold text-lg mb-4 font-figtree">{title}</h3>
      
      <div className="py-4">
        <p className="text-base-content mb-2">{message}</p>
        {agentName && (
          <p className="font-semibold text-custom-primary">{agentName}</p>
        )}
      </div>

      <div className="modal-action">
        <Button
          buttonProps={{
            children: 'Cancelar',
            type: 'button',
            className: 'btn-outline',
            onClick: onClose,
          }}
        />
        <Button
          buttonProps={{
            children: 'Eliminar',
            type: 'button',
            className: 'btn-error',
            onClick: handleConfirm,
          }}
        />
      </div>
    </Modal>
  );
};

export default ModalConfirmation;
