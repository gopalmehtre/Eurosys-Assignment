export type FieldType = 'text' | 'date' | 'checkbox' | 'signature';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: {
    x: number;
    y: number;
  };
}

export interface Blueprint {
  id: string;
  name: string;
  fields: Field[];
  createdAt: string;
}

export type ContractStatus = 
  | 'created' 
  | 'approved' 
  | 'sent' 
  | 'signed' 
  | 'locked' 
  | 'revoked';

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName?: string;
  status: ContractStatus;
  values: Record<string, any>;
  createdAt: string;
  blueprint?: Blueprint;
}

export const STATUS_TRANSITIONS: Record<ContractStatus, ContractStatus[]> = {
  created: ['approved', 'revoked'],
  approved: ['sent'],
  sent: ['signed', 'revoked'],
  signed: ['locked'],
  locked: [],
  revoked: []
};

export const STATUS_LABELS: Record<ContractStatus, string> = {
  created: 'Created',
  approved: 'Approved',
  sent: 'Sent',
  signed: 'Signed',
  locked: 'Locked',
  revoked: 'Revoked'
};

export const STATUS_COLORS: Record<ContractStatus, string> = {
  created: 'bg-gray-100 text-gray-800',
  approved: 'bg-blue-100 text-blue-800',
  sent: 'bg-purple-100 text-purple-800',
  signed: 'bg-green-100 text-green-800',
  locked: 'bg-slate-100 text-slate-800',
  revoked: 'bg-red-100 text-red-800'
};