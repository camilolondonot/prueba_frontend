import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  nombre: string;
  idioma: string;
  tono: string;
  short: number;
  medium: number;
  long: number;
  audioEnabled: boolean;
  createdAt: string;
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
  addAgent: (agent: Omit<Agent, 'id' | 'createdAt'>) => void;
  updateAgent: (id: string, agent: Omit<Agent, 'id' | 'createdAt'>) => void;
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
        const newAgent: Agent = {
          ...agentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          agents: [...state.agents, newAgent],
        }));
      },
      
      updateAgent: (id, agentData) => {
        set((state) => ({
          agents: state.agents.map((agent) =>
            agent.id === id
              ? { ...agent, ...agentData }
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
            nombre: agent.nombre,
            idioma: agent.idioma,
            tono: agent.tono,
            short: agent.short,
            medium: agent.medium,
            long: agent.long,
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

