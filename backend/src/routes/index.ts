import { Router } from 'express';
import { BlueprintController } from '../controllers/blueprint.controller';
import { ContractController } from '../controllers/contract.controller';

const router = Router();

router.get('/blueprints', BlueprintController.getAll);
router.get('/blueprints/:id', BlueprintController.getById);
router.post('/blueprints', BlueprintController.create);
router.delete('/blueprints/:id', BlueprintController.delete);

router.get('/contracts', ContractController.getAll);
router.get('/contracts/:id', ContractController.getById);
router.post('/contracts', ContractController.create);
router.patch('/contracts/:id/status', ContractController.updateStatus);
router.patch('/contracts/:id/values', ContractController.updateValues);
router.delete('/contracts/:id', ContractController.delete);

export default router;