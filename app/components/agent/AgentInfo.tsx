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
            {agent.tone}
          </span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 font-figtree">
          {agent.name}
        </h1>
        
        <p className="text-lg leading-relaxed text-custom-text">
          Agente de IA configurado con idioma {agent.language} y tono {agent.tone}
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-custom-primary bg-custom-primary-light">
          <div className="text-2xl font-bold mb-1 text-custom-primary">
            {agent.responseLength.short}%
          </div>
          <div className="text-sm text-custom-text">
            Respuestas Cortas
          </div>
        </div>
        <div className="p-4 rounded-lg border border-custom-primary bg-custom-primary-light">
          <div className="text-2xl font-bold mb-1 text-custom-primary">
            {agent.responseLength.medium}%
          </div>
          <div className="text-sm text-custom-text">
            Respuestas Medias
          </div>
        </div>
        <div className="p-4 rounded-lg border border-custom-primary bg-custom-primary-light">
          <div className="text-2xl font-bold mb-1 text-custom-primary">
            {agent.responseLength.long}%
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
          <p><strong>Idioma:</strong> {agent.language}</p>
          <p><strong>Tono:</strong> {agent.tone}</p>
          <p><strong>Audio habilitado:</strong> {agent.audioEnabled ? 'Sí' : 'No'}</p>
          <p><strong>Distribución de respuestas:</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Cortas: {agent.responseLength.short}%</li>
            <li>Medias: {agent.responseLength.medium}%</li>
            <li>Largas: {agent.responseLength.long}%</li>
          </ul>
          {agent.rules && (
            <>
              <p><strong>Reglas:</strong></p>
              <p className="whitespace-pre-wrap bg-base-200 p-3 rounded-lg">{agent.rules}</p>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default AgentInfo;

