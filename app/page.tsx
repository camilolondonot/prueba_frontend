'use client';

import { useState } from 'react';
import Footer from './components/layout/Footer';
import { CardAgentIa } from './components/cards';
import { Button } from './components/ui';
import { ModalNewEgent, ModalConfirmation, ModalResult } from './components/Modals';
import { useAgentStore } from './store/agentStore';
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<{ id: string; name: string } | null>(null);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [resultType, setResultType] = useState<'success' | 'error'>('success');
  const [resultMessage, setResultMessage] = useState('');

  const agents = useAgentStore((state) => state.agents);
  const deleteAgent = useAgentStore((state) => state.deleteAgent);
  const resetForm = useAgentStore((state) => state.resetForm);

  const handleOpenModal = () => {
    setEditingAgentId(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAgentId(null);
    resetForm();
  };

  const handleAgentSuccess = (type: 'success' | 'error', message: string) => {
    setResultType(type);
    setResultMessage(message);
    setIsResultOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditingAgentId(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (agent) {
      setAgentToDelete({ id, name: agent.nombre });
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (agentToDelete) {
      try {
        deleteAgent(agentToDelete.id);
        setResultType('success');
        setResultMessage(`El asistente "${agentToDelete.name}" ha sido eliminado exitosamente.`);
        setIsConfirmationOpen(false);
        setIsResultOpen(true);
        setAgentToDelete(null);
      } catch (error) {
        setResultType('error');
        setResultMessage('Ocurrió un error al eliminar el asistente. Por favor, intenta nuevamente.');
        setIsConfirmationOpen(false);
        setIsResultOpen(true);
      }
    }
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
    setAgentToDelete(null);
  };

  const handleCloseResult = () => {
    setIsResultOpen(false);
    setResultType('success');
    setResultMessage('');
  };

  // Mapear los agentes del store al formato que espera CardAgentIa
  const mappedAgents = agents.map((agent) => ({
    id: agent.id,
    titulo: agent.nombre,
    language: agent.idioma,
    type: agent.tono,
    short: agent.short,
    medium: agent.medium,
    long: agent.long,
  }));

  return (
    <div className="min-h-screen">
      <div className="mx-auto py-8">
        <div className="flex my-8 items-center">
          <h2 className="text-4xl pointer-events-none font-bold mb-4 text-start flex-1">Asistentes IA</h2>
          <Button buttonProps={{
            children: 'Agregar Asistente',
            type: 'button',
            className: 'btn-primary',
            disabled: false,
            loading: false,
            icon: <FiPlus className="w-4 h-4" />,
            iconPosition: 'left',
            iconSize: 16,
            onClick: handleOpenModal,
          }}>
          </Button>
        </div>
        {/* Grid de elementos */}
        <div className="flex flex-col gap-4">
          {mappedAgents.length > 0 ? (
            mappedAgents.map((agent) => (
              <CardAgentIa 
                key={agent.id} 
                agentData={agent}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="text-center py-12 text-base-content opacity-50 pointer-events-none">
              <p>No hay asistentes creados aún. ¡Crea tu primer asistente!</p>
            </div>
          )}
        </div>

        {mappedAgents.length > 0 && <Footer total={mappedAgents.length} />}
      </div>

      {/* Modal para crear/editar agente */}
      <ModalNewEgent 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSuccess={handleAgentSuccess}
        agentId={editingAgentId} 
      />

      {/* Modal de confirmación de eliminación */}
      <ModalConfirmation
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmDelete}
        agentName={agentToDelete?.name}
      />

      {/* Modal de resultado */}
      <ModalResult
        isOpen={isResultOpen}
        onClose={handleCloseResult}
        type={resultType}
        message={resultMessage}
      />
    </div>
  );
}
