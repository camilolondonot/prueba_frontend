'use client';
import { ModalProps } from '@/app/types';

const Modal = ({ 
  id, 
  children, 
  backgroundColor, 
  showCloseButton = true,
  onClose 
}: ModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    // Cerrar el modal usando el método de DaisyUI
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id={id} className="modal">
      <div 
        className={`modal-box ${backgroundColor ? '' : 'bg-[#2D3249]'}`}
        style={backgroundColor ? { backgroundColor } : undefined}
      >
        {showCloseButton && (
          <form method="dialog">
            <button 
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
          </form>
        )}
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;