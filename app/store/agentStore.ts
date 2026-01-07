import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  name: string;
  language: string;
  tone: string;
  responseLength: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled: boolean;
  rules: string;
}

interface FormData {
  nombre: string;
  idioma: string;
  tono: string;
  short: number;
  medium: number;
  long: number;
  audioEnabled: boolean;
}

interface AgentStore {
  // Agentes (persistente)
  agents: Agent[];
  addAgent: (agent: { nombre: string; idioma: string; tono: string; short: number; medium: number; long: number; audioEnabled: boolean }) => void;
  updateAgent: (id: string, agent: Omit<Agent, 'id'>) => void;
  updateAgentRules: (id: string, rules: string) => void;
  deleteAgent: (id: string) => void;
  
  // Estado del formulario (NO persistente)
  currentStep: number;
  formData: FormData;
  editingAgentId: string | null;
  errors: Record<string, string>;
  message: { type: 'success' | 'error' | null; text: string };
  
  // Acciones del formulario
  setStep: (step: number) => void;
  updateFormData: (data: Partial<FormData>) => void;
  loadAgentForEdit: (agent: Agent) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  setMessage: (type: 'success' | 'error' | null, text: string) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  nombre: '',
  idioma: '',
  tono: '',
  short: 0,
  medium: 0,
  long: 0,
  audioEnabled: false,
};

export const useAgentStore = create<AgentStore>()(
  persist(
    (set) => ({
      // Estado persistente
      agents: [],
      
      // Estado del formulario (NO persistente)
      currentStep: 1,
      formData: initialFormData,
      editingAgentId: null,
      errors: {},
      message: { type: null, text: '' },
      
      // Acciones
      addAgent: (agentData) => {
        const agentId = Date.now().toString();
        // Obtener rules del localStorage si existe (usando el ID que se generará)
        const savedRules = localStorage.getItem(`training_${agentId}`) || '';
        
        const newAgent: Agent = {
          id: agentId,
          name: agentData.nombre,
          language: agentData.idioma,
          tone: agentData.tono,
          responseLength: {
            short: agentData.short,
            medium: agentData.medium,
            long: agentData.long,
          },
          audioEnabled: agentData.audioEnabled,
          rules: savedRules,
        };
        set((state) => ({
          agents: [...state.agents, newAgent],
        }));
      },
      
      updateAgent: (id, agentData) => {
        // Obtener rules del localStorage si existe
        const savedRules = localStorage.getItem(`training_${id}`) || '';
        
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === id
              ? {
                  id: agent.id,
                  name: agentData.name,
                  language: agentData.language,
                  tone: agentData.tone,
                  responseLength: agentData.responseLength,
                  audioEnabled: agentData.audioEnabled,
                  rules: savedRules || agentData.rules || agent.rules || '',
                }
              : agent
          ),
        }));
      },
      
      updateAgentRules: (id, rules) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === id
              ? { ...agent, rules }
              : agent
          ),
        }));
      },
      
      deleteAgent: (id) => {
        set((state) => ({
          agents: state.agents.filter((agent) => agent.id !== id),
        }));
      },
      
      setStep: (step) => set({ currentStep: step }),
      
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      
      setErrors: (errors) => set({ errors }),
      
      clearErrors: () => set({ errors: {} }),
      
      loadAgentForEdit: (agent) => {
        set({
          currentStep: 1,
          formData: {
            nombre: agent.name,
            idioma: agent.language,
            tono: agent.tone,
            short: agent.responseLength.short,
            medium: agent.responseLength.medium,
            long: agent.responseLength.long,
            audioEnabled: agent.audioEnabled,
          },
          editingAgentId: agent.id,
          errors: {},
          message: { type: null, text: '' },
        });
      },
      
      setMessage: (type, text) => set({ message: { type, text } }),
      
      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          editingAgentId: null,
          errors: {},
          message: { type: null, text: '' },
        }),
    }),
    {
      name: 'agent-storage',
      partialize: (state) => ({ agents: state.agents }), // Solo persistir los agentes
    }
  )
);

