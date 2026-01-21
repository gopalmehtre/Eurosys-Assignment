import mongoose, { Schema, Document } from 'mongoose';
import { Blueprint } from '../../types';

interface BlueprintDocument extends Omit<Blueprint, 'id'>, Document {}

const FieldSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, enum: ['text', 'date', 'checkbox', 'signature'], required: true },
  label: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
}, { _id: false });

const BlueprintSchema = new Schema({
  name: { type: String, required: true },
  fields: [FieldSchema],
  createdAt: { type: Date, default: Date.now }
});

export const BlueprintModel = mongoose.model<BlueprintDocument>('Blueprint', BlueprintSchema);