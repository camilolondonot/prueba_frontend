import { Agent } from '@/app/store/agentStore';

interface AgentInfoProps {
  agent: Agent;
}

const AgentInfo = ({ agent }: AgentInfoProps) => {
  return (
    <article className="bg-[#2D3249] rounded-xl p-8 shadow-none">
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

      {/* Configuración */}
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
    </article>
  );
};

export default AgentInfo;

