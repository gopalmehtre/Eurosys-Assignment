import { Request, Response } from 'express';
import { BlueprintModel } from '../db/models/Blueprint.model';
import { ContractModel } from '../db/models/Contract.model';
import { createContractSchema, updateContractStatusSchema, updateContractValuesSchema } from '../validators';
import { ContractLifecycleService } from '../services/contractLifecycle.service';

export class ContractController {
  static async getAll(req: Request, res: Response) {
    try {
      const { status } = req.query;
      
      const filter: any = {};
      if (status) {
        filter.status = status;
      }

      const contracts = await ContractModel.find(filter).sort({ createdAt: -1 });
      
      const formattedContracts = contracts.map(contract => ({
        id: contract._id.toString(),
        name: contract.name,
        blueprintId: contract.blueprintId,
        status: contract.status,
        values: contract.values instanceof Map ? Object.fromEntries(contract.values) : contract.values,
        createdAt: contract.createdAt
      }));

      res.json(formattedContracts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contracts' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const contract = await ContractModel.findById(req.params.id);
      
      if (!contract) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      const blueprint = await BlueprintModel.findById(contract.blueprintId);

      res.json({
        id: contract._id.toString(),
        name: contract.name,
        blueprintId: contract.blueprintId,
        blueprintName: blueprint?.name || 'Unknown',
        status: contract.status,
        values: contract.values instanceof Map ? Object.fromEntries(contract.values) : contract.values,
        createdAt: contract.createdAt,
        blueprint: blueprint ? {
          id: blueprint._id.toString(),
          name: blueprint.name,
          fields: blueprint.fields
        } : null
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch contract' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validated = createContractSchema.parse(req.body);
      
      const blueprint = await BlueprintModel.findById(validated.blueprintId);
      if (!blueprint) {
        return res.status(404).json({ error: 'Blueprint not found' });
      }

      const contract = new ContractModel({
        ...validated,
        status: 'created'
      });
      await contract.save();

      res.status(201).json({
        id: contract._id.toString(),
        name: contract.name,
        blueprintId: contract.blueprintId,
        status: contract.status,
        values: contract.values instanceof Map ? Object.fromEntries(contract.values) : contract.values,
        createdAt: contract.createdAt
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Failed to create contract' });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const validated = updateContractStatusSchema.parse(req.body);
      
      const contract = await ContractModel.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      try {
        ContractLifecycleService.validateTransition(contract.status, validated.status);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

      contract.status = validated.status;
      await contract.save();

      res.json({
        id: contract._id.toString(),
        name: contract.name,
        blueprintId: contract.blueprintId,
        status: contract.status,
        values: contract.values instanceof Map ? Object.fromEntries(contract.values) : contract.values,
        createdAt: contract.createdAt
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Failed to update contract status' });
    }
  }

  static async updateValues(req: Request, res: Response) {
    try {
      const validated = updateContractValuesSchema.parse(req.body);
      
      const contract = await ContractModel.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      if (!ContractLifecycleService.canEdit(contract.status)) {
        return res.status(400).json({ 
          error: `Cannot edit contract in ${contract.status} status` 
        });
      }

      contract.values = new Map(Object.entries(validated.values));
      await contract.save();

      res.json({
        id: contract._id.toString(),
        name: contract.name,
        blueprintId: contract.blueprintId,
        status: contract.status,
        values: contract.values instanceof Map ? Object.fromEntries(contract.values) : contract.values,
        createdAt: contract.createdAt
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Failed to update contract values' });
    }
  }
  
  static async delete(req: Request, res: Response) {
    try {
      const contract = await ContractModel.findByIdAndDelete(req.params.id);
      
      if (!contract) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      res.json({ message: 'Contract deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete contract' });
    }
  }
}