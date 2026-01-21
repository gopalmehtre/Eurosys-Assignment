import { Request, Response } from 'express';
import { BlueprintModel } from '../db/models/Blueprint.model';
import { createBlueprintSchema } from '../validators';

export class BlueprintController {
  static async getAll(req: Request, res: Response) {
    try {
      const blueprints = await BlueprintModel.find().sort({ createdAt: -1 });
      
      const formattedBlueprints = blueprints.map((bp: typeof blueprints[number]) => ({
        id: bp._id.toString(),
        name: bp.name,
        fields: bp.fields,
        createdAt: bp.createdAt
      }));

      res.json(formattedBlueprints);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blueprints' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const blueprint = await BlueprintModel.findById(req.params.id);
      
      if (!blueprint) {
        return res.status(404).json({ error: 'Blueprint not found' });
      }

      res.json({
        id: blueprint._id.toString(),
        name: blueprint.name,
        fields: blueprint.fields,
        createdAt: blueprint.createdAt
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blueprint' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validated = createBlueprintSchema.parse(req.body);
      
      const blueprint = new BlueprintModel(validated);
      await blueprint.save();

      res.status(201).json({
        id: blueprint._id.toString(),
        name: blueprint.name,
        fields: blueprint.fields,
        createdAt: blueprint.createdAt
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: 'Failed to create blueprint' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const blueprint = await BlueprintModel.findByIdAndDelete(req.params.id);
      
      if (!blueprint) {
        return res.status(404).json({ error: 'Blueprint not found' });
      }

      res.json({ message: 'Blueprint deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete blueprint' });
    }
  }
}