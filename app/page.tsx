'use client';

import { useState } from 'react';
import Footer from './components/layout/Footer';
import { CardAgentIa } from './components/cards';
import { Button } from './components/ui';
import { ModalNewEgent } from './components/Modals';
import { useAgentStore } from './store/agentStore';
import { FiPlus } from "react-icons/fi";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const agents = useAgentStore((state) => state.agents);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Mapear los agentes del store al formato que espera CardAgentIa
  const mappedAgents = agents.map((agent) => ({
    id: agent.id,
    titulo: agent.nombre,
    language: agent.idioma,
    type: agent.tono,
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
              <CardAgentIa key={agent.id} agentData={agent} />
            ))
          ) : (
            <div className="text-center py-12 text-base-content opacity-50 pointer-events-none">
              <p>No hay asistentes creados aún. ¡Crea tu primer asistente!</p>
            </div>
          )}
        </div>

        {mappedAgents.length > 0 && <Footer total={mappedAgents.length} />}
      </div>

      {/* Modal para crear nuevo agente */}
      <ModalNewEgent isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
