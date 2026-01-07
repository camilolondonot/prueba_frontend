'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useAgentStore } from '@/app/store/agentStore';

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
      <div className="max-w-4xl mx-auto">
          {/* Botón de volver */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:gap-3 text-base-content"
          >
            <ArrowLeft className="w-4 h-4 text-base-content" />
            Volver a la lista
          </Link>

          {/* Contenido principal */}
          <article className="bg-base-100 rounded-xl p-8 shadow-lg border border-base-300">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-custom-primary text-white">
                  {agent.tono}
                </span>
                <span className="text-sm text-custom-text">
                  {new Date(agent.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 font-figtree">
                {agent.nombre}
              </h1>
              
              <p className="text-lg leading-relaxed text-custom-text">
                Agente de IA configurado con idioma {agent.idioma} y tono {agent.tono}
              </p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

            {/* Contenido detallado */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4 font-figtree">
                Configuración
              </h2>
              <div className="space-y-2 leading-relaxed text-custom-text">
                <p><strong>Idioma:</strong> {agent.idioma}</p>
                <p><strong>Tono:</strong> {agent.tono}</p>
                <p><strong>Audio habilitado:</strong> {agent.audioEnabled ? 'Sí' : 'No'}</p>
                <p><strong>Distribución de respuestas:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Cortas: {agent.short}%</li>
                  <li>Medias: {agent.medium}%</li>
                  <li>Largas: {agent.long}%</li>
                </ul>
              </div>
            </div>

            {/* Acciones */}
            <div className="mt-8 pt-8 border-t border-base-300 flex gap-4">
              <button className="px-6 py-3 rounded-lg font-semibold transition-colors bg-custom-accent text-white">
                Usar este agente
              </button>
              <button className="px-6 py-3 rounded-lg font-semibold transition-colors border-2 border-custom-secondary text-custom-secondary">
                Personalizar
              </button>
            </div>
          </article>
      </div>
    </div>
  );
}

