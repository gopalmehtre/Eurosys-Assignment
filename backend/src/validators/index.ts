import { z } from 'zod';

export const fieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'date', 'checkbox', 'signature']),
  label: z.string().min(1),
  position: z.object({
    x: z.number(),
    y: z.number()
  })
});

export const createBlueprintSchema = z.object({
  name: z.string().min(1, 'Blueprint name is required'),
  fields: z.array(fieldSchema).min(1, 'At least one field is required')
});

export const updateBlueprintSchema = z.object({
  name: z.string().min(1).optional(),
  fields: z.array(fieldSchema).optional()
});

export const createContractSchema = z.object({
  name: z.string().min(1, 'Contract name is required'),
  blueprintId: z.string().min(1, 'Blueprint ID is required'),
  values: z.record(z.string(), z.any()).optional()
});

export const updateContractStatusSchema = z.object({
  status: z.enum(['created', 'approved', 'sent', 'signed', 'locked', 'revoked'])
});

export const updateContractValuesSchema = z.object({
  values: z.record(z.string(), z.any())
});