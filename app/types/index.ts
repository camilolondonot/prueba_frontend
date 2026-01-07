// Agent Types
export interface AgentData {
  id: string;
  titulo: string;
  language: string;
  type: string;
}

// Modal new agent types
export interface ModalNewAgentProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Footer types
export interface FooterProps {
  total?: number;
}

//UI Types
export interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
  iconBackgroundColor?: string;
  iconBorderRadius?: string;
  iconBorderColor?: string;
  iconBorderWidth?: number;
  onClick?: () => void;
}

export interface ModalProps {
  id: string;
  children: React.ReactNode;
  backgroundColor?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

//steps types
export interface Step {
  number: number;
  title: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSectionProps {
  agentId: string;
}

// Training Types
export interface TrainingSectionProps {
  agentId: string;
}