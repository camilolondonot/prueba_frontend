'use client';
import { useEffect } from 'react';
import { Modal } from '../ui';
import FormNewAgent from '../Forms/FormNewAgent';
import { ModalNewAgentProps } from '@/app/types';

const ModalNewAgent = ({ isOpen = false, onClose }: ModalNewAgentProps) => {
  useEffect(() => {
    const modal = document.getElementById('modal_new_agent') as HTMLDialogElement;
    if (modal) {
      if (isOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isOpen]);

  // Escuchar el evento 'close' del dialog para sincronizar el estado cuando se cierra con ESC
  useEffect(() => {
    const modal = document.getElementById('modal_new_agent') as HTMLDialogElement;
    
    const handleClose = () => {
      // Cuando el modal se cierra (por ESC, backdrop click, etc.), sincronizamos el estado
      if (onClose) {
        onClose();
      }
    };

    if (modal) {
      modal.addEventListener('close', handleClose);
      return () => {
        modal.removeEventListener('close', handleClose);
      };
    }
  }, [onClose]);

  return (
    <Modal 
      id="modal_new_agent"
      showCloseButton={true}
      onClose={onClose}
    >
      <h3 className="font-bold text-lg mb-4 font-figtree">Crear Nuevo Agente</h3>
      <FormNewAgent />
    </Modal>
  );
};

export default ModalNewAgent;