import mongoose, { Schema, Document } from 'mongoose';
import { Contract } from '../../types';

interface ContractDocument extends Omit<Contract, 'id'>, Document {}

const ContractSchema = new Schema({
  name: { type: String, required: true },
  blueprintId: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['created', 'approved', 'sent', 'signed', 'locked', 'revoked'],
    default: 'created'
  },
  values: { type: Map, of: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

export const ContractModel = mongoose.model<ContractDocument>('Contract', ContractSchema);