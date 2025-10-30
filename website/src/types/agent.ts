export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  apiUrl: string;
  icon: string;
  capabilities: string[];
  pricing: {
    amount: string;
    unit: string;
  };
  inputSchema: InputField[];
}

export interface InputField {
  id: string;
  type: string;
  name: string;
  data: {
    description: string;
    placeholder?: string;
  };
}

export interface JobRequest {
  identifier_from_purchaser: string;
  input_data: Record<string, string>;
}

export interface JobResponse {
  status: string;
  job_id: string;
  blockchainIdentifier: string;
  submitResultTime: string;
  unlockTime: string;
  externalDisputeUnlockTime: string;
  agentIdentifier: string;
  sellerVKey: string;
  identifierFromPurchaser: string;
  amounts: Array<{
    amount: string;
    unit: string;
  }>;
  input_hash: string;
  payByTime: string;
}

export interface JobStatus {
  job_id: string;
  status: 'awaiting_payment' | 'running' | 'completed' | 'failed';
  payment_status: string;
  result?: string;
  error?: string;
}

export interface AgentAvailability {
  status: string;
  type: string;
  message: string;
  agentIdentifier?: string;
}