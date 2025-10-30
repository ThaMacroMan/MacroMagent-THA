export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: 'THA' | 'ADA';
  status: 'active' | 'inactive' | 'maintenance';
  apiEndpoint: string;
  inputSchema: AgentInputSchema;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AgentInputSchema {
  type: 'object';
  properties: Record<string, {
    type: string;
    description: string;
    required?: boolean;
  }>;
  required: string[];
}

export interface Job {
  id: string;
  agentId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input: Record<string, any>;
  output?: any;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentTxHash?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface User {
  walletAddress?: string;
  thaBalance?: number;
  adaBalance?: number;
  isThaHolder: boolean;
}

export interface PaymentRequest {
  agentIdentifier: string;
  amount: number;
  currency: 'THA' | 'ADA';
  purchaserIdentifier: string;
}