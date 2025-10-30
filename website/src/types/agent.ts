// Agent-related type definitions for the THA Agent Hosting Platform

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number; // in ADA/lovelace
  currency: 'ADA' | 'lovelace';
  image?: string;
  tags: string[];
  status: 'active' | 'maintenance' | 'coming_soon';
  apiEndpoint: string;
  inputSchema: InputSchema;
  features: string[];
}

export interface InputSchema {
  type: 'object';
  properties: Record<string, InputProperty>;
  required?: string[];
}

export interface InputProperty {
  type: string;
  description: string;
  example?: any;
  enum?: string[];
  minimum?: number;
  maximum?: number;
}

export interface JobRequest {
  agentId: string;
  inputData: Record<string, any>;
  identifierFromPurchaser?: string; // For Masumi payment integration
}

export interface Job {
  id: string;
  agentId: string;
  status: JobStatus;
  inputData: Record<string, any>;
  result?: any;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
  paymentStatus?: PaymentStatus;
  transactionId?: string;
}

export type JobStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'confirmed'
  | 'failed'
  | 'refunded';

export interface JobResponse {
  job_id: string;
  status: JobStatus;
  message?: string;
}

export interface JobStatusResponse {
  job_id: string;
  status: JobStatus;
  result?: any;
  error?: string;
  payment_status?: PaymentStatus;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export interface AgentAvailabilityResponse {
  available: boolean;
  message?: string;
  version?: string;
}

export interface MasumiPaymentRequest {
  agent_identifier: string;
  purchaser_identifier?: string;
}

export interface MasumiPaymentResponse {
  success: boolean;
  transaction_id?: string;
  message?: string;
}

// UI-specific types
export interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

export interface JobProgressProps {
  job: Job;
  onCancel?: () => void;
}