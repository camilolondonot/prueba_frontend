'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAgentStore } from '@/app/store/agentStore';
import TrainingSection from '@/app/components/agent/TrainingSection';
import ChatSection from '@/app/components/agent/ChatSection';

export default function DetalleElemento({ params }: { params: Promise<{ id: string }> }) {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const agents = useAgentStore((state) => state.agents);

  useEffect(() => {
    setMounted(true);
    params.then(({ id }) => {
      setAgentId(id);
    });
  }, [params]);

  const agent = mounted && agentId ? agents.find((a) => a.id === agentId) : null;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Agente no encontrado</h1>
          <p className="text-custom-text mb-4">El agente que buscas no existe o ha sido eliminado.</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors bg-custom-primary text-white"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Botón de volver */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:gap-3 text-base-content mb-4"
        >
          <ArrowLeft className="w-4 h-4 text-base-content" />
          Volver a la lista
        </Link>

        {/* Header con información del agente */}
        <div className="bg-[#2D3249] rounded-xl p-6 shadow-none">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 font-figtree">DATOS DEL ASISTENTE</h1>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-custom-primary text-white">
              {agent.tono}
            </span>
            <span className="text-xs md:text-sm text-custom-text font-medium">
              {agent.nombre}
            </span>
            <span className="text-xs md:text-sm text-custom-text">
              {agent.idioma}
            </span>
            <span className="text-xs md:text-sm text-custom-text opacity-70">
              {new Date(agent.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Distribución de respuestas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-custom-primary bg-custom-primary-light">
              <div className="text-2xl font-bold mb-1 text-custom-primary">
                {agent.short}%
              </div>
              <div className="text-sm text-custom-text">
                Respuestas Cortas
              </div>
            </div>
            <div className="p-4 rounded-lg border border-custom-primary bg-custom-primary-light">
              <div className="text-2xl font-bold mb-1 text-custom-primary">
                {agent.medium}%
              </div>
              <div className="text-sm text-custom-text">
                Respuestas Medias
              </div>
            </div>
            <div className="p-4 rounded-lg border border-custom-primary bg-custom-primary-light">
              <div className="text-2xl font-bold mb-1 text-custom-primary">
                {agent.long}%
              </div>
              <div className="text-sm text-custom-text">
                Respuestas Largas
              </div>
            </div>
          </div>
        </div>

        {/* Layout de dos columnas: Entrenamiento (izquierda) y Chat (derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Panel izquierdo - Entrenamiento (2/3 del ancho) */}
          <div className="lg:col-span-2">
            <TrainingSection agentId={agentId!} />
          </div>

          {/* Panel derecho - Chat (1/3 del ancho) */}
          <div className="lg:col-span-1">
            <ChatSection agentId={agentId!} />
          </div>
        </div>
      </div>
    </div>
  );
}

