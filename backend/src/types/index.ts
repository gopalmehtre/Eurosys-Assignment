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
  createdAt: Date;
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
  status: ContractStatus;
  values: Record<string, any>;
  createdAt: Date;
}

export const STATUS_TRANSITIONS: Record<ContractStatus, ContractStatus[]> = {
  created: ['approved', 'revoked'],
  approved: ['sent'],
  sent: ['signed', 'revoked'],
  signed: ['locked'],
  locked: [],
  revoked: []
};