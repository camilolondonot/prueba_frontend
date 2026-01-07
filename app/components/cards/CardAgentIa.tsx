'use client';

import Link from 'next/link';
import { AgentData } from '@/app/types';
import { HiLanguage } from "react-icons/hi2";
import { RiSpeakLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface CardAgentIaProps {
  agentData: AgentData;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const CardAgentIa = ({ agentData, onEdit, onDelete }: CardAgentIaProps) => {
  const { id, titulo, language, type, short, medium, long } = agentData;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-[#2D3249] rounded-md p-6 shadow-sm transition-all duration-300 transform hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <Link
          href={`/${id}`}
          className="flex-1 group"
        >
          <h2 className="text-xl font-bold mb-2 font-figtree dark:text-white group-hover:text-custom-accent transition-colors">
            {titulo}
          </h2>
        </Link>
        
        {/* Botones de acción */}
        <div className="flex gap-2 ml-4">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-ghost text-base-content hover:text-custom-primary"
              title="Editar"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-ghost text-base-content hover:text-error"
              title="Eliminar"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <Link href={`/${id}`} className="block group">
        <div className='flex gap-4 items-center mb-2'>
          <HiLanguage className="text-base-content" />
          <small className="text-base-content">{language}</small>
        </div>

        <div className='flex gap-4 items-center mb-2'>
          <RiSpeakLine className="text-base-content" />
          <small className="text-base-content">{type}</small>
        </div>

        {/* Distribución de respuestas */}
        <div className="mb-4 p-3 rounded-lg bg-base-200/50">
          <p className="text-xs font-semibold text-custom-text mb-2">Distribución de respuestas:</p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-custom-primary/20 text-custom-primary font-medium">
              Cortas: {short}%
            </span>
            <span className="px-2 py-1 rounded bg-custom-primary/20 text-custom-primary font-medium">
              Medias: {medium}%
            </span>
            <span className="px-2 py-1 rounded bg-custom-primary/20 text-custom-primary font-medium">
              Largas: {long}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center text-sm font-medium group-hover:gap-2 transition-all">
          <span className="text-custom-accent">Entrenar asistente</span>
          <svg 
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-custom-accent"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default CardAgentIa;